// api/about/index.js - About page content API
const { createClient } = require('@supabase/supabase-js');
const { withAuth } = require('../lib/supabase-auth-middleware');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET - Fetch about content (public)
async function handleGet(req, res) {
  try {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'About content not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// PUT - Update about content (admin only)
async function handlePut(req, res) {
  try {
    const updates = req.body;

    const { data, error } = await supabase
      .from('about')
      .update(updates)
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      data, 
      updatedBy: req.user?.email 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Cache for 1 minute (improves speed)
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'PUT') {
    return withAuth(handlePut)(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
