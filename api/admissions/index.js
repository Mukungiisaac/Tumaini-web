const { getQuery, runQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { withAuth } = require('../../lib/supabase-auth-middleware');

// GET - Fetch admissions content (public)
async function handleGet(req, res) {
  const admissions = await getQuery('SELECT * FROM admissions WHERE id = 1');
  
  if (!admissions) {
    return res.status(404).json({ error: 'Admissions content not found' });
  }

  res.json(admissions);
}

// PUT - Update admissions content (admin only)
const handlePut = withAuth(async (req, res) => {
  await parseBody(req);
  const updates = req.body;

  // Build dynamic UPDATE query
  const fields = Object.keys(updates).filter(key => key !== 'id');
  if (fields.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
  const values = fields.map(field => updates[field]);

  const query = `UPDATE admissions SET ${setClause} WHERE id = 1`;
  
  await runQuery(query, values);
  
  // Fetch and return updated data
  const updated = await getQuery('SELECT * FROM admissions WHERE id = 1');
  res.json({ success: true, data: updated, updatedBy: req.user.email });
});

module.exports = createHandler({
  get: handleGet,
  put: handlePut
});
