# Tumaini CMS - Setup Checklist

## Pre-Installation ✓

- [ ] Node.js installed (v14+)
  ```bash
  node --version  # Should show v14+
  ```

- [ ] npm installed
  ```bash
  npm --version   # Should show v6+
  ```

- [ ] Git repository initialized
  ```bash
  git status
  ```

- [ ] Read QUICK_START.md

---

## Installation Steps

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

**Expected output:**
```
added 157 packages in X.XXs
```

**Issues?**
- [ ] Try: `npm install --legacy-peer-deps`
- [ ] Delete `node_modules` folder and try again
- [ ] Check Node.js version

### Step 2: Create Environment File
```bash
cp backend/.env.example backend/.env
```

**Check file exists:**
```bash
cat backend/.env  # Should show config
```

### Step 3: Verify Installation
```bash
npm --version      # Check npm version
node --version     # Check Node.js version
ls -la backend/    # List backend files
```

**All required files present?**
- [ ] server.js
- [ ] package.json
- [ ] .env (created from .env.example)
- [ ] database/ folder
- [ ] routes/ folder
- [ ] middleware/ folder

---

## Backend Startup

### Step 1: Start Backend Server
```bash
cd backend
npm start
```

**Expected output:**
```
🚀 Tumaini CMS Backend running on port 3001
✅ Database initialized successfully
✅ Default admin user created
```

**Not working?**
- [ ] Check port 3001 is available
  ```bash
  # Windows
  netstat -ano | findstr :3001
  
  # Mac/Linux
  lsof -i :3001
  ```
- [ ] Kill process using port 3001
- [ ] Try different port in .env
- [ ] Check logs for errors

### Step 2: Test Backend Health
```bash
# In another terminal:
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{"status":"API is running","timestamp":"..."}
```

**Getting connection refused?**
- [ ] Ensure backend terminal is still running
- [ ] Check port 3001 in .env
- [ ] Look for errors in backend terminal

### Step 3: Test Database
```bash
# Check database file exists
ls -la database/tumaini.db
```

**File should exist (size > 0 bytes)**
- [ ] If not, check backend console for DB errors
- [ ] Restart backend to trigger DB init

### Step 4: Keep Backend Running
**Leave this terminal open** - keep backend running while developing

---

## Admin Dashboard Access

### Step 1: Start HTTP Server (new terminal)

**Option A: Node.js http-server**
```bash
cd Tumaini-web  # Root directory
npx http-server
```

**Option B: Python**
```bash
cd Tumaini-web
python -m http.server 8000
```

**Option C: PHP**
```bash
cd Tumaini-web
php -S localhost:8000
```

**Option D: Direct File**
```bash
Open: file:///c:/Users/iTech%20Studio/Desktop/iServe/Tumaini/Tumaini-web/admin/login.html
```

### Step 2: Open Browser
- [ ] If using HTTP server: `http://localhost:8000/admin/login.html`
- [ ] If using file: paste file path in address bar

### Step 3: Verify Page Loads
- [ ] Tumaini logo visible
- [ ] Login form appears
- [ ] Email field ready for input
- [ ] Password field ready for input

**Page not loading?**
- [ ] Check HTTP server is running
- [ ] Check port number (8000 or whatever you chose)
- [ ] Try in different browser
- [ ] Check browser console (F12) for errors

---

## Login Testing

### Step 1: Enter Credentials
- Email: `admin@tumaini.school`
- Password: `Admin123!`

### Step 2: Click Sign In
- [ ] Loading spinner appears
- [ ] Wait for 2-3 seconds
- [ ] Page redirects to dashboard

**Login failed?**
- [ ] Check backend is running (should see output in terminal)
- [ ] Verify credentials (copy-paste from QUICK_START.md)
- [ ] Check browser console (F12) for errors
- [ ] Ensure backend API is responding:
  ```bash
  curl http://localhost:3001/api/health
  ```

### Step 3: Verify Dashboard
- [ ] Dashboard page loads
- [ ] Sidebar visible with menu items
- [ ] User name displayed (Admin User)
- [ ] Stats cards show numbers
- [ ] Welcome message displays

**Dashboard not loading?**
- [ ] Check browser localStorage (F12 → Storage)
- [ ] Token should be stored
- [ ] Refresh page (F5)
- [ ] Clear cache and try again

---

## API Testing

### Test 1: Public Homepage Endpoint
```bash
curl http://localhost:3001/api/homepage
```

**Expected: JSON object with homepage data**
```json
{"hero_title":"...","stat_students":"450+",...}
```

### Test 2: Login Endpoint
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@tumaini.school\",\"password\":\"Admin123!\"}"
```

**Expected: JWT token in response**
```json
{"success":true,"token":"eyJhbG...","user":{...}}
```

### Test 3: Protected Endpoint (requires token)
```bash
# Replace TOKEN with actual token from Step 2
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3001/api/homepage
```

**Expected: Same as Test 1 (or error if token invalid)**

**API not responding?**
- [ ] Check backend is running
- [ ] Check port 3001 is correct
- [ ] Look for errors in backend terminal
- [ ] Restart backend server

---

## Public Website Check

### Step 1: Open Public Website
```
http://localhost:8000/index.html
```
(or your HTTP server's URL)

### Step 2: Verify It Still Works
- [ ] Homepage loads normally
- [ ] All navigation links work
- [ ] Images display
- [ ] Layout looks correct
- [ ] No broken elements

**Public site broken?**
- [ ] Ensure you haven't modified any files in `public/`
- [ ] Check all assets paths in browser console
- [ ] Verify images exist in `assets/images/`

---

## File Structure Verification

```bash
# From root directory, check all required files exist:

✅ Backend
- backend/server.js
- backend/package.json
- backend/.env (after creation)
- backend/database/init.js
- backend/routes/ (with 10 .js files)
- backend/middleware/auth.js

✅ Admin
- admin/login.html
- admin/dashboard.html
- admin/README.md

✅ Database (auto-created)
- database/tumaini.db (should exist after first backend run)

✅ Documentation
- QUICK_START.md
- CMS_IMPLEMENTATION_SUMMARY.md
- ARCHITECTURE.md
- FILES_CREATED.md
- SETUP_CHECKLIST.md (this file)

✅ Public Website (UNCHANGED)
- public/index.html
- public/about.html
- public/admissions.html
- public/etc...
- assets/css/
- assets/js/
- assets/images/
```

**Missing files?**
- [ ] Check they were created in correct directories
- [ ] Verify file paths are exactly as specified
- [ ] Re-read FILES_CREATED.md for complete list

---

## Troubleshooting Matrix

| Problem | Solution |
|---------|----------|
| "npm: command not found" | Install Node.js from nodejs.org |
| "port 3001 already in use" | Kill process using port 3001, or change port in .env |
| "Cannot find module 'express'" | Run `npm install` in backend folder |
| "Database initialization error" | Delete database/tumaini.db and restart backend |
| "Login fails" | Verify backend is running, check credentials |
| "Blank dashboard page" | Check browser console (F12) for JS errors, check token in localStorage |
| "Public website looks broken" | Ensure you haven't edited public HTML files, check assets path |
| "HTTP server won't start" | Try different port (python -m http.server 8001), check if port in use |
| "Can't connect to API" | Ensure backend running on 3001, check CORS, test with curl |
| "Images not loading" | Check assets/images/ folder exists, verify file names |

---

## Development Mode

### Keep Both Terminals Open

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
(Auto-reloads on file changes)

**Terminal 2 - HTTP Server:**
```bash
npx http-server
```

**Terminal 3 - Git (optional):**
```bash
git status
git add .
git commit -m "message"
```

---

## Database Reset (If Needed)

```bash
# Stop backend server (Ctrl+C)

# Delete database
rm database/tumaini.db

# Restart backend
cd backend
npm start

# Database recreates with default admin user
```

---

## Security Checklist

After setup, verify security:

- [ ] Backend is NOT publicly accessible
- [ ] Default admin password is known only to you
- [ ] JWT token is stored only in localStorage (not exposed)
- [ ] Admin routes require authentication
- [ ] Public routes don't expose draft content
- [ ] .env file has strong JWT_SECRET in production
- [ ] CORS is configured for known domains only
- [ ] No sensitive data in browser console errors

**Production security:**
- [ ] Change JWT_SECRET to random string
- [ ] Update default admin password
- [ ] Enable HTTPS only
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Set up monitoring/logging

---

## Performance Baseline

**Expected startup times:**

| Component | Time |
|-----------|------|
| npm install | 2-5 minutes (first time only) |
| Backend startup | 2-3 seconds |
| Database init | <1 second |
| Dashboard load | 1-2 seconds |
| API response | <100ms |

**If much slower:**
- [ ] Check system resources
- [ ] Ensure SSD (not external drive)
- [ ] Close other applications
- [ ] Check network connection

---

## Backup & Version Control

### Add to Git
```bash
# .gitignore should have:
node_modules/
.env
database/tumaini.db
uploads/
```

### First Commit
```bash
git add .
git commit -m "Initial CMS Phase 1 setup"
git push
```

### Database Backup
```bash
# Backup database before major changes
cp database/tumaini.db database/tumaini.db.backup
```

---

## Final Verification Checklist

Before proceeding to Phase 2:

- [ ] Backend running on port 3001
- [ ] Admin dashboard accessible and loads
- [ ] Can login with admin@tumaini.school / Admin123!
- [ ] Dashboard displays without errors
- [ ] Public website still works unchanged
- [ ] API endpoints respond to curl tests
- [ ] Database file exists and has data
- [ ] No errors in browser console (F12)
- [ ] No errors in backend terminal
- [ ] All required files in correct locations
- [ ] Documentation files readable

---

## Next Steps

✅ **If all checks pass:**
1. Read `CMS_IMPLEMENTATION_SUMMARY.md`
2. Familiarize yourself with architecture
3. Request Phase 2 content editors

📋 **Phase 2 will include:**
- Homepage editor page
- About page editor
- Admissions editor
- News article editor (with rich text)

---

## Support

**Getting stuck?**

1. Check QUICK_START.md (first!)
2. Review troubleshooting matrix above
3. Check browser console (F12)
4. Check backend terminal output
5. Review backend/README.md
6. Review admin/README.md
7. Contact development team

---

## Sign-Off

- [ ] I have completed all setup steps
- [ ] I have verified all checklist items
- [ ] Backend is running successfully
- [ ] Admin dashboard loads and authenticates
- [ ] Public website still works
- [ ] I am ready for Phase 2

**Setup completed on:** _______________ (date)

**Setup completed by:** _______________ (name)

---

**🎉 Congratulations! Your Tumaini CMS Phase 1 is ready!**

Keep backend running and proceed to Phase 2.
