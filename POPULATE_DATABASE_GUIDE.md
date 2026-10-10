# Populate Database with Initial Data

Your CMS is now fully connected to Supabase Auth, but the database tables are empty. This guide will help you populate them with initial data so you can start editing content.

## Quick Steps

### 1. Run the Seed Data Script

1. Open your Supabase project dashboard: https://supabase.com/dashboard
2. Go to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-seed-data.sql` file
5. Paste into the SQL Editor
6. Click **Run** or press `Ctrl+Enter`

**Expected Result:** You should see a table showing record counts for each table (Homepage: 1, About: 1, News: 2, etc.)

### 2. Verify Data in Tables

After running the seed script, verify the data was inserted:

1. Go to **Table Editor** in Supabase sidebar
2. Click on each table to view data:
   - `homepage` - Should have 1 row
   - `about` - Should have 1 row
   - `admissions` - Should have 1 row
   - `childrens_home` - Should have 1 row
   - `contact` - Should have 1 row
   - `get_involved` - Should have 1 row
   - `gallery_categories` - Should have 5 rows
   - `gallery_images` - Should have 3 sample images
   - `news` - Should have 2 sample articles
   - `settings` - Should have 6 key-value pairs

### 3. Test Your Admin Editors

Now that data is populated, test each editor page:

1. Login to admin: https://tumaini-home-iota.vercel.app/admin/login.html
   - Email: `tumainicomprehensive@gmail.com`
   - Password: `TumainiAdmin2024!`

2. Click on each page in the sidebar and verify:
   - ✅ **Homepage** - Should load existing hero text, stats, etc.
   - ✅ **About Us** - Should load mission, vision, timeline, leadership
   - ✅ **Admissions** - Should load process, fees, FAQs
   - ✅ **Children's Home** - Should load care sections, sponsorship tiers
   - ✅ **News** - Should show 2 sample articles
   - ✅ **Gallery** - Should show 3 sample images in 5 categories
   - ✅ **Contact** - Should load phone, email, address, hours
   - ✅ **Get Involved** - Should load donation, volunteer, partnership info
   - ✅ **Settings** - Should show 6 site-wide settings

### 4. Edit and Save Content

Try editing content in each page:

1. Make changes to any field
2. Click **Save** button
3. Check for success message
4. Refresh the page to verify changes were saved

### 5. Check Public Site

Visit the public website to see your content:

- Homepage: https://tumaini-home-iota.vercel.app/
- About: https://tumaini-home-iota.vercel.app/about.html
- Admissions: https://tumaini-home-iota.vercel.app/admissions.html
- Children's Home: https://tumaini-home-iota.vercel.app/children-home.html

## What's Included in Seed Data

### Default Content:
- **Homepage**: Hero section with school name, description, call-to-action buttons
- **About**: Mission, vision, values, and brief history
- **Admissions**: Application process, requirements, sample fee structure
- **Children's Home**: Residential care description, safeguarding policies, sponsorship tiers
- **Contact**: Phone, email, address, office hours (UPDATE THESE WITH YOUR REAL INFO!)
- **Get Involved**: Donation, volunteer, and partnership information
- **News**: 2 sample news articles to demonstrate the news system
- **Gallery**: 5 categories and 3 sample images
- **Settings**: 6 site-wide configuration values

### What You Need to Update:

After populating the database, **you should immediately update**:

1. **Contact Information** - Replace placeholder phone/email with real contact details
2. **Gallery Images** - Upload real photos of your school through the Gallery editor
3. **News Articles** - Delete sample articles and add real school news
4. **Homepage Images** - Upload actual photos of your campus
5. **Leadership Section** in About page - Add real staff photos and bios
6. **Fee Structure** in Admissions - Update with current year's actual fees

## Image Upload System

The seed data references images in `assets/images/` folder. To add new images:

### Method 1: Through CMS (Recommended)
1. Go to any editor page (e.g., Homepage)
2. Find an image upload field
3. Click "Choose File" and select image
4. CMS will upload to Supabase Storage automatically
5. Image URL will be saved in the database

### Method 2: Direct Upload to Supabase Storage
1. In Supabase Dashboard, go to **Storage**
2. Create bucket named `tumaini-images` (if not exists)
3. Make bucket **public**
4. Upload images manually
5. Copy image URL and paste in editor fields

## Troubleshooting

### "Failed to load data" Error
- **Cause**: Table is empty or API endpoint not working
- **Solution**: Run the seed data script above

### Images Not Showing on Public Site
- **Cause**: Image paths in database don't match actual file locations
- **Solution**: 
  1. Check if images exist in `public/assets/images/` folder
  2. Or upload new images through CMS and save
  3. Or update image paths in database to match existing files

### "Unauthorized" Error When Saving
- **Cause**: Supabase session expired
- **Solution**: Logout and login again

### Changes Not Showing on Public Site
- **Cause**: Public HTML files need to fetch data from API
- **Solution**: Ensure public pages are using API to load content (not hardcoded)

## Next Steps

1. ✅ Run `supabase-seed-data.sql` to populate database
2. ✅ Login to admin and verify all pages load data
3. ✅ Update Contact page with real phone/email/address
4. ✅ Upload real school photos through Gallery editor
5. ✅ Update homepage with your actual school images
6. ✅ Add real news articles and delete samples
7. ✅ Update About page with real leadership team photos/bios
8. ✅ Set current term fee structure in Admissions page
9. ⏭️ Configure Supabase email templates for password reset (see SUPABASE_EMAIL_CONFIGURATION.md)
10. ⏭️ Test entire flow: login → edit → save → view on public site

## Need Help?

If you encounter any issues:

1. Check browser console (F12) for error messages
2. Check Supabase logs in dashboard under **Logs** section
3. Verify your Supabase anon key is correct in `auth-helper.js`
4. Ensure all API endpoints are deployed on Vercel
5. Check that RLS policies allow authenticated users to update content

---

**Ready?** Open Supabase SQL Editor and run `supabase-seed-data.sql` now! 🚀
