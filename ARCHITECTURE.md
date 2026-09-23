# Tumaini CMS - System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                           │
│  (index.html, about.html, news.html, gallery.html, etc.)    │
│                                                              │
│  ✅ UNCHANGED & READ-ONLY                                   │
│  ✅ Same design, layout, functionality                      │
│  ✅ Will gradually pull content from CMS                    │
└─────────────────────────────────────────────────────────────┘
                            ↑ API Calls
                    http://localhost/
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
          ↓                                   ↓
    ┌──────────────┐            ┌─────────────────────┐
    │ Static Data  │            │  Dynamic Content    │
    │ (hardcoded)  │            │  (from CMS/API)     │
    └──────────────┘            └─────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                   ADMIN DASHBOARD                           │
│  (admin/login.html → admin/dashboard.html)                  │
│                                                              │
│  ✅ NEW - Secure & Protected                               │
│  ✅ Requires JWT authentication                            │
│  ✅ Full CRUD content management                           │
└─────────────────────────────────────────────────────────────┘
                            ↓ API Calls
              http://localhost:3001/api/*
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
          ↓                                   ↓
    ┌──────────────┐                ┌─────────────────────┐
    │ POST/PUT/DEL │                │ Requires JWT Token  │
    │ (Admin only) │                │ (Protected Routes)  │
    └──────────────┘                └─────────────────────┘
```

---

## Detailed Architecture

```
                        ┌─────────────────────────────┐
                        │   BROWSER / CLIENT          │
                        ├─────────────────────────────┤
                        │ Admin Dashboard Files:      │
                        │ - login.html                │
                        │ - dashboard.html            │
                        │ - (future pages)            │
                        └─────────────┬───────────────┘
                                      │
                     HTTP/JSON Requests│ Responses
                                      │
                ┌─────────────────────▼──────────────────────┐
                │      EXPRESS.JS WEB SERVER (PORT 3001)     │
                ├────────────────────────────────────────────┤
                │ Core Features:                             │
                │ - CORS enabled                             │
                │ - JSON middleware                          │
                │ - File upload handling                     │
                │ - Error handling                           │
                │ - Static file serving                      │
                └────────────┬─────────────────────┬─────────┘
                             │                     │
                    ┌────────▼────────┐   ┌──────▼─────────────┐
                    │  AUTHENTICATION │   │   API ROUTES       │
                    │  MIDDLEWARE     │   │                    │
                    ├─────────────────┤   ├────────────────────┤
                    │ - JWT Verify    │   │ /api/auth          │
                    │ - Token Decode  │   │ /api/homepage      │
                    │ - Role Check    │   │ /api/about         │
                    │ - Session Mgmt  │   │ /api/news          │
                    └────────┬────────┘   │ /api/gallery       │
                             │            │ /api/admissions    │
                             │            │ /api/children-home │
                             │            │ /api/get-involved  │
                             │            │ /api/contact       │
                             │            │ /api/settings      │
                             │            └────────┬───────────┘
                             │                     │
                      ┌──────▼──────────────────────▼────────┐
                      │       DATABASE LAYER                  │
                      ├────────────────────────────────────────┤
                      │ SQLite3 (tumaini.db)                   │
                      │                                        │
                      │ Tables:                                │
                      │ - users                                │
                      │ - homepage                             │
                      │ - about                                │
                      │ - admissions                           │
                      │ - children_home                        │
                      │ - news                                 │
                      │ - gallery_images                       │
                      │ - gallery_categories                   │
                      │ - get_involved                         │
                      │ - contact                              │
                      │ - settings                             │
                      └────────────────────────────────────────┘
```

---

## Request Flow - Admin Login

```
1. User opens /admin/login.html
   ↓
2. User enters email & password
   ↓
3. Form submits to POST /api/auth/login
   ↓
4. Backend validates credentials
   ├─ Checks if user exists in DB
   ├─ Compares password hash
   └─ Returns JWT token if valid
   ↓
5. Token stored in browser localStorage
   ↓
6. Redirect to /admin/dashboard.html
   ↓
7. Dashboard loads and displays
```

## Request Flow - Create News Article

```
1. Admin clicks "New Article" button
   ↓
2. Form appears with fields:
   - Title
   - Content (rich text)
   - Category
   - Status (draft/published)
   ↓
3. Admin fills and clicks "Create"
   ↓
4. Form submits to POST /api/news with:
   - Authorization: Bearer {JWT_TOKEN}
   - Body: { title, content, category, status }
   ↓
5. Backend verifies JWT token
   ↓
6. Backend checks admin role
   ↓
7. Backend validates input
   ↓
8. Backend creates record in news table
   ↓
9. Returns success response with article ID
   ↓
10. Admin sees success message
```

## Request Flow - Public Website Fetches Content

```
1. User visits public homepage (index.html)
   ↓
2. JavaScript runs and calls GET /api/homepage
   ↓
3. Backend checks database for homepage content
   ↓
4. Returns JSON with latest content
   ↓
5. JavaScript updates DOM with data
   ↓
6. User sees up-to-date content
   (same visual design, but data from CMS)
```

---

## Security Flow

```
┌─────────────────────────────────┐
│   Unprotected Public Routes     │
│   GET /api/news (published)     │
│   GET /api/gallery (published)  │
│   No token required             │
└─────────────────────────────────┘
         ↑ Anyone can access


┌─────────────────────────────────┐
│   Protected Admin Routes        │
│   POST /api/news                │
│   PUT /api/news/:id             │
│   DELETE /api/news/:id          │
└──────────────┬──────────────────┘
              │
         Requires:
         1. JWT Token in header
         2. Valid signature
         3. Not expired
         4. Admin role


┌─────────────────────────────────┐
│   If Auth Fails:                │
│   401 Unauthorized              │
│   403 Forbidden                 │
│   (Redirect to login)           │
└─────────────────────────────────┘
```

---

## File Upload Flow (Future)

```
Admin uploads image → 
  ↓
Multer middleware validates:
  ├─ File size (< 5MB)
  ├─ File type (image only)
  └─ MIME type check
  ↓
  ✅ Valid → Save to /uploads/
  ↓
  Store path in database
  ↓
  Return URL to client
  ↓
  Image appears in gallery
  ↓
  Public can download from /uploads/filename
```

---

## Database Schema Relationships

```
                        ┌─────────────┐
                        │   users     │
                        ├─────────────┤
                        │ id (PK)     │
                        │ email       │
                        │ username    │
                        │ password    │ (hashed)
                        │ role        │ (admin/editor)
                        └─────────────┘


┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  homepage    │   │    about     │   │ admissions   │
├──────────────┤   ├──────────────┤   ├──────────────┤
│ id (PK)      │   │ id (PK)      │   │ id (PK)      │
│ hero_image   │   │ history      │   │ description  │
│ hero_title   │   │ mission      │   │ requirements │
│ hero_desc    │   │ vision       │   │ classes      │
│ stat_*       │   │ core_values  │   │ is_published │
└──────────────┘   └──────────────┘   └──────────────┘


┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│    news      │   │  gallery_cat │   │  gallery_img │
├──────────────┤   ├──────────────┤   ├──────────────┤
│ id (PK)      │   │ id (PK)      │   │ id (PK)      │
│ title        │   │ name         │   │ title        │
│ slug         │   │ description  │   │ image_url    │
│ content      │   └──────────────┘   │ category_id  │ (FK)
│ status       │         ▲             │ is_published │
│ publication  │         │             └──────────────┘
│ date         │         │
└──────────────┘    (Many to One)


┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ get_involved │   │   contact    │   │  settings    │
├──────────────┤   ├──────────────┤   ├──────────────┤
│ id (PK)      │   │ id (PK)      │   │ id (PK)      │
│ donation_*   │   │ phone_*      │   │ setting_key  │
│ volunteer_*  │   │ email_*      │   │ setting_val  │
│ sponsor_*    │   │ address      │   └──────────────┘
│ support_ways │   │ maps_link    │
└──────────────┘   └──────────────┘
```

---

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────┐
│              PRODUCTION SERVER                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ Tumaini-web (Public Site)                     │ │
│  │ Served by nginx/Apache                        │ │
│  │ https://tumaini-website.com                   │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ Admin Dashboard (Protected)                   │ │
│  │ https://tumaini-website.com/admin             │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ Backend API Server (Node.js)                  │ │
│  │ https://api.tumaini-website.com               │ │
│  │ Port: 3001 (internal only)                    │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ SQLite / PostgreSQL Database                  │ │
│  │ /var/tumaini/database/                        │ │
│  │ Regular backups configured                    │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ Uploads Storage                               │ │
│  │ /var/tumaini/uploads/                         │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
         ↑
         │ HTTPS / SSL
         │
    Internet
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend (Public)** | HTML5 | Markup |
| | CSS3/Tailwind | Styling |
| | JavaScript (Vanilla) | Interactivity |
| **Frontend (Admin)** | HTML5 | Markup |
| | CSS3/Tailwind | Styling |
| | JavaScript (Vanilla) | Dashboard logic |
| **Backend** | Node.js | Runtime |
| | Express.js | Web framework |
| | JWT | Authentication |
| | bcryptjs | Password hashing |
| **Database** | SQLite3 | Data storage |
| **DevOps** | npm | Package management |
| | nodemon | Development auto-reload |

---

## Performance Considerations

```
┌─────────────────────────────────────────┐
│  Frontend Performance                   │
├─────────────────────────────────────────┤
│ - Static files cached by browser        │
│ - Tailwind CSS minified in production   │
│ - API calls minimal (single request)    │
│ - Lazy loading for images (future)      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Backend Performance                    │
├─────────────────────────────────────────┤
│ - Database indexed on common queries    │
│ - Pagination for large datasets         │
│ - Connection pooling (if needed)        │
│ - Response caching (future)             │
│ - Rate limiting (security)              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Database Performance                   │
├─────────────────────────────────────────┤
│ - SQLite for small/medium scale         │
│ - PostgreSQL for production at scale    │
│ - Regular backups automated             │
│ - Query optimization                    │
└─────────────────────────────────────────┘
```

---

## Scalability Path

```
Phase 1 (Current): Single Server
├─ All on localhost
├─ SQLite database
└─ Development setup

          ↓ (Growth)

Phase 2: Separate Backend
├─ Frontend on one server
├─ Backend API on another
└─ Still using SQLite

          ↓ (More Growth)

Phase 3: Production Scale
├─ Frontend: CDN + caching
├─ Backend: Load balanced
├─ Database: PostgreSQL/MySQL
├─ Storage: S3 or similar
└─ Monitoring & logging
```

---

This architecture provides:
✅ Security (JWT + Protected routes)
✅ Scalability (Separable components)
✅ Maintainability (Clean structure)
✅ Performance (Caching ready)
✅ Extensibility (Easy to add features)
