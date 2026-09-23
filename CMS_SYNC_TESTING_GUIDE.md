# CMS Homepage Synchronization Testing Guide

## Problem Identified
The homepage public page was not displaying the same content as what was saved in the admin homepage editor.

## Root Causes Fixed
1. **Wrong CSS selector** - The badge selector was using `.bg-brand-gold.text-\\[12px\\]` which didn't match properly
2. **Incomplete logging** - No console feedback to debug what was being updated
3. **Malformed HTML** - CMS script was placed after `</html>` closing tag
4. **Missing button links** - Button URLs were not being updated

## Fixes Applied ✅

### 1. Corrected Badge Selector
**Before:** `.bg-brand-gold.text-\\[12px\\]`
**After:** `.bg-brand-gold.rounded-full`

### 2. Added Console Logging
The CMS script now logs all updates to the browser console so you can see exactly what's changing.

### 3. Fixed HTML Structure
Moved CMS script to proper position BEFORE `</html>` closing tag.

### 4. Added Button Link Updates
Now updates both button text AND href attributes.

---

## How to Test the Homepage CMS Integration

### Step 1: Start the Backend Server
```powershell
cd backend
npm start
```

You should see:
```
🚀 CMS Backend running on http://localhost:3001
```

### Step 2: Login to Admin Panel
1. Open browser: `admin/dashboard.html`
2. Login credentials:
   - Email: `admin@tumaini.school`
   - Password: `Admin123!`

### Step 3: Open Homepage Editor
1. Click "Homepage" in the left sidebar
2. You should see the homepage editor with these fields:
   - Badge Text
   - Hero Title
   - Hero Description
   - Primary Button Text & Link
   - Secondary Button Text & Link
   - Statistics (4 fields)

### Step 4: Change Some Content
Try changing these fields:

**Badge Text:**
- Current: `Excellence in Education & Care`
- Change to: `TEST: CMS Working!`

**Hero Title:**
- Current: `Nurturing Potential, Building Futures.`
- Change to: `Testing CMS Integration`

**Statistics:**
- Total Students: Change from `450+` to `500+`
- Pass Rate: Change from `98%` to `99%`
- Children in Residence: Change from `70+` to `100+`
- Awards: Change from `5+` to `10+`

**Primary Button:**
- Text: Change from `Apply Now` to `Join Us Today`
- Link: Keep as `/admissions.html`

### Step 5: Save Changes
1. Click "Save Changes" button at the top
2. You should see: ✓ Changes saved successfully!

### Step 6: View Public Homepage
1. Open `index.html` in your browser (or refresh if already open)
2. **Open Browser Console** (F12 > Console tab)
3. You should see these logs:

```
📥 CMS Data Received: {hero_badge: "TEST: CMS Working!", hero_title: "Testing CMS Integration", ...}
🏷️ Updating badge from "Excellence in Education & Care" to "TEST: CMS Working!"
📝 Updating title to: Testing CMS Integration
📝 Updating description
📊 Updating students stat to: 500+
📊 Updating pass rate to: 99%
📊 Updating children in residence to: 100+
📊 Updating awards to: 10+
✅ Homepage loaded from CMS successfully
```

### Step 7: Visual Verification
Check that the following elements on `index.html` match what you entered in the admin:

1. **Gold Badge** (top of hero section) - should say "TEST: CMS Working!"
2. **Main Title** (large white text) - should say "Testing CMS Integration"
3. **Description** (gray text below title) - should match what you entered
4. **Primary Button** (yellow/gold button) - should say "Join Us Today"
5. **Secondary Button** (white outline button) - should match what you entered
6. **Statistics Cards** (4 cards below hero):
   - First card: 500+
   - Second card: 99%
   - Third card: 100+
   - Fourth card: 10+

---

## What Each Field Controls

### Admin Editor → Public Page Mapping

| Admin Field | Public Page Element | Location |
|------------|---------------------|----------|
| **Badge Text** | Gold pill badge | Top of hero dark card |
| **Hero Title** | Main white heading | Large text on dark card |
| **Hero Description** | Gray paragraph | Below the title |
| **Primary Button Text** | Yellow/gold button | "Apply Now" → "Join Us Today" |
| **Primary Button Link** | Button href | Where button navigates |
| **Secondary Button Text** | White outline button | "Our Mission" button |
| **Secondary Button Link** | Button href | Where button navigates |
| **Total Students** | First stat card | "450+ Empowered Students" |
| **Pass Rate** | Second stat card | "98% Examination Pass Rate" |
| **Children in Residence** | Third stat card | "70+ Children in Residence" |
| **Co-curricular Awards** | Fourth stat card | "5+ Co-Curricular Awards" |

---

## Troubleshooting

### Problem: Changes don't appear on public page

**Solution 1: Check if backend is running**
```powershell
# In backend directory
npm start
```

**Solution 2: Hard refresh the browser**
- Chrome/Edge: `Ctrl + Shift + R`
- Firefox: `Ctrl + F5`

**Solution 3: Check browser console**
1. Press F12
2. Go to Console tab
3. Look for error messages
4. If you see "ℹ️ Using static content (CMS not available)" → Backend is not running

**Solution 4: Check database**
```powershell
# In backend directory, open Node.js REPL
node
```
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
db.get('SELECT * FROM homepage WHERE id = 1', (err, row) => {
  console.log(row);
});
```

### Problem: "Failed to save changes" in admin

**Solution 1: Check authentication**
- Logout and login again
- Check if authToken exists in localStorage (F12 > Application > Local Storage)

**Solution 2: Check backend logs**
Look in the terminal where you ran `npm start` for error messages

### Problem: Only some fields update, not all

**Solution:** Check the console logs to see which fields are being updated. The new logging will show exactly what's happening.

---

## Expected Behavior

### ✅ When Everything Works:
1. You save content in admin/pages/homepage.html
2. Content saves to database (success message appears)
3. You open or refresh index.html
4. CMS script fetches data from API
5. Console shows all updates being applied
6. Public page displays exactly what you entered in admin

### ❌ When Backend is Offline:
1. Public page uses hardcoded fallback content
2. Console shows: "ℹ️ Using static content (CMS not available)"
3. This is normal - the site still works with default content

---

## Default Fallback Content

If the backend is not running, the API returns these defaults:

```json
{
  "hero_badge": "Tumaini Comprehensive School",
  "hero_title": "Empowering Young Minds",
  "hero_description": "Education and residential care for vulnerable children",
  "hero_button_primary": "Learn More",
  "hero_button_primary_link": "/about",
  "hero_button_secondary": "Get Involved",
  "hero_button_secondary_link": "/get-involved",
  "stat_students": "450+",
  "stat_pass_rate": "98%",
  "stat_children_residence": "120+",
  "stat_awards": "15+"
}
```

---

## Quick Test Checklist

- [ ] Backend server is running on http://localhost:3001
- [ ] Can login to admin dashboard
- [ ] Can open homepage editor
- [ ] Can change badge text and save
- [ ] Badge updates on public homepage
- [ ] Can change hero title and save
- [ ] Title updates on public homepage
- [ ] Can change statistics and save
- [ ] Statistics update on public homepage
- [ ] Console shows update logs
- [ ] No errors in browser console
- [ ] No errors in backend terminal

---

## Files Modified

1. `index.html` - Fixed CMS script selector and HTML structure
2. `admin/pages/homepage.html` - Editor interface (no changes needed)
3. `backend/routes/homepage.js` - API endpoints (no changes needed)

---

## Need Help?

1. **Check browser console first** - Most issues show up here
2. **Check backend terminal** - API errors show up here
3. **Verify backend is running** - Try opening http://localhost:3001/api/homepage in browser
4. **Hard refresh the page** - Ctrl + Shift + R (Chrome/Edge)

---

## Success Criteria

✅ **Homepage CMS is working when:**
1. All 11 admin fields save successfully
2. All 11 public page elements update immediately
3. Console shows successful update logs
4. No errors in browser or backend console
5. Changes persist after page refresh
