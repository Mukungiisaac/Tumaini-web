const { supabase } = require('../../lib/supabase');
const { createHandler } = require('../../lib/api-helper');
const { withAuth } = require('../../lib/supabase-auth-middleware');

// GET - Fetch all news including drafts (admin only)
const handleGet = withAuth(async (req, res) => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data || []);
});

module.exports = createHandler({
  get: handleGet
});
