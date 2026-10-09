# Tumaini CMS - Vercel & Supabase Migration Guide

## 🎯 Overview

This guide will help you migrate from SQLite to Supabase (PostgreSQL) and deploy to Vercel.

**Migration Path:** SQLite (Local) → Supabase (PostgreSQL) → Vercel (Serverless)

---

## 📋 Prerequisites

Before starting, ensure you have:

- [ ] Node.js 18.x or higher installed
- [ ] A Supabase account (free tier works)
- [ ] A Vercel account (free tier works)
- [ ] Git repository for your project

---

## 🗂️ New Project Structure

```
tumaini-cms/
├── api/                      # Vercel serverless functions (API routes)
│   ├── auth/
│   │   ├── login.js
│   │   └── register.js
│   ├── homepage.js
│   ├── about.js
│   ├── admissions.js
│   ├── children-home.js
│   └── ... (other endpoints)
├── public/                   # Static files (HTML, CSS, JS, images)
│   ├── index.html
│   ├── about.html
│   ├── admin/
│   │   └── pages/
│   └── assets/
├── lib/                      # Shared utilities
│   ├── supabase.js          # Database connection
│   ├── auth.js              # Auth middleware
│   └── upload.js            # File upload handler
├── backend/                  # Legacy (for reference)
│   └── ...
├── vercel.json              # Vercel configuration
├── .env.local               # Local environment variables
└── package.json
```

---

## 📦 Step 1: Install Dependencies

```bash
# Navigate to backend directory
cd backend

# Install Supabase client
npm install @supabase/supabase-js

# Remove SQLite (no longer needed)
npm uninstall sqlite3

# Verify installation
npm list @supabase/supabase-js
```

**Updated package.json dependencies:**
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1",
    "express-validator": "^7.0.0"
  }
}
```

---

## 🔧 Step 2: Set Up Supabase

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in details:
   - **Name:** tumaini-cms
   - **Database Password:** (save this!)
   - **Region:** Choose closest to your users
4. Wait for project to initialize (~2 minutes)

### 2.2 Get API Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...` (for client-side)
   - **service_role key:** `eyJhbGc...` (for server-side, keep secret!)

### 2.3 Run Database Migration

1. Open **SQL Editor** in Supabase dashboard
2. Click **New Query**
3. Copy contents of `supabase-migration.sql`
4. Click **Run**
5. Verify: Check **Table Editor** to see all 13 tables

**Tables Created:**
- `users` - Admin users
- `homepage` - Homepage content
- `about` - About page content (63 fields)
- `admissions` - Admissions content (51 fields)
- `childrens_home` - Children's Home content (68 fields)
- `news` - News articles
- `news_page_settings` - News page configuration
- `gallery_categories` - Gallery categories
- `gallery_images` - Gallery images
- `contact` - Contact information
- `get_involved` - Get Involved content
- `settings` - Global settings

### 2.4 Migrate Existing Data (Optional)

If you have existing data in SQLite you want to preserve:

```bash
# Run data export script
node backend/database/export-data.js

# This creates: database-export.sql
# Import in Supabase SQL Editor
```

### 2.5 Set Up Row Level Security (RLS)

The migration script enables RLS. Add these policies in SQL Editor:

```sql
-- Allow public to read content
CREATE POLICY "Public read access" ON homepage
  FOR SELECT USING (true);

-- Allow authenticated users to update
CREATE POLICY "Authenticated update" ON homepage
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Repeat for other tables: about, admissions, childrens_home, etc.
```

---

## 🔐 Step 3: Configure Environment Variables

### 3.1 Local Development

Create `backend/.env`:

```env
# Server
PORT=3001
NODE_ENV=development

# Supabase (REQUIRED)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
FRONTEND_URL=http://localhost:8080
```

### 3.2 Vercel Environment Variables

You'll add these in Vercel dashboard later:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `JWT_SECRET`
- `MAX_FILE_SIZE`

---

## 🔄 Step 4: Update Database Connections

### 4.1 Replace SQLite with Supabase

**Old (SQLite):**
```javascript
const { getQuery, runQuery } = require('../database/init');
```

**New (Supabase):**
```javascript
const { getQuery, runQuery } = require('../database/supabase');
```

### 4.2 Update All Route Files

Replace the import in these files:
- `backend/routes/homepage.js`
- `backend/routes/about.js`
- `backend/routes/admissions.js`
- `backend/routes/children-home.js`
- `backend/routes/news.js`
- `backend/routes/gallery.js`
- `backend/routes/contact.js`
- `backend/routes/get-involved.js`
- `backend/routes/settings.js`
- `backend/routes/auth.js`

**Find and replace:**
```bash
# In all route files
# Old: require('../database/init')
# New: require('../database/supabase')
```

---

## 📁 Step 5: Reorganize for Vercel

### 5.1 Create API Directory

```bash
# Create api directory for Vercel functions
mkdir api

# Move routes to api directory (we'll do this programmatically)
```

### 5.2 Create Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 5.3 Move Static Files

```bash
# Create public directory
mkdir public

# Move HTML files
mv *.html public/

# Move assets
mv assets public/
mv admin public/
```

---

## 🚀 Step 6: Deploy to Vercel

### 6.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 6.2 Login to Vercel

```bash
vercel login
```

### 6.3 Initialize Project

```bash
# In project root
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? tumaini-cms
# - In which directory is your code? ./
# - Want to override settings? N
```

### 6.4 Add Environment Variables

```bash
# Add variables via CLI
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_KEY
vercel env add JWT_SECRET

# Or via Vercel Dashboard:
# Settings → Environment Variables
```

### 6.5 Deploy

```bash
# Deploy to production
vercel --prod

# Your site will be live at:
# https://tumaini-cms.vercel.app
```

---

## 🧪 Step 7: Test the Migration

### 7.1 Test Locally First

```bash
# Start local server with Supabase
cd backend
npm start

# Test endpoints
curl http://localhost:3001/api/homepage
curl http://localhost:3001/api/about
```

### 7.2 Test on Vercel

```bash
# After deployment, test production
curl https://your-app.vercel.app/api/homepage
```

### 7.3 Test Admin Panel

1. Open: `https://your-app.vercel.app/admin/login.html`
2. Login with admin credentials
3. Try editing homepage content
4. Verify changes appear on public pages

---

## 📝 Step 8: Update Frontend API URLs

### 8.1 Update Admin Pages

In all admin HTML files, update API URL:

**Old:**
```javascript
const apiUrl = 'http://192.168.0.110:3001';
```

**New (production):**
```javascript
const apiUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001'
  : 'https://your-app.vercel.app';
```

### 8.2 Update Public Pages

In CMS integration scripts:

**Old:**
```javascript
const API_BASE_URL = 'http://192.168.0.110:3001';
```

**New:**
```javascript
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : 'https://your-app.vercel.app';
```

Files to update:
- `assets/js/homepage-cms.js`
- `assets/js/about-cms.js`
- `assets/js/admissions-cms.js`
- `assets/js/childrens-home-cms.js`

---

## 🔒 Step 9: File Upload Configuration

### 9.1 Use Supabase Storage

Since Vercel is serverless, local file uploads won't persist. Use Supabase Storage:

1. Go to **Storage** in Supabase dashboard
2. Create bucket: `tumaini-uploads`
3. Set bucket to **public**
4. Update upload middleware to use Supabase Storage

**Updated upload handler:**
```javascript
const { supabase } = require('../database/supabase');

async function uploadToSupabase(file) {
  const fileName = `${Date.now()}-${file.originalname}`;
  
  const { data, error } = await supabase.storage
    .from('tumaini-uploads')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('tumaini-uploads')
    .getPublicUrl(fileName);

  return publicUrl;
}
```

---

## ✅ Verification Checklist

After migration, verify:

- [ ] All 13 tables exist in Supabase
- [ ] Data migrated successfully
- [ ] Local development works with Supabase
- [ ] API endpoints respond correctly
- [ ] Admin login works
- [ ] Content updates save to Supabase
- [ ] Public pages display content from Supabase
- [ ] Vercel deployment successful
- [ ] Production site loads correctly
- [ ] Image uploads work (Supabase Storage)
- [ ] Environment variables set in Vercel
- [ ] HTTPS and custom domain configured (optional)

---

## 🐛 Troubleshooting

### Database Connection Fails

**Error:** "Invalid API key" or "Connection refused"

**Solution:**
1. Check `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in `.env`
2. Verify keys from Supabase dashboard
3. Make sure you're using `service_role` key (not `anon` key)

### Vercel Build Fails

**Error:** "Build failed"

**Solution:**
1. Check `vercel.json` syntax
2. Ensure all dependencies in `package.json`
3. Check Vercel build logs: `vercel logs`

### RLS Blocks Queries

**Error:** "Row level security policy"

**Solution:**
1. Check RLS policies in Supabase
2. Ensure authenticated users have proper permissions
3. Verify JWT token is being sent correctly

### Images Not Loading

**Error:** 404 on image URLs

**Solution:**
1. Upload images to Supabase Storage
2. Update image URLs to use Supabase CDN
3. Make bucket public

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase + Vercel Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-vercel)

---

## 🎉 Success!

Your Tumaini CMS is now running on:
- **Database:** Supabase (PostgreSQL)
- **Backend:** Vercel (Serverless)
- **Frontend:** Vercel (Static)

**Benefits:**
✅ No server maintenance
✅ Auto-scaling
✅ Global CDN
✅ Free tier available
✅ Automatic HTTPS
✅ Easy rollbacks

---

**Last Updated:** 2026-10-09  
**Status:** Ready for Migration
