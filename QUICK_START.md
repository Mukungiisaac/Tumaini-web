# Quick Start Guide - Tumaini CMS

## 🚀 Get Started in 3 Minutes

### Step 1: Install & Start Backend

```bash
cd backend
npm install
npm start
```

You should see:
```
🚀 Tumaini CMS Backend running on port 3001
✅ Database initialized successfully
✅ Default admin user created
```

### Step 2: Open Admin Login

Using **Command Line** (one of these):
```bash
# Option A: Using Node's built-in server
npx http-server

# Option B: Using Python
python -m http.server

# Option C: Using PHP
php -S localhost:8000
```

Then open browser and go to:
```
http://localhost:8000/admin/login.html
```

OR simply open the file directly in your browser:
```
file:///c:/Users/iTech%20Studio/Desktop/iServe/Tumaini/Tumaini-web/admin/login.html
```

### Step 3: Login

**Email:** `admin@tumaini.school`
**Password:** `Admin123!`

Done! ✅ You're now in the CMS dashboard.

---

## 📋 What's Working

✅ Admin Login System  
✅ Dashboard Overview  
✅ Database Setup  
✅ API Routes (all created)  
✅ JWT Authentication  
✅ Protected Routes  

## 🔧 Backend API Endpoints

All endpoints are at: `http://localhost:3001/api/`

**Public (no auth needed):**
- `GET /homepage`
- `GET /about`
- `GET /admissions`
- `GET /children-home`
- `GET /news` - Get all published news
- `GET /news/:slug` - Get single article
- `GET /gallery`
- `GET /contact`
- `GET /get-involved`

**Admin Only (needs auth token):**
- `POST /news` - Create article
- `PUT /news/:id` - Update article
- `DELETE /news/:id` - Delete article
- Similar pattern for other sections

**Health Check:**
```bash
curl http://localhost:3001/api/health
```

---

## 📁 Project Structure

```
Tumaini-web/
├── public/              ← Existing website (UNCHANGED)
├── backend/             ← Backend API server (NEW)
│   ├── server.js
│   ├── routes/
│   ├── middleware/
│   └── database/
├── admin/               ← Admin dashboard (NEW)
│   ├── login.html
│   └── dashboard.html
└── database/            ← SQLite database (AUTO-CREATED)
    └── tumaini.db
```

---

## ⚠️ Important Notes

1. **Public Website is SAFE**
   - Nothing has changed on the public site
   - All visitors see the same content
   - Content will gradually be managed via CMS

2. **Default Password**
   - Change `Admin123!` immediately in production
   - Go to Settings → Change Password (coming soon)

3. **Backend Must Be Running**
   - Admin pages won't work if backend server isn't running
   - Keep backend terminal open

4. **Database**
   - Auto-created in `database/tumaini.db`
   - No manual setup needed
   - Delete it if you want to reset everything

---

## 🐛 Troubleshooting

**Backend won't start:**
```bash
# Check if Node.js is installed
node --version

# Try installing again
npm install

# Check if port 3001 is available
# (close any other app using port 3001)
```

**Login page shows but won't connect:**
- Make sure backend is running
- Check backend console for errors
- Try refreshing the page

**Forgot password?**
- Database is in `database/tumaini.db`
- Delete it and restart backend to reset everything
- You'll get the default admin user again

---

## 📱 What Comes Next

- [Phase 2] Content editors (Homepage, About, etc.)
- [Phase 3] News & Gallery management
- [Phase 4] Connect public site to CMS
- [Phase 5] Full deployment

---

## 💡 Pro Tips

**For Mac/Linux users:**
```bash
# Install and start backend in background
cd backend && npm install && npm start &

# Then in another terminal:
cd admin && python -m http.server 8000
```

**For Windows users:**
```bash
# Terminal 1: Start backend
cd backend
npm install
npm start

# Terminal 2: Start HTTP server
cd admin
python -m http.server 8000
# Or use: php -S localhost:8000
```

---

## 📞 Need Help?

Check these files for detailed info:
- `backend/README.md` - Backend setup & API details
- `admin/README.md` - Admin dashboard guide
- `CMS_IMPLEMENTATION_SUMMARY.md` - Full system overview

---

**You're all set! 🎉**

Next: Create your first news article in the News section!
