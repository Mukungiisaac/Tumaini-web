const jwt = require('jsonwebtoken');

/**
 * Serverless-compatible authentication middleware
 * Returns a Promise that resolves with true if authenticated, false otherwise
 */
const authenticateToken = async (req, res) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return false;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = user;
    return true;
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return false;
  }
};

/**
 * Check if authenticated user is admin
 */
const authorizeAdmin = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return false;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return false;
  }

  return true;
};

module.exports = {
  authenticateToken,
  authorizeAdmin
};
