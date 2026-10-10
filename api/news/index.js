const { supabase } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { withAuth } = require('../../lib/supabase-auth-middleware');

// GET - Fetch all news (public - only published)
async function handleGet(req, res) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data || []);
}

// POST - Create news article (admin only)
const handlePost = withAuth(async (req, res) => {
  await parseBody(req);
  const { title, category, content, featured_image, status = 'draft' } = req.body;

  const { data, error } = await supabase
    .from('news')
    .insert({
      title,
      category,
      content,
      featured_image,
      status,
      author: req.user.email
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data, createdBy: req.user.email });
});

module.exports = createHandler({
  get: handleGet,
  post: handlePost
});
