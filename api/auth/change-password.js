const bcrypt = require('bcryptjs');
const { getQuery, runQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { authenticateToken } = require('../../lib/middleware/auth');

async function handleChangePassword(req, res) {
  // Authenticate request
  const authResult = await authenticateToken(req, res);
  if (!authResult) return; // Authentication failed, response already sent

  await parseBody(req);
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'All password fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New passwords do not match' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  // Get user
  const user = await getQuery('SELECT * FROM users WHERE id = $1', [req.user.id]);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Verify current password
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await runQuery('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, req.user.id]);

  res.json({ success: true, message: 'Password changed successfully' });
}

module.exports = createHandler({
  post: handleChangePassword
});
