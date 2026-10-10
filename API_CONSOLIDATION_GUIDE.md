# API Consolidation Guide

We consolidated 19 API functions down to 10 to fit within Vercel's Hobby plan limit (12 functions max).

## 🔄 API Changes

### Old Structure (19 functions - TOO MANY):
```
/api/homepage/index.js
/api/about/index.js
/api/admissions/index.js
/api/children-home/index.js
/api/contact/index.js
/api/get-involved/index.js
/api/settings/index.js
/api/news/index.js
/api/news/all.js
/api/gallery/images.js
/api/gallery/categories.js
/api/gallery/all.js
/api/auth/* (6 functions)
/api/upload/index.js
```

### New Structure (10 functions - WITHIN LIMIT):
```
/api/content.js          ← Handles all CMS pages
/api/news.js             ← All news operations
/api/gallery.js          ← All gallery operations
/api/auth/* (6 functions) ← Login, logout, etc.
/api/upload/index.js     ← Image uploads
```

## 📝 How to Update Frontend Code

### For CMS Content Pages (Homepage, About, Admissions, etc.):

**Old API calls:**
```javascript
// Homepage
fetch('/api/homepage')
fetch('/api/homepage', { method: 'PUT', body: data })

// About
fetch('/api/about')
fetch('/api/about', { method: 'PUT', body: data })
```

**New API calls (use query parameter `?type=`):**
```javascript
// Homepage
fetch('/api/content?type=homepage')
fetch('/api/content?type=homepage', { method: 'PUT', body: data })

// About
fetch('/api/content?type=about')
fetch('/api/content?type=about', { method: 'PUT', body: data })

// Admissions
fetch('/api/content?type=admissions')

// Children's Home
fetch('/api/content?type=children-home')

// Contact
fetch('/api/content?type=contact')

// Get Involved
fetch('/api/content?type=get-involved')

// Settings
fetch('/api/content?type=settings')
```

### For News:

**Old API calls:**
```javascript
// Get published news
fetch('/api/news')

// Get all news (admin)
fetch('/api/news/all', { headers: { Authorization: `Bearer ${token}` } })

// Get single article
fetch(`/api/news/${id}`)
```

**New API calls (same endpoint, use query parameters):**
```javascript
// Get published news
fetch('/api/news')

// Get all news (admin)
fetch('/api/news?all=true', { headers: { Authorization: `Bearer ${token}` } })

// Get single article
fetch(`/api/news?id=${id}`)

// Create article (POST)
fetch('/api/news', { method: 'POST', body: articleData, headers: { Authorization } })

// Update article (PUT)
fetch(`/api/news?id=${id}`, { method: 'PUT', body: updates, headers: { Authorization } })

// Delete article (DELETE)
fetch(`/api/news?id=${id}`, { method: 'DELETE', headers: { Authorization } })
```

### For Gallery:

**Old API calls:**
```javascript
// Get published images
fetch('/api/gallery/images')

// Get all images (admin)
fetch('/api/gallery/all', { headers: { Authorization: `Bearer ${token}` } })

// Get categories
fetch('/api/gallery/categories')
```

**New API calls (use `type` parameter):**
```javascript
// Get published images
fetch('/api/gallery?type=images')

// Get all images (admin)
fetch('/api/gallery?type=images&all=true', { headers: { Authorization: `Bearer ${token}` } })

// Get categories
fetch('/api/gallery?type=categories')

// Get single image
fetch(`/api/gallery?type=images&id=${id}`)

// Create image (POST)
fetch('/api/gallery?type=images', { method: 'POST', body: imageData, headers: { Authorization } })

// Update image (PUT)
fetch(`/api/gallery?type=images&id=${id}`, { method: 'PUT', body: updates, headers: { Authorization } })

// Delete image (DELETE)
fetch(`/api/gallery?type=images&id=${id}`, { method: 'DELETE', headers: { Authorization } })

// Same for categories - just use type=categories
```

## 🔧 Files That Need Updating

### Dashboard:
- ✅ `public/admin/dashboard.html` - ALREADY UPDATED

### Editor Pages (need to update API URLs):
- `public/admin/pages/homepage.html` → Change `/api/homepage` to `/api/content?type=homepage`
- `public/admin/pages/about.html` → Change `/api/about` to `/api/content?type=about`
- `public/admin/pages/admissions.html` → Change `/api/admissions` to `/api/content?type=admissions`
- `public/admin/pages/children-home.html` → Change `/api/children-home` to `/api/content?type=children-home`
- `public/admin/pages/contact.html` → Change `/api/contact` to `/api/content?type=contact`
- `public/admin/pages/get-involved.html` → Change `/api/get-involved` to `/api/content?type=get-involved`
- `public/admin/pages/settings.html` → Change `/api/settings` to `/api/content?type=settings`
- `public/admin/pages/news.html` → Update news API calls
- `public/admin/pages/gallery.html` → Update gallery API calls

### Public Pages (if they fetch from API):
- `public/index.html` (homepage)
- `public/about.html`
- `public/news.html`
- `public/gallery.html`
- etc.

## 🚀 Quick Update Script

Run this PowerShell script to update all files automatically:

```powershell
# Update homepage editor
(Get-Content public/admin/pages/homepage.html) -replace '/api/homepage', '/api/content?type=homepage' | Set-Content public/admin/pages/homepage.html

# Update about editor
(Get-Content public/admin/pages/about.html) -replace '/api/about', '/api/content?type=about' | Set-Content public/admin/pages/about.html

# Update admissions editor
(Get-Content public/admin/pages/admissions.html) -replace '/api/admissions', '/api/content?type=admissions' | Set-Content public/admin/pages/admissions.html

# Update children-home editor
(Get-Content public/admin/pages/children-home.html) -replace '/api/children-home', '/api/content?type=children-home' | Set-Content public/admin/pages/children-home.html

# Update contact editor
(Get-Content public/admin/pages/contact.html) -replace '/api/contact', '/api/content?type=contact' | Set-Content public/admin/pages/contact.html

# Update get-involved editor
(Get-Content public/admin/pages/get-involved.html) -replace '/api/get-involved', '/api/content?type=get-involved' | Set-Content public/admin/pages/get-involved.html

# Update settings editor
(Get-Content public/admin/pages/settings.html) -replace '/api/settings', '/api/content?type=settings' | Set-Content public/admin/pages/settings.html
```

## ✅ Benefits of Consolidation:

1. **Fits Vercel free plan** - 10 functions < 12 limit ✅
2. **Faster deployments** - Fewer functions to build
3. **Easier maintenance** - One file handles multiple content types
4. **Consistent API pattern** - All content uses same structure
5. **Better caching** - Single endpoint can cache better

## 🎯 Next Steps:

1. Run the update script above
2. Commit changes: `git add -A && git commit -m "Update frontend to use consolidated APIs"`
3. Push to deploy: `git push origin main`
4. Wait for Vercel deployment to complete
5. Test all editor pages

---

**Note:** Auth and upload APIs remain unchanged - no frontend updates needed for those!
