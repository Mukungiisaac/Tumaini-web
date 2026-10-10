/**
 * Supabase Auth Middleware for API Routes
 * Validates Supabase JWT tokens and attaches user to request
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials for auth middleware');
}

/**
 * Middleware to verify Supabase Auth token
 * Attaches user object to req.user if valid
 */
async function requireAuth(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Missing or invalid authorization header' 
      });
    }

    const token = authHeader.replace('Bearer ', '');

    // Create Supabase client with service key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Verify the JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Invalid or expired token' 
      });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role || 'admin',
      metadata: user.user_metadata
    };

    // Call next handler
    if (next) {
      await next(req, res);
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Authentication failed' 
    });
  }
}

/**
 * Optional auth middleware - doesn't fail if no token provided
 * Attaches user to req.user if valid token exists
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided - continue without user
      if (next) await next(req, res);
      return;
    }

    const token = authHeader.replace('Bearer ', '');

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (!error && user) {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role || 'admin',
        metadata: user.user_metadata
      };
    }

    if (next) await next(req, res);

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    // Continue without user on error
    if (next) await next(req, res);
  }
}

/**
 * Higher-order function to wrap handlers with auth
 * Usage: const handler = withAuth(async (req, res) => { ... })
 */
function withAuth(handler) {
  return async (req, res) => {
    await requireAuth(req, res, handler);
  };
}

/**
 * Higher-order function for optional auth
 */
function withOptionalAuth(handler) {
  return async (req, res) => {
    await optionalAuth(req, res, handler);
  };
}

module.exports = {
  requireAuth,
  optionalAuth,
  withAuth,
  withOptionalAuth
};
