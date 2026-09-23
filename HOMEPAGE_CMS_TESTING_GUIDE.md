# Homepage CMS - Complete Testing Guide

## Overview
This guide will help you test all 48+ editable fields across 6 sections of the homepage CMS.

---

## Pre-Testing Setup

### 1. Start the Backend Server
```powershell
cd backend
npm start
```

You should see:
```
🚀 Tumaini CMS Backend running on port 3001
```

### 2. Start the Web Server
In a new terminal:
```powershell
npx http-server -p 8080
```

You should see:
```
Starting up http-server, serving ./
Available on:
  http://10.136.135.211:8080
```

### 3. Login to Admin Panel
Open in browser: `http://10.136.135.211:8080/admin/dashboard.html`

**Credentials:**
- Email: `admin@tumaini.school`
- Password: `Admin123!`

---

## Testing Checklist

### ✅ Section 1: Hero & Statistics (16 fields)

**Navigate to:** Admin Dashboard → Homepage Editor → Hero & Stats Tab

**Test these fields:**

| Field | Test Value | Where to Check on Public Page |
|-------|-----------|-------------------------------|
| Hero Badge | "TEST: Quality Education" | Gold badge at top of hero card |
| Hero Title | "Building Tomorrow's Leaders" | Large white heading in hero |
| Hero Description | "Testing CMS integration for complete homepage control." | Gray text below title |
| Primary Button Text | "Join Us Today" | Yellow/gold button |
| Primary Button Link | "/admissions.html" | Click button to verify |
| Secondary Button Text | "Learn About Us" | White outline button |
| Secondary Button Link | "/about.html" | Click button to verify |
| Social Proof Text | "Join 500+ amazing students" | Small text at bottom of hero |
| Total Students | "500+" | First stat card number |
| Students Label | "Amazing Students" | First stat card label |
| Pass Rate | "99%" | Second stat card number |
| Pass Rate Label | "Success Rate" | Second stat card label |
| Children in Residence | "150+" | Third stat card number |
| Children Label | "Children Supported" | Third stat card label |
| Awards | "25+" | Fourth stat card number |
| Awards Label | "Achievement Awards" | Fourth stat card label |

**Steps:**
1. Fill in all fields with test values
2. Click "Save All Changes"
3. Wait for success message
4. Open public homepage: `http://10.136.135.211:8080/index.html`
5. Press F12 → Console tab
6. Verify console shows: "✅ All homepage sections loaded from CMS successfully!"
7. Visually verify each field updated correctly

---

### ✅ Section 2: Holistic Approach (11 fields)

**Navigate to:** Admin Dashboard → Homepage Editor → Holistic Approach Tab

**Test these fields:**

| Field | Test Value | Where to Check |
|-------|-----------|----------------|
| Section Badge | "Our Mission" | Small badge above section title |
| Section Title | "Excellence in Every Student" | Large section heading |
| Section Description | "We provide world-class education with compassionate care." | Paragraph below title |
| Feature 1 | "Award-winning curriculum" | First checkmark item |
| Feature 2 | "State-of-the-art facilities" | Second checkmark item |
| Feature 3 | "Experienced educators" | Third checkmark item |
| Feature 4 | "Co-curricular excellence" | Fourth checkmark item |
| Button Text | "Discover More" | Button at bottom of section |
| Button Link | "/about.html" | Button destination |
| Badge Top Text | "Excellence" | Floating badge on image (top text) |
| Badge Bottom Text | "Est. 2010" | Floating badge on image (bottom text) |

**Steps:**
1. Switch to "Holistic Approach" tab
2. Update all fields
3. Click "Save All Changes"
4. Refresh public homepage
5. Scroll to "Holistic Approach" section
6. Verify all changes appear correctly

---

### ✅ Section 3: Pillars of Excellence (8 fields)

**Navigate to:** Admin Dashboard → Homepage Editor → Pillars Tab

**Test these fields:**

| Field | Test Value | Where to Check |
|-------|-----------|----------------|
| Section Title | "Our Core Strengths" | Section heading in gray area |
| Section Subtitle | "Three pillars that define our approach to education." | Text below heading |
| Pillar 1 Title | "Academic Excellence" | First card title |
| Pillar 1 Description | "Rigorous curriculum preparing students for success." | First card description |
| Pillar 2 Title | "Safe Environment" | Second card title |
| Pillar 2 Description | "Nurturing home providing security and care." | Second card description |
| Pillar 3 Title | "Community Focus" | Third card title |
| Pillar 3 Description | "Building strong ties with local community." | Third card description |

**Steps:**
1. Switch to "Pillars" tab
2. Update all 8 fields
3. Save changes
4. Refresh public page
5. Scroll to gray "Pillars" section
6. Verify 3 cards show updated content

---

### ✅ Section 4: News Section Headers (3 fields)

**Navigate to:** Admin Dashboard → Homepage Editor → News Section Tab

**Test these fields:**

| Field | Test Value | Where to Check |
|-------|-----------|----------------|
| Section Title | "Recent Updates" | News section heading |
| Section Subtitle | "Stay connected with our latest news and events." | Text below heading |
| Button Text | "All Updates" | Button in top-right of section |

**Steps:**
1. Switch to "News Section" tab
2. Update the 3 header fields
3. Save changes
4. Refresh public page
5. Scroll to news section
6. Verify headers and button text updated

**Note:** The actual news cards are managed separately in the News admin page.

---

### ✅ Section 5: Testimonial (4 fields)

**Navigate to:** Admin Dashboard → Homepage Editor → Testimonial Tab

**Test these fields:**

| Field | Test Value | Where to Check |
|-------|-----------|----------------|
| Testimonial Quote | "Tumaini transformed my son's life. The care and education exceeded all expectations." | Large quote in dark banner |
| Author Name | "John Doe" | Name below quote |
| Author Title | "Parent, Class 7" | Small text below name |
| Author Image URL | "assets/images/testimonial-sarah.jpg" | Profile image (keep default) |

**Steps:**
1. Switch to "Testimonial" tab
2. Update quote, name, and title
3. Save changes
4. Refresh public page
5. Scroll to dark testimonial banner
6. Verify quote and author details updated

---

### ✅ Section 6: Bottom CTA (6 fields)

**Navigate to:** Admin Dashboard → Homepage Editor → Bottom CTA Tab

**Test these fields:**

| Field | Test Value | Where to Check |
|-------|-----------|----------------|
| CTA Title | "Join Our Community Today" | Large heading in gold banner |
| CTA Description | "Multiple ways to support and engage with Tumaini." | Text below heading |
| Button 1 Text | "Start Application" | First (yellow) button |
| Button 1 Link | "/admissions.html" | Button destination |
| Button 2 Text | "Contact Us" | Second (white outline) button |
| Button 2 Link | "/contact.html" | Button destination |

**Steps:**
1. Switch to "Bottom CTA" tab
2. Update all 6 fields
3. Save changes
4. Refresh public page
5. Scroll to bottom gold banner (above footer)
6. Verify all text and buttons updated

---

## Complete Test Scenario

### Quick Full Test (5 minutes)

1. **Open admin homepage editor**
2. **Make ONE visible change in each tab:**
   - Hero: Change badge to "TEST 1"
   - Holistic: Change title to "TEST 2"
   - Pillars: Change section title to "TEST 3"
   - News: Change section title to "TEST 4"
   - Testimonial: Change quote to "TEST 5"
   - CTA: Change title to "TEST 6"

3. **Click "Save All Changes"**

4. **Open public homepage in NEW incognito window**
   - URL: `http://10.136.135.211:8080/index.html`
   - Press F12 → Console

5. **Verify console logs:**
   ```
   📥 CMS Data Received: {…}
   🏷️ Updating hero badge
   📝 Updating hero title
   📊 Updated all statistics
   🎯 Updated holistic approach section
   🏛️ Updated pillars section
   📰 Updated news section headers
   💬 Updated testimonial section
   📢 Updated bottom CTA section
   ✅ All homepage sections loaded from CMS successfully!
   ```

6. **Scroll through entire page** and verify you see:
   - "TEST 1" in hero badge
   - "TEST 2" in holistic section
   - "TEST 3" in pillars heading
   - "TEST 4" in news heading
   - "TEST 5" in testimonial quote
   - "TEST 6" in bottom CTA

7. **If ALL 6 tests pass** → ✅ CMS is working perfectly!

---

## Troubleshooting

### Issue: Changes don't appear on public page

**Solution 1: Hard refresh**
- Press `Ctrl + Shift + R` (Chrome/Edge)
- Or `Ctrl + F5` (Firefox)

**Solution 2: Clear browser cache**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page

**Solution 3: Check backend is running**
```powershell
# Should show backend process running
curl http://localhost:3001/api/homepage
```

**Solution 4: Check console for errors**
- Open F12 → Console
- Look for red error messages
- Common issues:
  - "Failed to fetch" = Backend not running
  - "CORS error" = Backend CORS misconfigured
  - No logs at all = Script not loading

### Issue: Only some fields update

**Check browser console:**
- Each section should log its update
- Missing logs indicate selector issues

**Verify in Elements tab:**
- Press F12 → Elements
- Find the element that didn't update
- Check if selector in CMS script matches

### Issue: "Failed to save changes" in admin

**Check:**
1. You're logged in (check localStorage for authToken)
2. Backend is running on port 3001
3. No errors in backend terminal

---

## Success Criteria

### ✅ All Tests Pass When:

1. **Admin saves successfully** - Green success toast appears
2. **API returns all fields** - 52 fields in response
3. **Console shows all updates** - 8 success logs appear
4. **All 48 fields visible** - Every edited field shows on public page
5. **Changes persist** - Refresh doesn't revert content
6. **No console errors** - Clean browser console

---

## Post-Testing

### Revert Test Changes

After testing, restore original content:

1. Open admin homepage editor
2. Change all fields back to original values (see HOMEPAGE_CONTENT_MAP.md for defaults)
3. OR: Run this SQL to reset:

```sql
DELETE FROM homepage WHERE id = 1;
-- Restart backend to recreate with defaults
```

---

## Performance Check

### Expected Load Times

- **Admin editor load:** < 1 second
- **Public page CMS update:** < 500ms
- **Total page load:** < 3 seconds

### Console Performance

Check in F12 → Console:
```javascript
performance.measure('cms-load');
// Should be < 500ms
```

---

## Documentation References

- **Field Mapping:** See `HOMEPAGE_CONTENT_MAP.md`
- **API Reference:** See `PHASE_2_COMPLETE.md`
- **Architecture:** See `ARCHITECTURE.md`

---

## Final Verification

Run this checklist after testing:

- [ ] All 6 tabs in admin editor work
- [ ] All 48 fields can be edited
- [ ] Save button works
- [ ] Success toast appears
- [ ] All sections update on public page
- [ ] Console shows success logs
- [ ] No errors in browser console
- [ ] No errors in backend terminal
- [ ] Changes persist after refresh
- [ ] Original content can be restored

**If all checked** → 🎉 Homepage CMS is production-ready!
