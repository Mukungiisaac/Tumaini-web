const { supabase } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { withAuth } = require('../../lib/supabase-auth-middleware');

// GET - Fetch all gallery images (public)
async function handleGet(req, res) {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data || []);
}

// POST - Add gallery image (admin only)
const handlePost = withAuth(async (req, res) => {
  await parseBody(req);
  const { title, description, image_path, category_id, is_featured } = req.body;

  const { data, error } = await supabase
    .from('gallery_images')
    .insert({ 
      title, 
      description, 
      image_path, 
      category_id, 
      is_featured: is_featured || false 
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

module.exports = createHandler({
  get: handleGet,
  post: handlePost
});
