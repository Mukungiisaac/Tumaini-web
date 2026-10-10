# Image System Guide

This guide explains how images work in your Tumaini CMS and how to ensure they display correctly on both the admin and public sites.

## Current Image System

Your CMS uses **two ways** to handle images:

### 1. Local Images (Currently Used)
- Stored in: `public/assets/images/` folder
- Referenced as: `assets/images/filename.jpg`
- **Pros**: Simple, no extra setup needed
- **Cons**: Need to deploy images with your site code

### 2. Supabase Storage (Recommended - NEW!)
- Stored in: Supabase Storage buckets
- Referenced as: Full URL `https://sdqlyzfcffhmmwmxuhrc.supabase.co/storage/v1/object/public/tumaini-images/...`
- **Pros**: Unlimited storage, don't redeploy code for new images
- **Cons**: Requires bucket setup (instructions below)

## Setup Supabase Storage (One-Time)

Before you can upload images through the CMS, set up Supabase Storage:

### Step 1: Create Storage Bucket

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Go to **Storage** in left sidebar
3. Click **New Bucket**
4. Bucket name: `tumaini-images`
5. Check **Public bucket** (allows public read access to images)
6. Click **Create Bucket**

### Step 2: Set Storage Policies

The bucket is public by default for reading. No additional policies needed for now.

### Step 3: Add Service Role Key to Vercel

The upload API needs your Supabase service role key:

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy the `service_role` key (NOT the anon key)
3. In Vercel Dashboard, go to your project → **Settings** → **Environment Variables**
4. Add new variable:
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: [paste your service role key]
   - Environment: Production, Preview, Development
5. Click **Save**
6. Redeploy your site (Vercel will auto-redeploy after env var change)

## Current Images in Your Project

Based on your `.kilo/worktrees/yellow-cabinet/assets/images/` folder, you have these images:

```
✅ 20220911141316-img-7845-1790150148115-582573008.JPG
✅ about-campus.jpg
✅ about-hero.jpg
✅ academics-1790068319817-433872590.jfif
✅ admissions-hero.jpg
✅ bthevoice-1790060787160-131953823.png
✅ care-nutrition.jpg
✅ chatgpt-image-may-4--2026--05-41-36-pm-1790055399348-534451218.png
✅ children-hero.jpg
✅ enviroment.jpg
✅ food.jfif
✅ graphivio-1790060810285-247512276.jpg
✅ health-1790068435068-642158073.jfif
✅ hero-avatars.jpg
✅ holistic-learning-1790055525119-941026403.jpg
✅ holistic-learning.jpg
✅ home-hero.jpg
✅ image.png
✅ in-class.png
... and more
```

## Deploy Existing Images to Public Folder

### Step 1: Check Local Folder
Ensure images exist in your main project:

```powershell
Get-ChildItem "public/assets/images" -File
```

If the folder doesn't exist or is empty, copy images:

```powershell
# Create images folder if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/assets/images"

# Copy images from yellow-cabinet worktree
Copy-Item ".kilo/worktrees/yellow-cabinet/assets/images/*" "public/assets/images/" -Recurse -Force
```

### Step 2: Commit and Deploy

```powershell
git add public/assets/images/
git commit -m "Add school images to public folder"
git push origin main
```

Wait 1-2 minutes for Vercel to rebuild.

### Step 3: Verify Images are Accessible

Visit these URLs to check if images load:

1. https://tumaini-home-iota.vercel.app/assets/images/home-hero.jpg
2. https://tumaini-home-iota.vercel.app/assets/images/about-hero.jpg
3. https://tumaini-home-iota.vercel.app/assets/images/admissions-hero.jpg

**Expected**: Images should load in browser  
**If 404 Error**: Images not deployed correctly, check folder structure

## How Image Upload Works in CMS

I've created a new `/api/upload` endpoint that uploads images to Supabase Storage.

### Upload Flow:

1. User clicks "Choose File" in any editor page
2. JavaScript reads the file using `FileReader` and converts to base64
3. Sends image data to `/api/upload` API with auth token
4. API verifies user is authenticated
5. API uploads image to Supabase Storage bucket `tumaini-images`
6. API returns public URL: `https://sdqlyzfcffhmmwmxuhrc.supabase.co/storage/v1/object/public/tumaini-images/image-123456.jpg`
7. Editor saves the image URL to database
8. Public site displays the image using the URL

### Example Upload Request:

```javascript
const file = document.getElementById('fileInput').files[0];
const reader = new FileReader();

reader.onload = async function(e) {
  const base64Image = e.target.result; // data:image/jpeg;base64,/9j/4AAQ...
  
  const token = await Auth.getAuthToken();
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      image: base64Image,
      filename: file.name,
      oldImage: currentImageUrl // Optional: to delete old image
    })
  });
  
  const result = await response.json();
  console.log('Uploaded:', result.url); // Use this URL in your database
};

reader.readAsDataURL(file);
```

## Testing Image Upload

### Method 1: Through CMS (Recommended)

1. Login to admin: https://tumaini-home-iota.vercel.app/admin/login.html
2. Go to **Homepage** editor
3. Find "Hero Image" field
4. Click "Choose File" button
5. Select an image from your computer
6. Click "Save Changes"
7. Check if image appears in the editor preview
8. Visit public homepage to verify image displays

### Method 2: Direct Upload to Supabase Storage

If CMS upload doesn't work yet:

1. In Supabase Dashboard, go to **Storage** → `tumaini-images` bucket
2. Click **Upload file**
3. Select images from your computer
4. Copy the public URL of uploaded image
5. In CMS editor, paste the URL in image field
6. Click "Save Changes"

## Troubleshooting

### Upload API Returns 500 Error

**Possible causes:**
1. Supabase storage bucket `tumaini-images` doesn't exist
2. Service role key not set in Vercel env vars
3. Bucket is not public

**Solution:**
- Follow "Setup Supabase Storage" steps above
- Check Vercel logs: Vercel Dashboard → Deployment → Functions → View Logs

### Images Not Showing on Public Site

**Cause 1**: Wrong image path in database  
**Solution**: Check database - should be full Supabase URL or relative path starting with `assets/images/`

**Cause 2**: Public HTML files don't fetch from API  
**Solution**: Ensure public pages load content via API, not hardcoded HTML

**Cause 3**: CORS issue  
**Solution**: API already includes CORS headers, but check browser console for errors

### "Failed to upload" in CMS

**Cause**: Editor pages might still use old upload code  
**Solution**: Check editor page upload function, ensure it sends base64 data to `/api/upload`

### Images Too Large

**Current limit**: No limit in new API (Supabase free tier: 1GB storage)  
**Recommendation**: Resize images to max 1920px width before uploading to save storage space

## Best Practices

1. **Image Naming**: Use descriptive names like `homepage-hero.jpg`, `about-team-photo.jpg`
2. **Image Size**: Optimize images before upload (use tools like TinyPNG)
3. **Formats**: Use JPG for photos, PNG for graphics with transparency, WebP for best compression
4. **Alt Text**: Always add descriptive text for accessibility
5. **Backup**: Supabase Storage is backed up, but keep local copies of important images

## Next Steps

1. ✅ Create `tumaini-images` bucket in Supabase Storage
2. ✅ Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel env vars
3. ✅ Copy existing images to `public/assets/images/` and deploy
4. ✅ Test upload in Homepage editor
5. ✅ Upload real school photos to replace placeholders
6. ✅ Update all pages with actual images
7. ⏭️ Remove old images from `public/assets/images/` to save space (after migrating to Supabase Storage)

---

**Ready?** Set up the Supabase Storage bucket now and start uploading images! 📸
