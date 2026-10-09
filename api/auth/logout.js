const { createHandler } = require('../../lib/api-helper');

async function handleLogout(req, res) {
  // Since we're using JWT, logout is handled client-side
  // Just return a success message
  res.json({ success: true, message: 'Logout successful' });
}

module.exports = createHandler({
  post: handleLogout
});
