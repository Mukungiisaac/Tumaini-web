# How to Get Your Supabase Anon Key

## ⚠️ The Error You're Seeing

**"Invalid API key"** means the Supabase anon key in the frontend code is incorrect or missing.

---

## 🔑 Get Your Real Supabase Keys

### Step 1: Go to Supabase Dashboard

1. Visit: **https://supabase.com/dashboard/project/sdqlyzfcffhmmwmxuhrc**
2. Login if needed

### Step 2: Get the Anon Key

1. Click **Settings** in the left sidebar (gear icon)
2. Click **API** in the settings menu
3. You'll see two keys:

#### Project API keys:

**anon public** (this is what you need!)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3...  (very long token)
```

**service_role secret** (you already have this)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3...  (different long token)
```

4. **Copy the `anon public` key** (click the copy icon)

---

## 📝 Update Your Code

### Option A: Quick Fix (For Testing Now)

Replace the key in **3 files**:

#### 1. `public/admin/login.html`

Find this line (~line 189):
```javascript
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

Replace with:
```javascript
const SUPABASE_ANON_KEY = 'eyJ...[paste your anon key here]...';
```

#### 2. `public/admin/reset-password.html`

Find and update the same line.

#### 3. `public/admin/js/auth-helper.js`

Find this line (~line 11):
```javascript
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

Replace with your actual key.

### Option B: Better Solution (Use Config File)

1. Create: `public/admin/js/supabase-config.js`

```javascript
const SUPABASE_CONFIG = {
  url: 'https://sdqlyzfcffhmmwmxuhrc.supabase.co',
  anonKey: 'eyJ...[your actual anon key]...'
};

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
```

2. Include in HTML files BEFORE other scripts:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="/admin/js/supabase-config.js"></script>
<script src="/admin/js/auth-helper.js"></script>
```

3. Update files to use `SUPABASE_CONFIG.anonKey`

---

## 🧪 Test After Updating

1. Save all files
2. Refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)
3. Try "Forgot Password?" again
4. You should see "Password reset instructions sent!" instead of "Invalid API key"

---

## ❓ What's the Difference?

### What You Have in .env:
```
SUPABASE_ANON_KEY=sb_publishable_2gpKLNQVSrmoWWfbXZHf_Q_QAz-CYVU
```
❌ This is NOT the correct format for the anon key

### What You Need (from Supabase Dashboard):
```
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkcWx5emZjZmZobW13bXh1aHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MTIzNzAsImV4cCI6MjA0ODk4ODM3MH0.xxx
```
✅ This is a JWT token - this is correct!

The anon key should be **very long** (200+ characters) and start with `eyJ`.

---

## 🔒 Security Note

The **anon** key is **safe** to use in frontend code - it's meant to be public. It's designed for client-side use.

The **service_role** key should NEVER be in frontend code - keep it only in backend/.env files.

---

## 📍 Quick Reference

| Key Type | Where to Use | Current Status |
|----------|--------------|----------------|
| **anon public** | Frontend (login.html, etc.) | ❌ Need to update |
| **service_role secret** | Backend (.env, Vercel) | ✅ Already set |

---

## 🎯 After You Update

1. Update the 3 files with your real anon key
2. Test login page - should work!
3. Test forgot password - should send email!
4. Commit changes to git
5. Push to deploy to Vercel

---

## 🆘 Still Not Working?

### Check:
1. You copied the **entire** anon key (it's very long!)
2. No extra spaces or quotes
3. You refreshed the browser (hard refresh)
4. Browser console shows no errors (F12)

### Verify Key is Correct:
The anon key should:
- Start with `eyJ`
- Be 200+ characters long
- Have dots (`.`) separating 3 parts
- End with random characters (not `...`)

If you're still stuck, screenshot the Supabase Dashboard API settings page (with keys blurred) and we can troubleshoot!
