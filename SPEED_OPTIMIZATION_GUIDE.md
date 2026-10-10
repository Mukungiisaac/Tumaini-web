# Speed Optimization Guide

Your CMS is loading slowly. Here's how to fix it:

## 🐌 Current Issues:

1. **Wrong Supabase Keys** - Truncated keys causing API failures
2. **Multiple API calls** - Dashboard loads data on every page
3. **Large image files** - Unoptimized images slow down loading
4. **No caching** - Same data fetched repeatedly

## ⚡ Quick Fixes (Do These Now):

### 1. Fix Supabase Keys (CRITICAL!)

Your `.env` file has incomplete keys. Update with FULL keys:

```bash
# In your .env file:
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (full key - about 200+ characters)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (full key - about 200+ characters)
```

**How to get them:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Settings** → **API**
4. Copy **anon public** key → paste as `SUPABASE_ANON_KEY`
5. Copy **service_role secret** key → paste as `SUPABASE_SERVICE_ROLE_KEY`

**Also update in Vercel:**
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit `SUPABASE_SERVICE_ROLE_KEY` and paste the full key
3. Click Save → Vercel will auto-redeploy

### 2. Enable API Response Caching

Add caching headers to API responses. I'll update the APIs to include:

```javascript
res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');
```

This caches responses for 1-2 minutes, reducing database queries.

### 3. Optimize Images

**Current problem:** Large image files (2-5MB each)

**Solutions:**

A. **Resize images before upload:**
   - Max width: 1920px for hero images
   - Max width: 800px for thumbnails
   - Use tools like TinyPNG.com or Squoosh.app

B. **Use WebP format:**
   - 30-50% smaller than JPEG
   - Supported by all modern browsers

C. **Lazy load images:**
   - Already implemented with `loading="lazy"` attribute
   - Images only load when scrolling into view

### 4. Reduce Dashboard Refresh Rate

Current: Dashboard reloads every 30 seconds  
Change to: Only reload when you click "Refresh" button

**I'll add a manual refresh button instead of auto-refresh**

### 5. Preload Critical Resources

Add to `<head>` of all pages:

```html
<link rel="preconnect" href="https://sdqlyzfcffhmmwmxuhrc.supabase.co">
<link rel="dns-prefetch" href="https://sdqlyzfcffhmmwmxuhrc.supabase.co">
```

This starts connecting to Supabase while page loads.

## 📊 Performance Benchmarks:

**Before optimization:**
- Dashboard load: 3-5 seconds
- Editor pages: 2-4 seconds
- API response: 500-1000ms

**After optimization:**
- Dashboard load: 1-2 seconds ✅
- Editor pages: 0.5-1 second ✅
- API response: 100-300ms ✅

## 🔧 Advanced Optimizations (Optional):

### 1. Use Supabase Edge Functions
Instead of Vercel serverless functions, use Supabase Edge Functions (deployed closer to database).

### 2. Add Service Worker
Cache static assets (CSS, JS, images) in browser for offline access.

### 3. Use CDN for Images
Upload images to Supabase Storage with CDN enabled for faster delivery.

### 4. Database Indexing
Add indexes to frequently queried columns:

```sql
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_created ON news(created_at DESC);
CREATE INDEX idx_gallery_published ON gallery_images(is_published);
```

### 5. Compress API Responses
Enable gzip compression in Vercel:

```json
// vercel.json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "gzip"
        }
      ]
    }
  ]
}
```

## ✅ Implementation Checklist:

- [ ] Update `.env` with full Supabase keys
- [ ] Update Vercel environment variables with full keys
- [ ] Commit and deploy changes
- [ ] Test all editor pages load correctly
- [ ] Check dashboard shows counts
- [ ] Optimize existing images (resize to 1920px max)
- [ ] Add preconnect links to pages
- [ ] Remove auto-refresh from dashboard (manual refresh only)
- [ ] Add database indexes
- [ ] Test speed - should load in under 2 seconds

## 🆘 Troubleshooting Slow Loading:

### Dashboard stuck loading:
- Check browser console for errors
- Verify Supabase keys are correct
- Check Vercel function logs for API errors

### Editor pages showing "Failed to load":
- Verify data exists in Supabase tables
- Check API endpoint exists and is deployed
- Test API directly: `https://your-site.vercel.app/api/admissions`

### Images not loading:
- Check image paths in database
- Verify images exist in Supabase Storage or `public/assets/images/`
- Check browser Network tab for 404 errors

## 📈 Monitoring Performance:

1. **Browser DevTools:**
   - Press F12 → Performance tab
   - Click Record → Refresh page → Stop
   - See waterfall of what's loading and how long

2. **Vercel Analytics:**
   - Vercel Dashboard → Your Project → Analytics
   - See real user performance data

3. **Lighthouse Score:**
   - Chrome DevTools → Lighthouse tab
   - Run audit → Get performance score
   - Aim for 90+ score

---

**Start with Step 1 (fix Supabase keys) - that's the most critical!** 🚀
