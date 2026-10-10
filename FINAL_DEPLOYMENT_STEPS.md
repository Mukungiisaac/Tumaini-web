# Final Deployment Steps - Tumaini CMS

## ✅ What's Done:
- Database migrated to Supabase ✅
- Code restructured for Vercel ✅  
- Pushed to GitHub ✅
- Vercel project exists ✅

## 🚀 Complete Deployment Now:

### Step 1: Check Vercel Deployment Status

1. Go to: **https://vercel.com/dashboard**
2. Find your project: **tumaini-home**
3. You should see a deployment in progress from your latest push
4. Wait for it to complete (usually 2-5 minutes)

### Step 2: Add Environment Variables to Vercel

**CRITICAL:** Your API won't work without these!

1. In Vercel dashboard, click your project **tumaini-home**
2. Go to **Settings** → **Environment Variables**
3. Add each variable:

```
SUPABASE_URL = (your Supabase project URL)
SUPABASE_ANON_KEY = (your anon public key)
SUPABASE_SERVICE_KEY = (your service role key)
JWT_SECRET = (your JWT secret from .env file)
JWT_EXPIRE = 7d
NODE_ENV = production
```

4. **Important:** Apply to all environments (Production, Preview, Development)
5. Click **Save** after each one

### Step 3: Trigger Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the latest deployment
3. Click the **⋯** (three dots) menu
4. Select **Redeploy**
5. Check **Use existing Build Cache**
6. Click **Redeploy**

### Step 4: Test Your Site

Once deployment completes:

1. Click **Visit** button or copy the deployment URL
2. Test these URLs:

**Public Site:**
- `https://your-site.vercel.app/index.html` - Homepage
- `https://your-site.vercel.app/about.html` - About
- `https://your-site.vercel.app/admissions.html` - Admissions

**Admin Panel:**
- `https://your-site.vercel.app/admin/login.html` - Login page

**API Test:**
- `https://your-site.vercel.app/api/homepage` - Should return JSON

### Step 5: Test Admin Login

1. Go to: `https://your-site.vercel.app/admin/login.html`
2. Login with your admin credentials from Supabase
3. Verify dashboard loads
4. Try editing homepage content
5. Check if changes appear on public site

---

## ⚠️ Troubleshooting

### Issue: "404 Not Found" on homepage
**Fix:** Access with `/index.html` explicitly: `https://your-site.vercel.app/index.html`

### Issue: API returns errors
**Fix:** Check environment variables are set correctly in Vercel Settings

### Issue: Can't login
**Fix:** 
1. Verify admin user exists in Supabase (Table Editor → users)
2. Check JWT_SECRET is set in Vercel
3. Check browser console for errors

### Issue: Changes in admin don't save
**Fix:**
1. Check Vercel Runtime Logs for errors
2. Verify SUPABASE_SERVICE_KEY is set
3. Check RLS is disabled on tables (or use service key)

---

## 📝 What to Check in Vercel Logs:

If something doesn't work:

1. Go to **Deployments** in Vercel
2. Click latest deployment
3. Click **Runtime Logs**
4. Look for errors in red
5. Common issues:
   - Missing environment variables
   - Database connection failures
   - SQL syntax errors

---

## 🎯 Success Checklist:

- [ ] Vercel deployment shows "Ready"
- [ ] Homepage loads at `/index.html`
- [ ] Admin login page loads
- [ ] Can login with admin credentials
- [ ] Dashboard shows all menu items
- [ ] Can edit and save homepage content
- [ ] Changes appear on public site immediately
- [ ] No errors in browser console
- [ ] No errors in Vercel logs

---

## 🔗 Your URLs:

**GitHub Repo:**
https://github.com/Mukungiisaac/Tumaini-web

**Vercel Dashboard:**
https://vercel.com/dashboard

**Vercel Project:**
https://vercel.com/tumainicomprehensive-9403/tumaini-home

**Live Site:**
Check Vercel dashboard for your deployment URL

---

## 📞 Need Help?

If deployment fails or something doesn't work:

1. Check Vercel **Runtime Logs** for specific errors
2. Verify all environment variables are set
3. Check Supabase database has data
4. Test API endpoints directly in browser
5. Check browser console for frontend errors

---

## 🎉 After Successful Deployment:

1. **Update API URLs**: Run `npm run update-urls` if needed
2. **Custom Domain**: Add your domain in Vercel Settings → Domains
3. **Monitor**: Check Vercel Analytics for site performance
4. **Backup**: Export Supabase database regularly
5. **Updates**: Push to GitHub = automatic deployment

---

**Your migration is 95% complete! Just need to add environment variables and test.** 🚀
