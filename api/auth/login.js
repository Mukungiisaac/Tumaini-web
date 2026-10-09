const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');

async function handleLogin(req, res) {
  await parseBody(req);
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user
  const user = await getQuery(
    'SELECT * FROM users WHERE email = $1 AND status = $2',
    [email, 'active']
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name
    },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );

  // Return success response
  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    }
  });
}

module.exports = createHandler({
  post: handleLogin
});
