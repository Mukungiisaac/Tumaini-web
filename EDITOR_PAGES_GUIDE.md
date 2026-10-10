# Editor Pages Guide - Supabase Auth Integration

## 🎯 Overview

All admin editor pages now use **Supabase Auth** for authentication. This guide explains how the system works and how to create new editor pages.

---

## 📁 File Structure

```
public/admin/
├── js/
│   ├── auth-helper.js       ← Core Supabase auth (handles login, tokens, API calls)
│   └── editor-init.js       ← Universal editor initialization (auto-handles auth)
├── pages/
│   ├── TEMPLATE-editor.html ← Use this to create new pages
│   ├── about.html           ← Fully migrated ✅
│   ├── homepage.html        ← Migrated ✅
│   ├── admissions.html      ← Migrated ✅
│   └── ... (all other pages) ← Migrated ✅
└── dashboard.html


---

## 🔧 How It Works

### 1. **Auth Helper** (`auth-helper.js`)
- Initializes Supabase client with your anon key
- Provides `Auth.apiRequest()` for authenticated API calls
- Provides `Auth.getAuthToken()` for file uploads
- Handles session management
- Redirects to login if not authenticated (except in iframes)

### 2. **Editor Init** (`editor-init.js`)
- Automatically checks authentication on page load
- Detects if running in iframe (dashboard) vs standalone
- Calls your page's `initEditorPage()` function after auth check
- Provides helper functions: `apiCall()` and `uploadFile()`

### 3. **Your Editor Page**
- Includes both scripts above
- Defines `window.initEditorPage()` function
- Uses `apiCall()` for API requests
- Uses `uploadFile()` for file uploads

---

## 🚀 Creating a New Editor Page

### Quick Start (Copy & Modify):

1. **Copy the template:**
   ```powershell
   Copy-Item public\admin\pages\TEMPLATE-editor.html public\admin\pages\my-page.html
   ```

2. **Update the page title and content**

3. **Modify the API endpoints** in `loadData()` and `saveData()`

4. **Test it!**

### Required Scripts (Always Include):

```html
<!-- At the bottom of your HTML, before </body> -->

<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Auth Helper (handles authentication) -->
<script src="/admin/js/auth-helper.js"></script>

<!-- Editor Init (automatic auth check) -->
<script src="/admin/js/editor-init.js"></script>

<!-- Your page script -->
<script>
  window.initEditorPage = function() {
    // Your initialization code here
    loadData();
  };
  
  async function loadData() {
    const response = await apiCall('/api/your-endpoint');
    const data = await response.json();
    // Populate form...
  }
  
  async function saveData() {
    const response = await apiCall('/api/your-endpoint', {
      method: 'PUT',
      body: JSON.stringify(formData)
    });
    // Handle response...
  }
</script>
```

---

## 📝 API Call Examples

### GET Request:
```javascript
async function loadData() {
  try {
    const response = await apiCall('/api/homepage');
    const data = await response.json();
    
    // Populate form fields
    document.getElementById('title').value = data.title || '';
    
  } catch (error) {
    console.error('Error loading:', error);
  }
}
```

### PUT/POST Request:
```javascript
async function saveData() {
  try {
    const formData = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value
    };
    
    const response = await apiCall('/api/homepage', {
      method: 'PUT',
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      alert('✓ Saved successfully!');
    }
    
  } catch (error) {
    console.error('Error saving:', error);
    alert('✗ Failed to save');
  }
}
```

### File Upload:
```javascript
async function handleImageUpload(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;
  
  // Validate file
  if (file.size > 5 * 1024 * 1024) {
    alert('File must be less than 5MB');
    return;
  }
  
  try {
    // Upload with authentication
    const result = await uploadFile(file);
    
    // Update form field with uploaded path
    document.getElementById('imageField').value = result.path;
    
    alert('✓ Image uploaded!');
    
  } catch (error) {
    console.error('Upload error:', error);
    alert('✗ Upload failed');
  }
}
```

---

## 🛠️ Common Patterns

### Pattern 1: Load on Init
```javascript
window.initEditorPage = function() {
  loadData();
  setupEventListeners();
};
```

### Pattern 2: Form Submission
```javascript
document.getElementById('myForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await saveData();
});
```

### Pattern 3: Tab Switching
```javascript
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
  });
  
  // Show selected tab
  document.getElementById(tabName + 'Tab').classList.remove('hidden');
}
```

### Pattern 4: Image Preview
```javascript
function showPreview(input, previewId) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById(previewId).src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
```

---

## ⚠️ Important Notes

### DO ✅
- Always include auth-helper.js and editor-init.js
- Use `apiCall()` for API requests
- Use `uploadFile()` for file uploads
- Define `window.initEditorPage()` for your init code
- Handle errors in try-catch blocks

### DON'T ❌
- Don't use `fetch()` directly for authenticated requests
- Don't check for `authToken` in localStorage (old system)
- Don't manually redirect to login page
- Don't use `Bearer ${authToken}` in headers (old system)
- Don't load data before auth check completes

---

## 🐛 Troubleshooting

### Issue: "No authentication token found"
**Cause:** Page is checking for old `authToken` in localStorage  
**Fix:** Remove old auth check, rely on editor-init.js

### Issue: API returns 401 Unauthorized
**Cause:** Not using `apiCall()` or `uploadFile()` helpers  
**Fix:** Replace `fetch()` with `apiCall()`

### Issue: Page redirects to login in iframe
**Cause:** Auth check not iframe-aware  
**Fix:** Use editor-init.js which handles iframes automatically

### Issue: Save button doesn't work
**Cause:** Not waiting for auth check to complete  
**Fix:** Move init code inside `window.initEditorPage()`

---

## 📋 Migration Checklist (For Existing Pages)

If you have an old editor page that needs migration:

- [ ] Include `<script src="/admin/js/editor-init.js"></script>`
- [ ] Remove `let authToken = null;` declaration
- [ ] Remove `authToken = localStorage.getItem('authToken');`
- [ ] Remove old auth check (`if (!authToken) { ... }`)
- [ ] Wrap init code in `window.initEditorPage = function() { ... }`
- [ ] Replace `fetch()` with `apiCall()` for API calls
- [ ] Replace manual auth headers with `uploadFile()` for uploads
- [ ] Test: Load page, verify no auth errors
- [ ] Test: Save data, verify it works
- [ ] Test: Upload image (if applicable)

---

## 🎓 Example: Complete Editor Page

See `public/admin/pages/TEMPLATE-editor.html` for a complete, working example with:
- Proper script inclusion
- Auth handling
- Data loading
- Form submission
- File upload
- Error handling

---

## 📚 Related Documentation

- **SUPABASE_EMAIL_CONFIGURATION.md** - Email setup for password reset
- **DEPLOYMENT_CHECKLIST.md** - Deployment and testing guide
- **auth-helper.js** - Core auth implementation
- **editor-init.js** - Universal editor initialization

---

## 🆘 Getting Help

**Common Issues:**
1. Check browser console for errors (F12)
2. Verify scripts are loaded (check Network tab)
3. Check Supabase session (localStorage → 'supabaseSession')
4. Verify API endpoint exists and returns data

**Still stuck?**
- Check that SUPABASE_ANON_KEY is set correctly in auth-helper.js
- Verify Vercel environment variables are set
- Check Vercel function logs for API errors

---

## ✅ All Migrated Pages

These pages are ready to use with Supabase Auth:

- ✅ about.html
- ✅ admissions.html
- ✅ children-home.html
- ✅ contact.html
- ✅ gallery.html
- ✅ get-involved.html
- ✅ homepage.html
- ✅ news.html
- ✅ settings.html

**Template for new pages:**
- ✅ TEMPLATE-editor.html

---

**Last Updated:** Today  
**Auth System:** Supabase Auth  
**Status:** ✅ Production Ready
