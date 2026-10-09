const { getQuery, runQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { authenticateToken, authorizeAdmin } = require('../../lib/middleware/auth');

// GET - Fetch homepage content (public)
async function handleGet(req, res) {
  const homepage = await getQuery('SELECT * FROM homepage WHERE id = 1');
  
  if (!homepage) {
    // Return default values if no data exists
    return res.json({
      id: 1,
      hero_image: null,
      hero_badge: 'Tumaini Comprehensive School',
      hero_title: 'Empowering Young Minds',
      hero_description: 'Education and residential care for vulnerable children',
      hero_button_primary: 'Learn More',
      hero_button_primary_link: '/about',
      hero_button_secondary: 'Get Involved',
      hero_button_secondary_link: '/get-involved',
      // ... add other default values as needed
    });
  }

  res.json(homepage);
}

// PUT - Update homepage content (admin only)
async function handlePut(req, res) {
  // Authenticate and authorize
  const isAuth = await authenticateToken(req, res);
  if (!isAuth) return;
  
  const isAdmin = await authorizeAdmin(req, res);
  if (!isAdmin) return;

  await parseBody(req);
  const updates = req.body;

  // Build dynamic UPDATE query based on provided fields
  const fields = Object.keys(updates).filter(key => key !== 'id');
  if (fields.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
  const values = fields.map(field => updates[field]);

  const query = `UPDATE homepage SET ${setClause} WHERE id = 1`;
  
  await runQuery(query, values);
  
  // Fetch and return updated data
  const updated = await getQuery('SELECT * FROM homepage WHERE id = 1');
  res.json({ success: true, data: updated });
}

module.exports = createHandler({
  get: handleGet,
  put: handlePut
});
