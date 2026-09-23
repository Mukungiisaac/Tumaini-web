# Tumaini CMS Backend

The backend API for the Tumaini CMS system. Provides secure authentication, content management endpoints, and database operations.

## Installation

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration (if needed):
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=change_this_to_a_strong_secret_key
JWT_EXPIRE=7d
DB_PATH=./database/tumaini.db
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Default Admin Credentials

**Email:** admin@tumaini.school  
**Password:** Admin123!

⚠️ **IMPORTANT:** Change this password immediately after first login!

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Content Management (Public GET endpoints, Admin POST/PUT/DELETE)
- `/api/homepage` - Homepage content
- `/api/about` - About page
- `/api/admissions` - Admissions information
- `/api/children-home` - Children's home information
- `/api/news` - News articles
- `/api/gallery` - Gallery images
- `/api/get-involved` - Get involved information
- `/api/contact` - Contact information
- `/api/settings` - Site settings

## Database

The database is automatically initialized on first server run. Tables are created as needed.

**Database Location:** `../database/tumaini.db`

### Tables
- `users` - Admin users
- `homepage` - Homepage content
- `about` - About page content
- `admissions` - Admissions information
- `children_home` - Children's home data
- `news` - News articles
- `gallery_images` - Gallery images
- `gallery_categories` - Gallery categories
- `get_involved` - Get involved information
- `contact` - Contact information
- `settings` - Site settings

## Security

- Passwords are hashed with bcryptjs
- JWT tokens expire after 7 days
- All admin endpoints require authentication
- CORS is configured for specified origins
- File uploads are validated

## Development

### Project Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env.example          # Environment template
├── database/
│   └── init.js           # Database initialization
├── routes/               # API routes
├── middleware/           # Express middleware
│   └── auth.js          # Authentication middleware
└── uploads/             # User uploaded files
```

### Adding New Routes

1. Create a new file in `routes/` folder
2. Import it in `server.js`
3. Add middleware if needed in `middleware/`
4. Use the database helpers from `database/init.js`

Example route:
```javascript
const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  // Public endpoint
});

router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  // Admin only endpoint
});

module.exports = router;
```

## Troubleshooting

### "Port already in use"
Change the port in `.env` or kill the process using port 3001

### "Database initialization error"
Delete `database/tumaini.db` and restart the server to reinitialize

### "JWT errors"
Clear localStorage in your browser and login again

### "CORS errors"
Update the CORS origins in `server.js` to match your frontend URL

## Production Deployment

Before deploying to production:

1. Update `.env` with production values:
   - Change `JWT_SECRET` to a strong random string
   - Set `NODE_ENV=production`
   - Update CORS origins

2. Set strong database permissions

3. Use a production process manager (PM2)

4. Enable HTTPS

5. Set up database backups

6. Monitor logs

## Support

For issues or questions, please contact the development team.
