const { getQuery, runQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { authenticateToken, authorizeAdmin } = require('../../lib/middleware/auth');

// GET - Fetch about content (public)
async function handleGet(req, res) {
  const about = await getQuery('SELECT * FROM about WHERE id = 1');
  
  if (!about) {
    return res.status(404).json({ error: 'About content not found' });
  }

  res.json(about);
}

// PUT - Update about content (admin only)
async function handlePut(req, res) {
  // Authenticate and authorize
  const isAuth = await authenticateToken(req, res);
  if (!isAuth) return;
  
  const isAdmin = await authorizeAdmin(req, res);
  if (!isAdmin) return;

  await parseBody(req);
  const updates = req.body;

  // Build dynamic UPDATE query
  const fields = Object.keys(updates).filter(key => key !== 'id');
  if (fields.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
  const values = fields.map(field => updates[field]);

  const query = `UPDATE about SET ${setClause} WHERE id = 1`;
  
  await runQuery(query, values);
  
  // Fetch and return updated data
  const updated = await getQuery('SELECT * FROM about WHERE id = 1');
  res.json({ success: true, data: updated });
}

module.exports = createHandler({
  get: handleGet,
  put: handlePut
});
