// api/news.js - Unified news API (all operations)
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  return error || !user ? null : user;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { all, id } = req.query;

  // GET - Fetch news
  if (req.method === 'GET') {
    try {
      let query = supabase.from('news').select('*');

      if (id) {
        // Get specific article
        query = query.eq('id', id).single();
        const { data, error } = await query;
        if (error) return res.status(500).json({ error: error.message });
        if (!data) return res.status(404).json({ error: 'Article not found' });
        return res.status(200).json(data);
      }

      if (all === 'true') {
        // Get all articles (admin only - requires auth)
        const user = await verifyAuth(req);
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        query = query.order('created_at', { ascending: false });
      } else {
        // Get published articles only (public)
        query = query.eq('status', 'published').order('publication_date', { ascending: false });
      }

      const { data, error } = await query;
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data || []);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST - Create news article (admin only)
  if (req.method === 'POST') {
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { data, error } = await supabase
        .from('news')
        .insert(req.body)
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // PUT - Update news article (admin only)
  if (req.method === 'PUT') {
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!id) {
      return res.status(400).json({ error: 'Article ID required' });
    }

    try {
      const { data, error } = await supabase
        .from('news')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // DELETE - Delete news article (admin only)
  if (req.method === 'DELETE') {
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!id) {
      return res.status(400).json({ error: 'Article ID required' });
    }

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, message: 'Article deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
