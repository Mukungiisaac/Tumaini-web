# Tumaini CMS - Cloud Migration

Modern, scalable CMS for Tumaini Comprehensive School & Children's Home.

## 🚀 Tech Stack

- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (Serverless)
- **Storage**: Supabase Storage
- **Auth**: JWT + bcrypt

## 📦 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your Supabase credentials
```

### 3. Set Up Supabase
See detailed instructions in `SETUP_SUPABASE_VERCEL.md`

### 4. Update Frontend URLs
```bash
npm run update-urls
```

### 5. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📖 Documentation

- **[Complete Setup Guide](SETUP_SUPABASE_VERCEL.md)** - Step-by-step deployment
- **[Migration Progress](VERCEL_MIGRATION_PROGRESS.md)** - What's done, what's next
- **[Database Schema](DATABASE_SCHEMA_ANALYSIS.md)** - All tables & columns

## 🏗️ Project Structure

```
├── api/              # Serverless API endpoints
├── lib/              # Shared utilities & database
├── public/           # Static frontend files
├── backend/          # Legacy code (for reference)
└── [config files]    # vercel.json, package.json, etc.
```

## 🔐 Environment Variables

Required in `.env`:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
JWT_SECRET=your-secret-minimum-32-chars
JWT_EXPIRE=7d
```

## 🧪 Testing

### Admin Panel
- Login: `/admin/login.html`
- Dashboard: `/admin/dashboard.html`

### Public Site
- Homepage: `/index.html`
- About: `/about.html`
- Admissions: `/admissions.html`
- Children's Home: `/childrens-home.html`

## 🚢 Deployment

### Deploy to Vercel
```bash
# Connect to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Deploy via Vercel dashboard
# https://vercel.com/new
```

See `SETUP_SUPABASE_VERCEL.md` for detailed instructions.

## 📝 NPM Scripts

- `npm run dev` - Start local development with Vercel
- `npm run deploy` - Deploy to production
- `npm run update-urls` - Update API URLs in frontend

## 🔒 Security

- JWT authentication for admin access
- Row Level Security (RLS) in Supabase
- HTTPS enforced by Vercel
- Environment variables for secrets
- Input validation on all endpoints

## 📊 Database

### Tables (13)
- `users` - Admin users
- `homepage` - Homepage content
- `about` - About Us content
- `admissions` - Admissions content
- `childrens_home` - Children's Home content
- `news` - News articles
- `gallery_categories` - Gallery categories
- `gallery_images` - Gallery images
- `contact` - Contact information
- `get_involved` - Get Involved content
- `settings` - Global settings
- And more...

Total: **402 columns** across all tables

## 🆘 Troubleshooting

### Database Connection Failed
- Check `.env` has correct Supabase credentials
- Verify Supabase project is not paused (free tier)

### API Not Working
- Run `npm run update-urls` to fix API endpoints
- Check Vercel environment variables are set

### Images Not Loading
- Verify Supabase Storage bucket "uploads" exists
- Check storage policies allow public read

See full troubleshooting guide in `SETUP_SUPABASE_VERCEL.md`

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## 🤝 Support

For issues or questions, refer to the documentation files in this project.

---

**Status**: 🟡 Migration in progress (80% complete)

**Next**: Follow `SETUP_SUPABASE_VERCEL.md` to complete deployment
