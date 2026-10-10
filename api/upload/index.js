// api/upload/index.js - Image upload to Supabase Storage
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service key for storage

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper to get auth token from request
function getAuthToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const token = getAuthToken(req);
    if (!token) {
      return res.status(401).json({ error: 'No authentication token provided' });
    }

    // Verify token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Parse multipart form data (Vercel provides parsed body)
    const contentType = req.headers['content-type'] || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
    }

    // For now, we'll use base64 encoded images
    // Frontend should send: { image: 'data:image/png;base64,...', filename: 'image.png' }
    const { image, filename, oldImage } = req.body;

    if (!image || !filename) {
      return res.status(400).json({ error: 'Missing image data or filename' });
    }

    // Extract base64 data
    const matches = image.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Invalid image format. Expected base64 data URL' });
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1E9);
    const ext = filename.split('.').pop();
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const uniqueFilename = `${nameWithoutExt}-${timestamp}-${randomSuffix}.${ext}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('tumaini-images')
      .upload(uniqueFilename, buffer, {
        contentType: contentType,
        upsert: false
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return res.status(500).json({ error: 'Failed to upload image to storage: ' + error.message });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('tumaini-images')
      .getPublicUrl(uniqueFilename);

    // Delete old image if provided
    if (oldImage && oldImage.includes('supabase')) {
      const oldFilename = oldImage.split('/').pop();
      await supabase.storage.from('tumaini-images').remove([oldFilename]);
    }

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      filename: uniqueFilename,
      path: publicUrl,
      url: publicUrl,
      size: buffer.length
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
};
