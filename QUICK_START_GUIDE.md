# Tumaini CMS - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Start the Backend Server

```bash
cd backend
npm start
```

**Expected Output:**
```
🚀 Tumaini CMS Backend running on port 3001
✅ Database initialized successfully
✅ Default admin user created
```

### Step 2: Login to Admin Panel

1. Open your browser
2. Navigate to: `file:///YOUR_PATH/Tumaini-web/admin/login.html`
   Or use a local server:
   ```bash
   # In the root directory
   npx http-server -p 8080
   # Then visit: http://localhost:8080/admin/login.html
   ```

3. **Login with:**
   - Email: `admin@tumaini.school`
   - Password: `Admin123!`

### Step 3: Explore the Dashboard

After login, you'll see the **Dashboard** with:
- **Statistics Cards** - Will show 0 until you create content
- **Sidebar Navigation** - Click any link to access different editors
- **Quick Action Links** - Fast access to common tasks

### Step 4: Create Your First Content

#### Option A: Create a News Article
1. Click **"News"** in the sidebar
2. Click **"Create Article"** button
3. Fill in:
   - Title: "Welcome to Tumaini School"
   - Category: "General"
   - Content: "We are excited to announce..."
   - Status: "Published"
4. Click **"Create Article"**
5. ✅ Success! Your first article is created

#### Option B: Add Gallery Images
1. Click **"Gallery"** in the sidebar
2. Add a category first:
   - Enter "School Events"
   - Click **"Add Category"**
3. Click **"Add Image"**
4. Fill in:
   - Title: "Campus View"
   - Description: "Beautiful view of our campus"
   - Image URL: "assets/images/school.jpg"
   - Category: "School Events"
   - Published: ✓ Checked
5. Click **"Add Image"**
6. ✅ Image added!

#### Option C: Update Homepage
1. Click **"Homepage"** in the sidebar
2. Modify hero section:
   - Hero Title: "Welcome to Tumaini School"
   - Hero Description: "Empowering students since 2010"
   - Stat Students: "450+"
   - Stat Pass Rate: "98%"
3. Click **"Save Changes"**
4. ✅ Homepage updated!

### Step 5: View Changes on Public Site

1. Open `index.html` in your browser
2. You should see your updated content
3. Open browser console (F12) to see:
   ```
   ✅ Homepage loaded from CMS successfully
   ```

---

## Dashboard Navigation

### Sidebar Links (What Each Does)

| Link | Page | Purpose |
|------|------|---------|
| **Dashboard** | `dashboard.html` | Overview & statistics |
| **Homepage** | `pages/homepage.html` | Edit hero section & stats |
| **About Us** | `pages/about.html` | Manage mission, vision, history |
| **Admissions** | `pages/admissions.html` | Edit admission requirements |
| **Children's Home** | `pages/children-home.html` | Residential care content |
| **News** | `pages/news.html` | Create/edit news articles |
| **Gallery** | `pages/gallery.html` | Manage image gallery |
| **Get Involved** | `pages/get-involved.html` | Donation & volunteer info |
| **Contact** | `pages/contact.html` | Contact information |
| **Settings** | `pages/settings.html` | Site settings & password |

---

## Common Tasks

### How to Create a News Article

1. Go to **News** page
2. Click **"Create Article"**
3. Fill out the form
4. Choose **"Draft"** (private) or **"Published"** (public)
5. Click **"Create Article"**

**To Edit:**
- Click **"Edit"** next to any article
- Make changes
- Click **"Update Article"**

**To Delete:**
- Click **"Delete"** next to any article
- Confirm deletion

### How to Add Gallery Images

1. Go to **Gallery** page
2. **First, create categories** (optional):
   - Enter category name
   - Click **"Add Category"**
3. Click **"Add Image"**
4. Fill in image details
5. Select category (if created)
6. Check **"Publish"** to make it visible
7. Click **"Add Image"**

### How to Update Contact Information

1. Go to **Contact** page
2. Fill in:
   - Phone numbers (primary required)
   - Email addresses (primary required)
   - Physical address
   - Office hours
   - Social media links (JSON format)
   - Google Maps embed link
3. Click **"Save Changes"**

### How to Change Your Password

1. Go to **Settings** page
2. Click **"Account"** tab
3. Enter:
   - Current password
   - New password (min 8 characters)
   - Confirm new password
4. Click **"Update Password"**

---

## Why Statistics Show "0"

The dashboard statistics will show "0" until you create content:

- **Total News: 0** → Create a news article first
- **Gallery Images: 0** → Add images to gallery
- **Published Content: 0** → Publish some content

This is normal for a fresh installation!

---

## Troubleshooting

### Problem: Can't login / "Invalid credentials"
**Solution:**
- Make sure backend is running (`npm start` in `backend/` folder)
- Default credentials:
  - Email: `admin@tumaini.school`
  - Password: `Admin123!`
- Check browser console for errors

### Problem: "Failed to save changes"
**Solution:**
- Verify backend server is running
- Check that you're logged in
- Open browser console (F12) to see error details
- Try logging out and back in

### Problem: Statistics not updating
**Solution:**
- Refresh the page
- Make sure you're creating "Published" content (not drafts)
- Check backend console for errors

### Problem: Images not displaying
**Solution:**
- Verify image path is correct (e.g., `assets/images/photo.jpg`)
- Images must exist in the project folder
- Use relative paths from project root
- Check browser console for 404 errors

### Problem: Changes not showing on public site
**Solution:**
1. Make sure backend is running
2. Refresh the public page (Ctrl+F5)
3. Check browser console for API errors
4. Verify you saved changes in admin panel

### Problem: CORS errors in console
**Solution:**
- This is normal when opening HTML files directly
- Use a local server instead:
  ```bash
  npx http-server -p 8080
  ```
- Then access via `http://localhost:8080`

---

## Tips & Best Practices

### Content Creation Tips

1. **Use Draft Status First**
   - Create content as "Draft"
   - Preview and review
   - Then change to "Published"

2. **Organize with Categories**
   - Create categories for news and gallery
   - Helps visitors filter content
   - Keeps admin panel organized

3. **Add Descriptions**
   - Always add descriptions to images
   - Write meaningful news content
   - Helps with SEO

4. **Save Frequently**
   - Click "Save Changes" often
   - No auto-save feature (yet)
   - Don't rely on browser back button

### Image Management Tips

1. **Image Paths**
   - Always use relative paths
   - Start from project root: `assets/images/photo.jpg`
   - Don't use absolute paths: ❌ `C:/Users/...`

2. **Image Sizes**
   - Keep images under 2MB
   - Use `.jpg` for photos
   - Use `.png` for logos/graphics

3. **Organize Images**
   - Put all images in `assets/images/`
   - Use descriptive filenames
   - Create subfolders if needed

### Security Tips

1. **Change Default Password**
   - Go to Settings → Account
   - Change from `Admin123!` immediately
   - Use strong password (12+ characters)

2. **Don't Share Credentials**
   - Keep admin password secure
   - Each admin should have own account (future feature)

3. **Regular Backups**
   - Backup `database/tumaini.db` regularly
   - Export important content periodically

---

## Next Steps

### After Creating Initial Content

1. ✅ Create 3-5 news articles
2. ✅ Upload 10-15 gallery images
3. ✅ Update all page content (Homepage, About, etc.)
4. ✅ Fill in contact information
5. ✅ Set site settings (name, motto, colors)
6. ✅ Test all public pages
7. ✅ Change admin password

### Ready for Public Launch

Before going live:
- [ ] All content reviewed and approved
- [ ] Images optimized and loading fast
- [ ] Contact forms tested
- [ ] All links working
- [ ] Mobile responsive checked
- [ ] Admin password changed
- [ ] Database backed up

---

## Need Help?

### Resources

- **Phase 2 Complete Documentation**: `PHASE_2_COMPLETE.md`
- **Backend API**: `backend/README.md`
- **Admin Guide**: `admin/README.md`

### Support

If you encounter issues:
1. Check this guide first
2. Look for error messages in browser console (F12)
3. Check backend terminal for errors
4. Review the detailed documentation files

---

**Happy Content Managing! 🎉**

*Tumaini CMS - Built for Excellence*
