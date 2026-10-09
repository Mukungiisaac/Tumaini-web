const { getQuery } = require('../../lib/supabase');
const { createHandler } = require('../../lib/api-helper');
const { authenticateToken } = require('../../lib/middleware/auth');

async function handleGetMe(req, res) {
  // Authenticate request
  const authResult = await authenticateToken(req, res);
  if (!authResult) return; // Authentication failed, response already sent

  const user = await getQuery(
    'SELECT id, email, username, first_name, last_name, role FROM users WHERE id = $1',
    [req.user.id]
  );

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}

module.exports = createHandler({
  get: handleGetMe
});
