# Image Upload "Not Found" Error - Troubleshooting Guide

## Quick Fix (Most Common Issue)

### The Problem
The backend server doesn't have the new upload route loaded because it was started before the route was created.

### The Solution
**Restart the backend server:**

1. Go to the terminal running the backend
2. Press `Ctrl + C` to stop it
3. Start it again:
   ```powershell
   cd backend
   npm start
   ```
4. Wait for: `🚀 Tumaini CMS Backend running on port 3001`

**That's it!** Now try uploading again.

---

## Step-by-Step Verification

### Step 1: Check Backend is Running

```powershell
# In any terminal, run:
curl http://localhost:3001/api/health
```

**Expected result:** 
```json
{"status":"API is running","timestamp":"..."}
```

**If you get an error:** Backend is not running. Start it:
```powershell
cd backend
npm start
```

---

### Step 2: Check Upload Endpoint Exists

Open browser and go to:
```
http://localhost:3001/api/upload
```

**Expected result:** 
- Browser shows: `{"error":"Unauthorized"}` 
- This is GOOD! It means the endpoint exists

**If you get:**
- `Cannot GET /api/upload` or `Not Found` → Backend needs restart
- `ECONNREFUSED` → Backend not running

---

### Step 3: Test Upload with Test Page

1. **Open test page:**
   ```
   http://10.136.135.211:8080/test-upload.html
   ```

2. **Login:**
   - Email: `admin@tumaini.school`
   - Password: `Admin123!`
   - Click "Login"
   - Should show: "✅ Login successful!"

3. **Upload:**
   - Click "Choose File"
   - Select an image
   - Click "Upload"
   - Check the result box

**If upload works here but not in admin panel:**
- Clear browser cache: `Ctrl + Shift + Delete`
- Hard refresh admin page: `Ctrl + Shift + R`

---

## Common Error Messages

### Error: "404 Not Found"
**Meaning:** Upload endpoint doesn't exist  
**Fix:** Restart backend server

**Verification:**
```powershell
cd backend
# Check if upload.js exists
dir routes\upload.js
# Should show the file, if not found, file is missing
```

---

### Error: "401 Unauthorized"
**Meaning:** Not logged in or token expired  
**Fix:** 
1. Logout and login again
2. Check localStorage has authToken:
   - Press F12 → Application → Local Storage
   - Check for `authToken` key

---

### Error: "Only image files are allowed"
**Meaning:** File type not supported  
**Fix:** Use JPG, PNG, GIF, or WebP only

---

### Error: "Image size must be less than 5MB"
**Meaning:** File is too large  
**Fix:** Compress or resize the image

---

### Error: "ECONNREFUSED" or "Failed to fetch"
**Meaning:** Can't connect to backend  
**Fix:** 
1. Check backend is running on port 3001
2. Check no firewall blocking
3. Try: `http://localhost:3001/api/health` in browser

---

### Error: "EACCES: permission denied"
**Meaning:** No permission to write files  
**Fix:**
1. Check `assets/images/` folder exists
2. Check folder permissions (should be writable)
3. Run terminal as Administrator (Windows)

---

## Detailed Diagnostics

### Check 1: Upload Route File Exists
```powershell
cd backend
dir routes\upload.js
```
**Should show:** File size, date, `upload.js`

**If missing:** File wasn't created. Let me know and I'll recreate it.

---

### Check 2: Server.js Has Upload Routes
```powershell
cd backend
findstr "uploadRoutes" server.js
```
**Should show:**
```
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);
```

**If missing:** File needs to be updated.

---

### Check 3: Multer Package Installed
```powershell
cd backend
npm list multer
```
**Should show:** `multer@X.X.X`

**If not found:** Install it:
```powershell
npm install multer
```

---

### Check 4: Assets Folder Exists
```powershell
cd ..
dir assets\images
```
**Should show:** List of image files

**If folder doesn't exist:** Backend will create it automatically on first upload

---

## Browser Console Debugging

1. **Open admin homepage editor**
2. **Press F12** to open DevTools
3. **Go to Console tab**
4. **Try uploading an image**
5. **Check for error messages**

### Common Console Errors:

**"POST http://localhost:3001/api/upload 404 (Not Found)"**
→ Backend needs restart

**"POST http://localhost:3001/api/upload 401 (Unauthorized)"**
→ Not logged in or token expired

**"Failed to fetch"**
→ Backend not running

**"Network request failed"**
→ CORS issue or backend not accessible

---

## Network Tab Debugging

1. **Open admin homepage editor**
2. **Press F12 → Network tab**
3. **Click "Preserve log"**
4. **Try uploading**
5. **Find the `upload` request**
6. **Click on it**

### Check:
- **Status:** Should be `200 OK` (success) or `401` (not logged in)
- **Headers → Request URL:** Should be `http://localhost:3001/api/upload`
- **Payload:** Should show the image file
- **Response:** Shows error message if failed

---

## Complete Reset Procedure

If nothing works, try this complete reset:

### 1. Stop Everything
```powershell
# Stop backend (Ctrl+C in backend terminal)
# Stop http-server (Ctrl+C in that terminal)
```

### 2. Restart Backend
```powershell
cd backend
npm start
```
Wait for: `🚀 Tumaini CMS Backend running on port 3001`

### 3. Restart Web Server
```powershell
# In another terminal
npx http-server -p 8080
```

### 4. Clear Browser Cache
- Press `Ctrl + Shift + Delete`
- Select "Cached images and files"
- Click "Clear data"

### 5. Login Fresh
- Go to: `http://10.136.135.211:8080/admin/login.html`
- Login with: `admin@tumaini.school` / `Admin123!`

### 6. Try Upload Again
- Go to homepage editor
- Try uploading

---

## Still Not Working?

### Share These Details:

1. **Browser Console Output:**
   - F12 → Console
   - Screenshot or copy error messages

2. **Network Tab Info:**
   - F12 → Network
   - Find the `upload` request
   - Show Status, Response

3. **Backend Terminal Output:**
   - Copy last 20 lines from backend terminal
   - Any error messages?

4. **Test Page Result:**
   - Open `test-upload.html`
   - Try uploading there
   - Screenshot the result

---

## Prevention: Use Nodemon

To avoid restart issues in the future, use nodemon for auto-restart:

```powershell
cd backend
npm install --save-dev nodemon
```

Update `package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Then start with:
```powershell
npm run dev
```

Now backend restarts automatically when you change code!

---

## Summary Checklist

Before uploading, verify:

- [ ] Backend running: `http://localhost:3001/api/health` works
- [ ] Upload endpoint exists: `http://localhost:3001/api/upload` returns 401 (not 404)
- [ ] Logged into admin panel
- [ ] Browser console shows no errors
- [ ] File is an image (JPG, PNG, GIF, WebP)
- [ ] File size < 5MB

If all checked and still not working, use the test page (`test-upload.html`) to debug!
