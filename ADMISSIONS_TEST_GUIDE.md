# Admissions CMS - Quick Test Guide

## 🚀 Quick Start Testing

Follow these steps to test your new Admissions CMS:

---

## Step 1: Access the Admin Interface

1. Open your browser and navigate to:
   ```
   http://192.168.0.110:8080/admin/login.html
   ```

2. Login with your admin credentials

3. From the dashboard, click on **"Admissions"** in the pages list, or navigate directly to:
   ```
   http://192.168.0.110:8080/admin/pages/admissions.html
   ```

---

## Step 2: Test Each Tab

### Hero Tab
- ✏️ Change the badge text (default: "Admissions 2024/2025")
- ✏️ Update the main heading lines
- ✏️ Modify the description paragraph
- ✏️ Change button text
- 📸 Upload a new hero image (optional)
- 💾 Changes auto-save on blur, or click "Save All Changes"

### Process Tab
- ✏️ Update "Simple 4-Step Process" title
- ✏️ Modify the section description
- ✏️ Edit all 4 step cards (titles and descriptions)
- 💾 Auto-saves on blur

### Fees Tab
- ✏️ Change fee section title and description
- ✏️ Update fee table rows (5 rows total):
  - Level names (e.g., "Early Years")
  - Enrollment fees
  - Termly tuition fees
- ✏️ Modify the table note at the bottom
- 💾 Auto-saves on blur

### FAQ Tab
- ✏️ Edit FAQ section title and description
- ✏️ Update all 5 FAQ items:
  - Question text
  - Answer text
- 💾 Auto-saves on blur

### CTA Tab
- ✏️ Change inquiry form title
- ✏️ Update form description text
- 💾 Auto-saves on blur

---

## Step 3: Verify Changes on Public Page

1. Open a **new browser tab** (or window)

2. Navigate to the public Admissions page:
   ```
   http://192.168.0.110:8080/admissions.html
   ```

3. **Refresh the page** (Ctrl+R or Cmd+R) to see your changes

4. Verify all sections show your updated content:
   - ✅ Hero section (top banner)
   - ✅ Process steps (4 cards)
   - ✅ Fee schedule table
   - ✅ FAQ accordion items
   - ✅ Inquiry form section

---

## Step 4: Check Browser Console

1. Open **Browser Developer Tools**:
   - Windows: `F12` or `Ctrl+Shift+I`
   - Mac: `Cmd+Option+I`

2. Go to the **Console** tab

3. Look for success message:
   ```
   ✅ Admissions CMS content loaded successfully
   ```

4. Check for any errors (there should be none)

---

## 🎯 What to Test

### ✅ Admin Interface
- [ ] All 5 tabs switch correctly
- [ ] Form fields accept input
- [ ] Auto-save works (check for green toast notification)
- [ ] "Save All Changes" button works
- [ ] Image upload shows preview
- [ ] No console errors
- [ ] Back to Dashboard link works

### ✅ Public Page
- [ ] Hero section displays updated text
- [ ] Hero image changes (if uploaded)
- [ ] All 4 process steps show custom content
- [ ] Fee table shows updated values
- [ ] All 5 FAQs display correct Q&A
- [ ] CTA section shows updated text
- [ ] No console errors

### ✅ API Integration
- [ ] Changes save to database
- [ ] Public page fetches from API
- [ ] Data persists after page refresh
- [ ] Multiple admin users see same data

---

## 🔍 Quick Verification Commands

### Check if backend is running:
```bash
# Windows PowerShell
Test-NetConnection -ComputerName 192.168.0.110 -Port 3001
```

### Test API endpoint manually:
Open in browser:
```
http://192.168.0.110:3001/api/admissions
```
Should return JSON with all 51 fields.

---

## ❌ Common Issues & Solutions

### Issue: Changes don't appear on public page

**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check browser console for errors
4. Verify backend is running

### Issue: "Failed to save" error in admin

**Solution:**
1. Check you're logged in (refresh login if needed)
2. Verify backend server is running
3. Check Network tab in DevTools for failed requests
4. Ensure authToken exists in localStorage

### Issue: Images don't upload

**Solution:**
1. Check file size (must be < 5MB)
2. Verify file type is supported (jpg, png, gif, webp)
3. Check backend console for errors
4. Ensure uploads folder exists and is writable

---

## 📊 Expected Results

After successful testing, you should be able to:

✅ Edit any content field from the admin interface
✅ See changes immediately after saving
✅ View updated content on the public page
✅ Upload and display custom images
✅ Have all changes persist after refresh
✅ Work across multiple browser sessions

---

## 🎉 Success!

If all tests pass, your Admissions CMS is working perfectly!

**Next Steps:**
- Customize content for your needs
- Add more FAQs if needed
- Update fee schedule for new academic year
- Upload a high-quality hero image

---

## 📞 Need Help?

Refer to `ADMISSIONS_CMS_COMPLETE.md` for:
- Complete field mapping
- Detailed troubleshooting
- API documentation
- Advanced features

---

**Last Updated:** 2026-09-22
**Status:** ✅ Ready for Testing
