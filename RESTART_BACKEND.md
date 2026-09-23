# How to Restart Backend Server

## The Issue
When you add new routes or make changes to the backend code, you need to restart the server for changes to take effect.

## Quick Fix

### Option 1: Stop and Restart (Recommended)

1. **Stop the backend:**
   - Go to the terminal where backend is running
   - Press `Ctrl + C` to stop the server

2. **Start the backend again:**
   ```powershell
   cd backend
   npm start
   ```

3. **Verify it's working:**
   - You should see: `🚀 Tumaini CMS Backend running on port 3001`
   - Check for any error messages

### Option 2: Use nodemon (Auto-restart on changes)

If you want the server to restart automatically when you make changes:

1. **Install nodemon (one time only):**
   ```powershell
   cd backend
   npm install --save-dev nodemon
   ```

2. **Update package.json:**
   Add this to the "scripts" section:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

3. **Start with nodemon:**
   ```powershell
   npm run dev
   ```

Now the server will restart automatically whenever you save changes!

---

## After Restarting, Test Upload Feature

1. **Test the endpoint:**
   - Open browser console (F12)
   - Run: `fetch('http://localhost:3001/api/upload').then(r => console.log(r.status))`
   - Should return: `401` (Unauthorized - this is correct, means endpoint exists)

2. **Try uploading an image:**
   - Go to admin homepage editor
   - Click on Holistic Approach or Testimonial tab
   - Click "Upload Image" button
   - Select an image
   - Should upload successfully!

---

## Common Issues After Restart

### Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::3001`

**Solution:**
1. Find and kill the process using port 3001:
   ```powershell
   # Find process on port 3001
   netstat -ano | findstr :3001
   
   # Kill the process (replace <PID> with actual process ID)
   taskkill /PID <PID> /F
   ```

2. Then start backend again:
   ```powershell
   npm start
   ```

### Module Not Found
**Error:** `Error: Cannot find module './routes/upload'`

**Solution:**
- Verify `backend/routes/upload.js` file exists
- Check file name is exactly `upload.js` (not `Upload.js`)
- Run `npm install` to ensure all dependencies are installed

### Permission Error
**Error:** `EACCES: permission denied`

**Solution:**
- Run terminal as Administrator
- Or check folder permissions

---

## Verification Checklist

After restarting backend, verify:

- [ ] Terminal shows: "🚀 Tumaini CMS Backend running on port 3001"
- [ ] No error messages in terminal
- [ ] Can access: http://localhost:3001/api/health
- [ ] Upload endpoint returns 401 (not 404)
- [ ] Can upload images from admin panel

---

## Next Steps

Once backend is restarted:

1. Open admin homepage editor
2. Go to "Holistic Approach" or "Testimonial" tab
3. Click "Upload Image" button
4. Select image from your computer
5. Image should upload and preview should appear!

If you still get "not found" error, check browser console (F12) for the exact error message and share it with me.
