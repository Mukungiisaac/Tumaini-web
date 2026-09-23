# 🔧 Troubleshooting Fetch Errors

## Problem: "Failed to fetch" Error

This happens when the frontend cannot connect to the backend API.

---

## ✅ Solution Steps (In Order)

### Step 1: Restart Backend Server

The CORS configuration was just updated, so you need to restart:

```bash
# Go to backend terminal and press Ctrl+C to stop
# Then restart:
cd "c:\Users\iTech Studio\Desktop\iServe\Tumaini\Tumaini-web\backend"
npm start
```

**Wait for:**
```
🚀 Tumaini CMS Backend running on port 3001
✅ Database initialized successfully
```

---

### Step 2: Verify Backend is Responding

Open a new browser tab and visit:
```
http://localhost:3001/api/health
```

**Should show:**
```json
{"status":"API is running","timestamp":"..."}
```

✅ If you see this, backend is working!
❌ If not, backend isn't running - go back to Step 1

---

### Step 3: Check How You're Accessing Frontend

**❌ WRONG WAY (Will cause CORS issues):**
```
file:///c:/Users/iTech%20Studio/Desktop/iServe/Tumaini/Tumaini-web/admin/login.html
```

**✅ CORRECT WAY (Through web server):**
```
http://localhost:8080/admin/login.html
```

**To fix:**
Open a new terminal and run:
```bash
cd "c:\Users\iTech Studio\Desktop\iServe\Tumaini\Tumaini-web"
npx http-server -p 8080
```

Then access through: `http://localhost:8080/admin/login.html`

---

### Step 4: Clear Browser Cache

1. Open browser Developer Tools (F12)
2. Go to **Application** or **Storage** tab
3. Click "Clear storage" or "Clear site data"
4. Refresh page (Ctrl+F5)

---

### Step 5: Test Login Again

1. Go to: `http://localhost:8080/admin/login.html`
2. Open Developer Tools (F12) → Console tab
3. Enter credentials:
   - Email: `admin@tumaini.school`
   - Password: `Admin123!`
4. Click "Sign In"
5. Watch the Console tab for messages

**You should see:**
```
Attempting login to: http://localhost:3001/api/auth/login
Response status: 200
Response data: {success: true, token: "...", user: {...}}
```

---

## 🔍 Still Not Working? Advanced Debugging

### Check Backend Logs

Look at your backend terminal. When you try to login, you should see:
```
POST /api/auth/login 200
```

If you see nothing, the request isn't reaching the backend.

### Check Browser Console

Press F12 → Console tab

**Look for errors like:**

1. **"Failed to fetch"**
   - Backend not running
   - Wrong URL
   - CORS issue

2. **"NetworkError"**
   - Backend not accessible
   - Port blocked by firewall
   - Wrong port number

3. **"CORS policy"**
   - Old backend still running (restart it)
   - Accessing via file:// instead of http://

### Test with curl

Open PowerShell and test:
```bash
curl -X POST http://localhost:3001/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@tumaini.school\",\"password\":\"Admin123!\"}'
```

**Should return:**
```json
{"success":true,"token":"...","user":{...}}
```

---

## 📋 Checklist

Before trying to login, verify:

- [ ] Backend terminal is running (shows "port 3001")
- [ ] Frontend terminal is running (shows "http://127.0.0.1:8080")
- [ ] Accessing via `http://localhost:8080/...` NOT `file://`
- [ ] Backend was restarted after CORS fix
- [ ] Browser cache was cleared
- [ ] No firewall blocking port 3001 or 8080
- [ ] No other app using port 3001
- [ ] `http://localhost:3001/api/health` returns JSON

---

## 🎯 Quick Fix Commands

**Restart Everything:**

```bash
# Terminal 1: Stop backend (Ctrl+C), then:
cd "c:\Users\iTech Studio\Desktop\iServe\Tumaini\Tumaini-web\backend"
npm start

# Terminal 2: Stop frontend (Ctrl+C), then:
cd "c:\Users\iTech Studio\Desktop\iServe\Tumaini\Tumaini-web"
npx http-server -p 8080

# Browser:
# 1. Clear cache (Ctrl+Shift+Delete)
# 2. Go to http://localhost:8080/admin/login.html
# 3. Open DevTools (F12)
# 4. Try login
```

---

## 🔥 Nuclear Option (If Nothing Works)

### Complete Reset:

```bash
# 1. Stop both terminals (Ctrl+C in each)

# 2. Delete database
cd "c:\Users\iTech Studio\Desktop\iServe\Tumaini\Tumaini-web"
del database\tumaini.db

# 3. Reinstall backend
cd backend
del -r node_modules
npm install

# 4. Start backend
npm start

# 5. In new terminal, start frontend
cd ..
npx http-server -p 8080

# 6. Clear ALL browser data
# - Press Ctrl+Shift+Delete
# - Select "All time"
# - Check all boxes
# - Clear data

# 7. Go to http://localhost:8080/admin/login.html
```

---

## 💡 Common Mistakes

### Mistake 1: Opening file:// directly
**Wrong:** Double-clicking `login.html`
**Right:** Using `http://localhost:8080/admin/login.html`

### Mistake 2: Backend not restarted
**Wrong:** Making code changes without restarting
**Right:** Ctrl+C then `npm start` after any backend changes

### Mistake 3: Wrong port
**Wrong:** `http://localhost:3001/admin/login.html`
**Right:** `http://localhost:8080/admin/login.html`

### Mistake 4: Firewall blocking
**Check:** Windows Firewall might block Node.js
**Fix:** Allow Node.js through firewall

---

## 📊 Port Usage Reference

| Port | Service | URL |
|------|---------|-----|
| 3001 | Backend API | `http://localhost:3001/api/*` |
| 8080 | Frontend (Admin + Public) | `http://localhost:8080/*` |

---

## 🆘 Emergency Contact

If still not working after all steps:

1. Take screenshot of:
   - Backend terminal
   - Frontend terminal
   - Browser console (F12)
   - Browser Network tab (F12)

2. Check:
   - `http://localhost:3001/api/health` - shows JSON?
   - Backend terminal - shows "running on port 3001"?
   - Frontend terminal - shows "Available on: ..."?
   - Browser URL - starts with `http://` not `file://`?

3. Review:
   - QUICK_START.md
   - SETUP_CHECKLIST.md
   - This file

---

## ✅ Success Indicators

You'll know it's working when:

1. **Backend Terminal:**
   ```
   🚀 Tumaini CMS Backend running on port 3001
   POST /api/auth/login 200
   ```

2. **Browser Console (F12):**
   ```
   Attempting login to: http://localhost:3001/api/auth/login
   Response status: 200
   Response data: {success: true, ...}
   ```

3. **Browser:**
   - Login form submits
   - Redirects to dashboard
   - No error messages

---

**Still stuck? Check your setup with SETUP_CHECKLIST.md**
