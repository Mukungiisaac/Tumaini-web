/**
 * API Helper for Vercel Serverless Functions
 * Provides utilities to handle Express-style routing in serverless context
 */

/**
 * Create a handler that mimics Express router behavior
 * @param {Object} routes - Object with HTTP methods as keys and handler functions as values
 */
function createHandler(routes) {
  return async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const method = req.method.toLowerCase();
    const handler = routes[method];

    if (!handler) {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}

/**
 * Parse request body for POST/PUT requests
 */
async function parseBody(req) {
  if (req.body) return req.body;

  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(data);
      } catch (e) {
        req.body = {};
      }
      resolve(req.body);
    });
  });
}

/**
 * Extract query parameters from URL
 */
function parseQuery(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  return Object.fromEntries(url.searchParams);
}

module.exports = {
  createHandler,
  parseBody,
  parseQuery
};
