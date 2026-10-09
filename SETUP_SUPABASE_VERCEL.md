# Tumaini CMS - Supabase & Vercel Setup Guide

Complete guide to migrate from SQLite to Supabase and deploy to Vercel.

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account (free tier is fine)
- Supabase account (free tier is fine)

## Part 1: Supabase Setup (Database)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub (recommended)
4. Click "New Project"
5. Fill in:
   - **Name**: `tumaini-cms`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free
6. Click "Create new project"
7. Wait 2-3 minutes for project to initialize

### Step 2: Get Supabase Credentials

1. In your Supabase project, click "Settings" (gear icon) in sidebar
2. Click "API" under Project Settings
3. Copy these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`
   - **service_role key**: Long string starting with `eyJ...` (keep this secret!)

### Step 3: Run Database Migration

1. In Supabase dashboard, click "SQL Editor" in sidebar
2. Click "New Query"
3. Open your `supabase-migration.sql` file
4. Copy ALL content from the file
5. Paste into the SQL Editor
6. Click "Run" button
7. You should see: "Success. No rows returned"
8. Click "Table Editor" in sidebar to verify all 13 tables were created:
   - about
   - admissions
   - childrens_home
   - children_home
   - contact
   - gallery_categories
   - gallery_images
   - get_involved
   - homepage
   - news
   - news_page_settings
   - settings
   - users

### Step 4: Create Default Admin User

1. Still in SQL Editor, run this query to create an admin user:

```sql
INSERT INTO users (email, username, password, first_name, last_name, role, status)
VALUES (
  'admin@tumaini.school',
  'admin',
  '$2a$10$YourHashedPasswordHere',  -- You'll need to generate this
  'Admin',
  'User',
  'admin',
  'active'
);
```

**Note**: You need to hash the password first. Use this Node.js command:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123', 10, (err, hash) => console.log(hash));"
```

Replace `$2a$10$YourHashedPasswordHere` with the output.

### Step 5: Set Up Storage Bucket

1. Click "Storage" in Supabase sidebar
2. Click "Create a new bucket"
3. Name: `uploads`
4. Public bucket: ✅ (checked)
5. Click "Create bucket"
6. Click on the `uploads` bucket
7. Create folders:
   - `images/`
   - `gallery/`
   - `news/`

### Step 6: Configure Storage Policies

1. In Storage, click "Policies" tab for `uploads` bucket
2. Click "New Policy"
3. Select "For full customization, create a policy from scratch"
4. Name: "Public Read Access"
5. Policy definition:
```sql
(bucket_id = 'uploads'::text)
```
6. Allowed operations: SELECT
7. Click "Review"
8. Click "Save policy"

9. Create another policy for admin uploads:
   - Name: "Admin Upload Access"
   - Policy:
```sql
(bucket_id = 'uploads'::text AND auth.role() = 'authenticated')
```
   - Allowed operations: INSERT, UPDATE, DELETE

## Part 2: Local Development Setup

### Step 1: Create Environment File

1. In your project root, create `.env` file:

```bash
# Supabase Configuration
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Environment
NODE_ENV=development
```

2. Replace the placeholder values with your Supabase credentials from Step 2

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 4: Update API URLs in Frontend

Run the URL update script:

```bash
node update-api-urls.js
```

This will update all hardcoded API URLs in your frontend files.

### Step 5: Test Locally with Vercel Dev

```bash
vercel dev
```

- Answer the prompts:
  - "Set up and develop?" → Yes
  - "Which scope?" → Your account
  - "Link to existing project?" → No
  - "What's your project's name?" → tumaini-cms
  - "In which directory is your code located?" → ./

- Vercel will start a local development server
- Open http://localhost:3000 in browser
- Test the login at http://localhost:3000/admin/login.html

## Part 3: Vercel Deployment

### Step 1: Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Supabase + Vercel migration"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository"
3. Name: `tumaini-cms`
4. Click "Create repository"
5. Follow the instructions to push your code:

```bash
git remote add origin https://github.com/your-username/tumaini-cms.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty
   - **Output Directory**: `public`

5. Click "Environment Variables"
6. Add all variables from your `.env` file:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `NODE_ENV` = `production`

7. Click "Deploy"
8. Wait 1-2 minutes for deployment
9. Visit your site at `https://tumaini-cms-xxxxx.vercel.app`

### Step 4: Set Up Custom Domain (Optional)

1. In Vercel project, go to "Settings" → "Domains"
2. Add your domain (e.g., `www.tumaini.school`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

## Part 4: Testing

### Test Checklist

#### Authentication
- [ ] Login at `/admin/login.html`
- [ ] View dashboard at `/admin/dashboard.html`
- [ ] Change password
- [ ] Logout

#### Content Management (Admin)
- [ ] Edit Homepage content
- [ ] Edit About Us content
- [ ] Edit Admissions content
- [ ] Edit Children's Home content
- [ ] Create/Edit News articles
- [ ] Upload images to Gallery
- [ ] Edit Contact information
- [ ] Edit Get Involved content

#### Public Site
- [ ] View Homepage at `/`
- [ ] View About Us at `/about.html`
- [ ] View Admissions at `/admissions.html`
- [ ] View Children's Home at `/childrens-home.html`
- [ ] View News at `/news.html`
- [ ] View Gallery at `/gallery.html`
- [ ] View Contact at `/contact.html`
- [ ] View Get Involved at `/get-involved.html`

## Part 5: Maintenance

### Viewing Logs

**Vercel:**
- Project → "Deployments" → Click deployment → "Runtime Logs"

**Supabase:**
- Project → "Database" → "Query Performance"
- Project → "Logs" → "API Logs"

### Database Backups

**Supabase** (Free tier includes daily backups):
1. Go to "Database" → "Backups"
2. View automatic daily backups (kept for 7 days)
3. To manually backup: Use SQL Editor to export data

**Manual Export:**
```sql
-- Export all data from a table
COPY (SELECT * FROM homepage) TO STDOUT WITH CSV HEADER;
```

### Updating Content

All content updates are done through the admin panel at `/admin`

### Code Updates

```bash
# Make changes
git add .
git commit -m "Description of changes"
git push

# Vercel will automatically deploy
```

## Troubleshooting

### Issue: "Failed to fetch" in admin panel

**Solution:**
1. Check browser console for CORS errors
2. Verify `vercel.json` has correct CORS headers
3. Check API endpoint URLs in frontend files

### Issue: Database connection failed

**Solution:**
1. Verify `.env` has correct Supabase credentials
2. Check Supabase project is not paused (free tier pauses after 1 week inactivity)
3. Reactivate project in Supabase dashboard if paused

### Issue: Images not uploading

**Solution:**
1. Check Supabase Storage bucket exists and is public
2. Verify storage policies are configured
3. Check file size (default limit is 50MB)

### Issue: 500 Internal Server Error

**Solution:**
1. Check Vercel Runtime Logs
2. Verify all environment variables are set
3. Check for SQL syntax errors in queries

### Issue: Authentication not working

**Solution:**
1. Verify JWT_SECRET is set in Vercel environment variables
2. Check that user exists in database
3. Verify password hash matches (use bcrypt to check)

## Migration from Old Database

If you have existing data in SQLite database:

### Step 1: Export SQLite Data

```bash
sqlite3 database/tumaini.db .dump > data-export.sql
```

### Step 2: Convert SQLite to PostgreSQL

1. Replace `INTEGER PRIMARY KEY AUTOINCREMENT` with `SERIAL PRIMARY KEY`
2. Replace `DATETIME` with `TIMESTAMP`
3. Replace `?` placeholders with `$1, $2, $3...`

### Step 3: Import to Supabase

1. Clean up the SQL (remove SQLite-specific commands)
2. Run in Supabase SQL Editor

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Vercel Support**: https://vercel.com/support

## Security Best Practices

1. ✅ **Never commit `.env` file** (add to `.gitignore`)
2. ✅ **Use strong JWT_SECRET** (minimum 32 characters, random)
3. ✅ **Keep service_role key secret** (never expose in frontend)
4. ✅ **Enable Row Level Security** (RLS) in Supabase
5. ✅ **Use HTTPS only** (Vercel provides this automatically)
6. ✅ **Regularly update dependencies**
7. ✅ **Monitor logs** for suspicious activity
8. ✅ **Backup database regularly**

## What's Next?

After successful deployment:

1. **Set up monitoring**: Use Vercel Analytics
2. **Configure custom domain**: Point your domain to Vercel
3. **Set up email notifications**: For contact form submissions
4. **Enable database backups**: Schedule automated backups
5. **Add more features**: Extend the CMS as needed

---

## Quick Reference

### Supabase Dashboard
- **URL**: https://app.supabase.com
- **Tables**: Database → Table Editor
- **SQL**: Database → SQL Editor
- **Storage**: Storage → uploads bucket
- **Logs**: Logs → API Logs

### Vercel Dashboard
- **URL**: https://vercel.com/dashboard
- **Deployments**: Project → Deployments
- **Logs**: Deployment → Runtime Logs
- **Settings**: Project → Settings
- **Domains**: Project → Settings → Domains

### Local Commands
```bash
# Start local development
vercel dev

# Deploy to production
vercel --prod

# View logs
vercel logs

# Update API URLs
node update-api-urls.js
```

---

**Congratulations!** 🎉 Your Tumaini CMS is now running on modern, scalable infrastructure with Supabase and Vercel.
