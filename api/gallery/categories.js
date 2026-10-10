const { supabase } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { withAuth } = require('../../lib/supabase-auth-middleware');

// GET - Fetch all gallery categories (public)
async function handleGet(req, res) {
  const { data, error } = await supabase
    .from('gallery_categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data || []);
}

// POST - Create gallery category (admin only)
const handlePost = withAuth(async (req, res) => {
  await parseBody(req);
  const { name, description, display_order } = req.body;

  const { data, error } = await supabase
    .from('gallery_categories')
    .insert({ name, description, display_order })
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
