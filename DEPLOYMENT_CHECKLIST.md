# Tumaini CMS - Deployment Checklist

Use this checklist to complete your migration to Supabase and Vercel.

## Pre-Deployment ✅

### Local Setup
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Project files downloaded/cloned
- [ ] Dependencies installed (`npm install`)

### Accounts Created
- [ ] Supabase account (https://supabase.com)
- [ ] Vercel account (https://vercel.com)
- [ ] GitHub account (for deployment)

---

## Phase 1: Supabase Setup 🗄️

### Create Project
- [ ] Go to https://supabase.com
- [ ] Click "New Project"
- [ ] Name: `tumaini-cms`
- [ ] Set strong database password (save it!)
- [ ] Choose region (closest to users)
- [ ] Wait for project initialization (2-3 min)

### Get Credentials
- [ ] Go to Settings → API
- [ ] Copy Project URL
- [ ] Copy `anon` `public` key
- [ ] Copy `service_role` key (keep secret!)
- [ ] Save all credentials securely

### Create Database Schema
- [ ] Go to SQL Editor
- [ ] Click "New Query"
- [ ] Copy content from `supabase-migration.sql`
- [ ] Paste and click "Run"
- [ ] Verify success message
- [ ] Go to Table Editor
- [ ] Confirm 13 tables exist:
  - [ ] about
  - [ ] admissions
  - [ ] childrens_home
  - [ ] children_home
  - [ ] contact
  - [ ] gallery_categories
  - [ ] gallery_images
  - [ ] get_involved
  - [ ] homepage
  - [ ] news
  - [ ] news_page_settings
  - [ ] settings
  - [ ] users

### Create Admin User
- [ ] Generate password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123', 10, (err, hash) => console.log(hash));"
```
- [ ] Copy the hash output
- [ ] Go to SQL Editor
- [ ] Run this query (replace hash and email):
```sql
INSERT INTO users (email, username, password, first_name, last_name, role, status)
VALUES (
  'admin@tumaini.school',
  'admin',
  '$2a$10$YOUR_HASHED_PASSWORD_HERE',
  'Admin',
  'User',
  'admin',
  'active'
);
```
- [ ] Verify user created in Table Editor → users

### Set Up Storage
- [ ] Go to Storage in sidebar
- [ ] Click "Create a new bucket"
- [ ] Name: `uploads`
- [ ] Public bucket: ✅ Checked
- [ ] Create bucket
- [ ] Inside `uploads` bucket, create folders:
  - [ ] `images/`
  - [ ] `gallery/`
  - [ ] `news/`

### Configure Storage Policies
- [ ] Click "Policies" tab
- [ ] Create policy: "Public Read Access"
  - [ ] SQL: `(bucket_id = 'uploads'::text)`
  - [ ] Operations: SELECT
  - [ ] Save
- [ ] Create policy: "Admin Upload"
  - [ ] SQL: `(bucket_id = 'uploads'::text AND auth.role() = 'authenticated')`
  - [ ] Operations: INSERT, UPDATE, DELETE
  - [ ] Save

---

## Phase 2: Local Configuration 💻

### Environment Setup
- [ ] Create `.env` file in project root
- [ ] Add these variables:
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
JWT_SECRET=create_a_random_32_character_secret
JWT_EXPIRE=7d
NODE_ENV=development
```
- [ ] Replace placeholder values with real credentials
- [ ] Save file

### Generate JWT Secret
- [ ] Run this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- [ ] Copy output
- [ ] Paste as JWT_SECRET in `.env`

### Update API URLs
- [ ] Run: `npm run update-urls`
- [ ] Verify "Updated X file(s)" message
- [ ] Check a file in `public/admin/` to confirm URLs changed

### Install Vercel CLI
- [ ] Run: `npm install -g vercel`
- [ ] Verify: `vercel --version`

---

## Phase 3: Local Testing 🧪

### Start Development Server
- [ ] Run: `npm run dev`
- [ ] Wait for "Ready" message
- [ ] Note the local URL (usually http://localhost:3000)

### Test Public Site
- [ ] Open: http://localhost:3000
- [ ] Verify homepage loads
- [ ] Click navigation links:
  - [ ] About Us
  - [ ] Admissions
  - [ ] Children's Home
  - [ ] News
  - [ ] Gallery
  - [ ] Contact
  - [ ] Get Involved

### Test Admin Authentication
- [ ] Open: http://localhost:3000/admin/login.html
- [ ] Login with:
  - Email: admin@tumaini.school
  - Password: (your password)
- [ ] Verify successful login
- [ ] Check redirect to dashboard

### Test Admin Dashboard
- [ ] Verify dashboard loads
- [ ] Check all menu items visible:
  - [ ] Homepage
  - [ ] About Us
  - [ ] Admissions
  - [ ] Children's Home
  - [ ] News
  - [ ] Gallery
  - [ ] Contact
  - [ ] Get Involved
  - [ ] Settings

### Test Content Editing
- [ ] Click "Homepage" in dashboard
- [ ] Try editing hero title
- [ ] Click "Save Changes"
- [ ] Verify success message
- [ ] Go to public homepage
- [ ] Verify changes appear

### Test Image Upload (If Implemented)
- [ ] Go to Gallery in admin
- [ ] Try uploading image
- [ ] Verify upload success
- [ ] Check image appears in gallery

---

## Phase 4: Git & GitHub Setup 📦

### Initialize Git
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit - Supabase + Vercel migration"`

### Create GitHub Repository
- [ ] Go to https://github.com
- [ ] Click "New repository"
- [ ] Name: `tumaini-cms`
- [ ] Description: "Tumaini School & Children's Home CMS"
- [ ] Visibility: Private (recommended)
- [ ] Do NOT initialize with README
- [ ] Click "Create repository"

### Push to GitHub
- [ ] Copy the repository URL
- [ ] Run: `git remote add origin YOUR_REPO_URL`
- [ ] Run: `git branch -M main`
- [ ] Run: `git push -u origin main`
- [ ] Refresh GitHub page
- [ ] Verify files are uploaded

---

## Phase 5: Vercel Deployment 🚀

### Import Project
- [ ] Go to https://vercel.com
- [ ] Click "Add New Project"
- [ ] Click "Import" next to your GitHub repo
- [ ] If not visible, configure GitHub App

### Configure Project
- [ ] Framework Preset: Other
- [ ] Root Directory: `./`
- [ ] Build Command: (leave empty)
- [ ] Output Directory: `public`
- [ ] Install Command: `npm install`

### Add Environment Variables
Click "Environment Variables" and add each:
- [ ] `SUPABASE_URL` = (your Supabase project URL)
- [ ] `SUPABASE_ANON_KEY` = (your anon key)
- [ ] `SUPABASE_SERVICE_KEY` = (your service role key)
- [ ] `JWT_SECRET` = (your JWT secret from .env)
- [ ] `JWT_EXPIRE` = `7d`
- [ ] `NODE_ENV` = `production`

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (1-2 minutes)
- [ ] Check for "Congratulations!" message
- [ ] Copy deployment URL

---

## Phase 6: Production Testing 🎯

### Test Live Site
- [ ] Visit your Vercel URL
- [ ] Test all pages:
  - [ ] Homepage
  - [ ] About Us
  - [ ] Admissions
  - [ ] Children's Home
  - [ ] News
  - [ ] Gallery
  - [ ] Contact
  - [ ] Get Involved

### Test Live Admin
- [ ] Go to: `YOUR_VERCEL_URL/admin/login.html`
- [ ] Login with credentials
- [ ] Verify dashboard loads
- [ ] Test editing content
- [ ] Verify changes appear on public site

### Test API Endpoints
- [ ] In browser console, test:
```javascript
// Test public endpoint
fetch('/api/homepage')
  .then(r => r.json())
  .then(console.log);
```
- [ ] Verify data returns

### Check Logs
- [ ] In Vercel dashboard, go to your project
- [ ] Click "Deployments"
- [ ] Click latest deployment
- [ ] Click "Runtime Logs"
- [ ] Verify no errors

---

## Phase 7: Custom Domain (Optional) 🌐

### Add Domain
- [ ] In Vercel project, go to Settings → Domains
- [ ] Click "Add"
- [ ] Enter your domain: `www.tumaini.school`
- [ ] Click "Add"

### Configure DNS
- [ ] Follow Vercel's DNS instructions
- [ ] Add CNAME record at your domain registrar
- [ ] Wait for DNS propagation (5-30 min)
- [ ] Verify green checkmark in Vercel

### Test Custom Domain
- [ ] Visit `https://www.tumaini.school`
- [ ] Verify site loads
- [ ] Test admin login
- [ ] Verify everything works

---

## Phase 8: Post-Deployment 🎉

### Update Documentation
- [ ] Update README with live URL
- [ ] Document admin credentials (securely)
- [ ] Create user guide for content editors

### Set Up Monitoring
- [ ] Enable Vercel Analytics (if desired)
- [ ] Set up email notifications for errors
- [ ] Configure Supabase email alerts

### Security Review
- [ ] Verify `.env` is in `.gitignore`
- [ ] Confirm service key not exposed
- [ ] Check RLS policies active
- [ ] Verify HTTPS working

### Backup Strategy
- [ ] Document backup procedure
- [ ] Test database export
- [ ] Schedule regular backups

### Training
- [ ] Train admin users on CMS
- [ ] Document common tasks
- [ ] Create troubleshooting guide

---

## Troubleshooting Common Issues 🔧

### Issue: Can't login to admin
- [ ] Check user exists in Supabase (Table Editor → users)
- [ ] Verify password hash is correct
- [ ] Check JWT_SECRET in Vercel environment variables
- [ ] Look at browser console for errors

### Issue: API returns 500 error
- [ ] Check Vercel Runtime Logs
- [ ] Verify environment variables are set
- [ ] Test database connection in Supabase
- [ ] Check SQL query syntax

### Issue: Images not uploading
- [ ] Verify Storage bucket exists
- [ ] Check storage policies
- [ ] Verify file size under limit
- [ ] Check browser console

### Issue: Changes not appearing
- [ ] Clear browser cache
- [ ] Check Network tab in DevTools
- [ ] Verify API call succeeded
- [ ] Check Supabase Table Editor for data

---

## Success Criteria ✨

Your migration is complete when:
- [✅] All public pages load correctly
- [✅] Admin can login successfully
- [✅] Content can be edited through admin panel
- [✅] Changes appear on public site immediately
- [✅] Images upload and display correctly
- [✅] No errors in Vercel logs
- [✅] No errors in browser console
- [✅] Site loads fast (< 3 seconds)
- [✅] HTTPS is working
- [✅] Custom domain configured (if applicable)

---

## Next Steps 🚀

After successful deployment:
1. **Content Migration**: Import existing content from old database
2. **Complete Remaining APIs**: News, Gallery, Contact forms
3. **Training**: Teach admins how to use CMS
4. **SEO**: Add meta tags, sitemap, robots.txt
5. **Analytics**: Set up Google Analytics or similar
6. **Monitoring**: Configure uptime monitoring
7. **Performance**: Optimize images, add caching
8. **Features**: Add new features as needed

---

## Support Resources 📚

- **Setup Guide**: `SETUP_SUPABASE_VERCEL.md`
- **Progress Tracker**: `VERCEL_MIGRATION_PROGRESS.md`
- **Database Docs**: `DATABASE_SCHEMA_ANALYSIS.md`
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

**Good luck with your deployment! 🎊**

Save this checklist and check off items as you complete them.
