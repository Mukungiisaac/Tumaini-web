// api/content.js - Unified content API for all CMS pages
// Consolidates multiple endpoints to stay within Vercel's 12 function limit
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Map of content types to database tables
const CONTENT_TYPES = {
  'homepage': 'homepage',
  'about': 'about',
  'admissions': 'admissions',
  'children-home': 'childrens_home',
  'contact': 'contact',
  'get-involved': 'get_involved',
  'settings': 'settings'
};

// Verify auth token
async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return null;
  }

  return user;
}

// GET - Fetch content (public)
async function handleGet(contentType) {
  const table = CONTENT_TYPES[contentType];
  if (!table) {
    return { status: 404, data: { error: 'Content type not found' } };
  }

  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return { status: 500, data: { error: error.message } };
    }

    if (!data) {
      return { status: 404, data: { error: `${contentType} content not found` } };
    }

    return { status: 200, data };
  } catch (error) {
    console.error('Server error:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
}

// PUT - Update content (admin only)
async function handlePut(contentType, updates, user) {
  const table = CONTENT_TYPES[contentType];
  if (!table) {
    return { status: 404, data: { error: 'Content type not found' } };
  }

  try {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return { status: 500, data: { error: error.message } };
    }

    return { 
      status: 200, 
      data: { 
        success: true, 
        data, 
        updatedBy: user?.email 
      } 
    };
  } catch (error) {
    console.error('Server error:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract content type from query parameter
  const { type } = req.query;
  
  if (!type) {
    return res.status(400).json({ error: 'Content type parameter required. Usage: /api/content?type=homepage' });
  }

  if (req.method === 'GET') {
    const result = await handleGet(type);
    return res.status(result.status).json(result.data);
  }

  if (req.method === 'PUT') {
    // Verify authentication
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized. Valid auth token required.' });
    }

    const result = await handlePut(type, req.body, user);
    return res.status(result.status).json(result.data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
