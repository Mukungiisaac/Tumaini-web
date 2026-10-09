# Vercel Migration Progress

## Migration Overview
Converting Tumaini CMS from SQLite + Express server to Supabase + Vercel serverless functions.

## Completed Steps ✅

### 1. Folder Structure Setup
- ✅ Created `/api` directory for serverless functions
- ✅ Created `/public` directory for static files
- ✅ Created `/lib` directory for shared utilities
- ✅ Copied all HTML files to `/public`
- ✅ Copied `assets/` to `/public/assets`
- ✅ Copied `admin/` to `/public/admin`

### 2. Core Configuration Files
- ✅ Created `vercel.json` with routing configuration
- ✅ Created `lib/api-helper.js` for serverless function utilities
- ✅ Copied `lib/supabase.js` (Supabase database connection)
- ✅ Updated `lib/middleware/auth.js` to work with serverless (Promise-based)

### 3. Auth API Endpoints (Complete)
- ✅ `/api/auth/login.js` - User login
- ✅ `/api/auth/logout.js` - User logout
- ✅ `/api/auth/me.js` - Get current user info
- ✅ `/api/auth/change-password.js` - Change password

### 4. Dependencies
- ✅ Installed `@supabase/supabase-js@^2.39.0`
- ✅ Removed `sqlite3` dependency
- ✅ Updated `package.json` version to 2.0.0

## Remaining Steps 🔄

### 5. Convert Remaining API Routes to Serverless Functions

#### Homepage Routes (backend/routes/homepage.js)
- [ ] `/api/homepage/index.js` - GET homepage content (public)
- [ ] `/api/homepage/update.js` - PUT homepage content (admin)

#### About Routes (backend/routes/about.js)
- [ ] `/api/about/index.js` - GET about content
- [ ] `/api/about/update.js` - PUT about content (admin)

#### Admissions Routes (backend/routes/admissions.js)
- [ ] `/api/admissions/index.js` - GET admissions content
- [ ] `/api/admissions/update.js` - PUT admissions content (admin)

#### Children's Home Routes (backend/routes/children-home.js)
- [ ] `/api/children-home/index.js` - GET children's home content
- [ ] `/api/children-home/update.js` - PUT children's home content (admin)

#### News Routes (backend/routes/news.js)
- [ ] `/api/news/index.js` - GET all news articles
- [ ] `/api/news/create.js` - POST create news article (admin)
- [ ] `/api/news/[id].js` - GET single news article
- [ ] `/api/news/update.js` - PUT update news article (admin)
- [ ] `/api/news/delete.js` - DELETE news article (admin)
- [ ] `/api/news/settings.js` - GET/PUT news page settings

#### Gallery Routes (backend/routes/gallery.js)
- [ ] `/api/gallery/categories.js` - GET all categories
- [ ] `/api/gallery/images.js` - GET all images
- [ ] `/api/gallery/upload.js` - POST upload image (admin)
- [ ] `/api/gallery/delete.js` - DELETE image (admin)

#### Contact Routes (backend/routes/contact.js)
- [ ] `/api/contact/index.js` - GET contact info
- [ ] `/api/contact/update.js` - PUT contact info (admin)
- [ ] `/api/contact/submit.js` - POST contact form submission

#### Get Involved Routes (backend/routes/get-involved.js)
- [ ] `/api/get-involved/index.js` - GET get involved content
- [ ] `/api/get-involved/update.js` - PUT get involved content (admin)

#### Settings Routes (backend/routes/settings.js)
- [ ] `/api/settings/index.js` - GET global settings
- [ ] `/api/settings/update.js` - PUT global settings (admin)

#### Upload Routes (backend/routes/upload.js)
- [ ] Convert to use Supabase Storage instead of local filesystem
- [ ] `/api/upload/image.js` - Upload image to Supabase Storage

### 6. Update Frontend API URLs
- [ ] Update `public/admin/dashboard.html` - API base URL
- [ ] Update `public/admin/pages/homepage.html` - API calls
- [ ] Update `public/admin/pages/about.html` - API calls
- [ ] Update `public/admin/pages/admissions.html` - API calls
- [ ] Update `public/admin/pages/children-home.html` - API calls
- [ ] Update `public/admin/pages/news.html` - API calls
- [ ] Update `public/admin/pages/gallery.html` - API calls
- [ ] Update `public/admin/pages/contact.html` - API calls
- [ ] Update `public/admin/pages/get-involved.html` - API calls
- [ ] Update all public CMS loading scripts (index.html, about.html, etc.)

### 7. Supabase Setup
- [ ] Create Supabase project
- [ ] Run `supabase-migration.sql` to create tables
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create storage bucket for uploads
- [ ] Copy environment variables to `.env`

### 8. Environment Variables
- [ ] Add to Vercel project settings:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_KEY`
  - `JWT_SECRET`
  - `JWT_EXPIRE`

### 9. Testing
- [ ] Test all auth endpoints locally
- [ ] Test all content endpoints locally
- [ ] Test file uploads with Supabase Storage
- [ ] Test admin panel functionality
- [ ] Test public site content loading

### 10. Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Configure build settings
- [ ] Deploy to Vercel
- [ ] Test production deployment
- [ ] Set up custom domain (if applicable)

## Migration Pattern for Routes

### Express Route Pattern (OLD):
```javascript
const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const router = express.Router();

router.get('/', async (req, res) => {
  const data = await getQuery('SELECT * FROM table WHERE id = ?', [1]);
  res.json(data);
});

module.exports = router;
```

### Serverless Function Pattern (NEW):
```javascript
const { getQuery } = require('../../lib/supabase');
const { createHandler } = require('../../lib/api-helper');

async function handleGet(req, res) {
  const data = await getQuery('SELECT * FROM table WHERE id = $1', [1]);
  res.json(data);
}

module.exports = createHandler({
  get: handleGet
});
```

### Key Changes:
1. ✅ Replace `require('../database/init')` with `require('../../lib/supabase')`
2. ✅ Replace SQL placeholders `?` with PostgreSQL placeholders `$1, $2, $3...`
3. ✅ Use `createHandler()` instead of Express router
4. ✅ Use Promise-based `authenticateToken()` instead of middleware chain
5. ✅ Use `parseBody(req)` for POST/PUT requests
6. ✅ Each route becomes a separate file in `/api`

## SQL Query Updates

### SQLite → PostgreSQL Placeholders:
```javascript
// OLD (SQLite)
'SELECT * FROM users WHERE id = ? AND status = ?'

// NEW (PostgreSQL)
'SELECT * FROM users WHERE id = $1 AND status = $2'
```

### Data Type Conversions:
- `INTEGER` → `SERIAL` (for auto-increment)
- `DATETIME` → `TIMESTAMP`
- `TEXT` → `TEXT`
- `BLOB` → `BYTEA` (for binary data)

## File Upload Changes

### OLD (Local Filesystem):
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
```

### NEW (Supabase Storage):
```javascript
const { supabase } = require('../../lib/supabase');

// Upload file
const { data, error } = await supabase.storage
  .from('uploads')
  .upload(`images/${filename}`, file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('uploads')
  .getPublicUrl(`images/${filename}`);
```

## Current File Structure

```
Tumaini-web/
├── api/                          # Vercel serverless functions
│   └── auth/
│       ├── login.js             ✅ Complete
│       ├── logout.js            ✅ Complete
│       ├── me.js                ✅ Complete
│       └── change-password.js   ✅ Complete
├── lib/                          # Shared utilities
│   ├── supabase.js              ✅ Complete
│   ├── api-helper.js            ✅ Complete
│   └── middleware/
│       └── auth.js              ✅ Complete
├── public/                       # Static files
│   ├── *.html                   ✅ Complete
│   ├── assets/                  ✅ Complete
│   └── admin/                   ✅ Complete
├── backend/                      # Legacy code (will be removed)
│   ├── routes/                  🔄 Being migrated
│   ├── database/
│   └── middleware/
├── vercel.json                  ✅ Complete
├── package.json                 ✅ Updated
└── .env.example                 ✅ Complete
```

## Next Immediate Actions

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Run the migration SQL
   - Copy credentials to `.env`

2. **Convert Homepage API**
   - Create `/api/homepage/index.js`
   - Test GET endpoint

3. **Update Frontend URLs**
   - Change hardcoded `http://192.168.0.110:3001` to environment-aware URLs

4. **Test Locally**
   - Run `vercel dev` to test serverless functions locally

## Notes

- Keep `backend/` folder for reference until migration is complete
- Once all routes are migrated and tested, the `backend/` folder can be removed
- The `database/tumaini.db` file is no longer needed after Supabase migration
- All authentication uses JWT tokens (no session storage needed)
- CORS is handled in `vercel.json` and `api-helper.js`
