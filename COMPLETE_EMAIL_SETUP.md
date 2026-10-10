# Complete Email Setup Guide

## Status: Email Not Working Yet ❌
**Reason:** Missing RESEND_API_KEY in Vercel environment variables

---

## Fix Email in 5 Minutes

### 1. Get Resend API Key (2 minutes)

1. Go to: https://resend.com/signup
2. Sign up with: `tumainicomprehensive@gmail.com`
3. Verify your email
4. Go to **API Keys** section (left sidebar)
5. Click **Create API Key**
6. Name it: `Tumaini Production`
7. Copy the key (starts with `re_...`)

### 2. Add to Vercel (1 minute)

1. Go to: https://vercel.com/dashboard
2. Click your project: **tumaini-home**
3. Go to: **Settings** → **Environment Variables**
4. Add/Update these variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `RESEND_API_KEY` | `re_...` (your key) | ⚠️ Required - Currently missing |
| `FROM_EMAIL` | `onboarding@resend.dev` | Use this for testing |
| `FRONTEND_URL` | `https://tumaini-home-iota.vercel.app` | Should already exist |

5. Click **Save** for each

### 3. Run SQL Migration in Supabase (1 minute)

1. Go to: Supabase Dashboard → **SQL Editor**
2. Click **New query**
3. Paste this SQL:

```sql
-- Add password reset token columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS reset_token TEXT,
ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);
```

4. Click **Run** (bottom right)
5. You should see: "Success. No rows returned"

### 4. Redeploy Vercel (1 minute)

1. In Vercel, go to **Deployments** tab
2. Find the latest deployment
3. Click the **...** menu → **Redeploy**
4. Wait 30 seconds for deployment to complete

### 5. Test Password Reset Flow

1. Go to: https://tumaini-home-iota.vercel.app/admin/login.html
2. Click **"Forgot Password?"**
3. Enter: `tumainicomprehensive@gmail.com`
4. Click **"Send Reset Link"**
5. Check your email inbox for reset link
6. Click the link and set a new password

---

## Troubleshooting

### Email Still Not Coming?

**Check Vercel Logs:**
1. Vercel Dashboard → **Deployments** → Latest → **View Function Logs**
2. Look for the reset link in the logs (temporary workaround)
3. Copy the URL and visit it manually

**Check Spam Folder:**
- Reset emails might land in spam first time

**Verify FROM_EMAIL:**
- `onboarding@resend.dev` works immediately (no verification needed)
- Custom domains require DNS verification in Resend

### Get Reset Link from Logs

If email fails, the reset link is logged in Vercel:

1. Go to: Vercel → **Deployments** → Latest → **Functions**
2. Click on `api/auth/forgot-password.js`
3. Look for: `Reset link: https://tumaini-home-iota.vercel.app/admin/reset-password.html?token=...`
4. Copy that URL and open it in your browser

---

## Current Login (Immediate Access)

While you set up email, you can login now:

- **URL:** https://tumaini-home-iota.vercel.app/admin/login.html
- **Email:** tumainicomprehensive@gmail.com
- **Password:** TumainiAdmin2024!

---

## Email Service Details

### Why Resend?

- ✅ **Free:** 3,000 emails/month
- ✅ **No credit card** required
- ✅ **Simple setup** - just API key
- ✅ **Reliable** delivery
- ✅ **Beautiful** email templates

### Alternative: Use Your Gmail

Want to send from `tumainicomprehensive@gmail.com` instead?

1. In Resend, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (if you have one)
4. Follow DNS verification steps
5. Update `FROM_EMAIL` in Vercel to your verified domain

---

## What Happens When Email Works?

### Forgot Password Flow:

1. User clicks "Forgot Password?" on login page
2. Enters their email address
3. System generates secure token (expires in 1 hour)
4. Email sent with reset link
5. User clicks link → goes to reset-password.html
6. User enters new password
7. Token validated, password updated
8. User can login with new password

### Email Template:

The email will look like this:

```
From: Tumaini Comprehensive School <onboarding@resend.dev>
Subject: Reset Your Password

Hello,

You requested to reset your password for your Tumaini Comprehensive School admin account.

Click the link below to reset your password:

[Reset Password Button]

This link will expire in 1 hour.

If you didn't request this, you can safely ignore this email.

Best regards,
Tumaini Comprehensive School
```

---

## Files Created for Password Reset

- ✅ `api/auth/forgot-password.js` - Generates token, sends email
- ✅ `api/auth/reset-password.js` - Validates token, updates password
- ✅ `public/admin/reset-password.html` - Password reset form page
- ✅ `public/admin/login.html` - Updated with forgot password modal
- ✅ `supabase-add-reset-token.sql` - Database migration

---

## Need Help?

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Check Vercel function logs for errors

---

## Summary Checklist

- [ ] Get Resend API key from resend.com
- [ ] Add RESEND_API_KEY to Vercel environment variables
- [ ] Set FROM_EMAIL to `onboarding@resend.dev`
- [ ] Run SQL migration in Supabase SQL Editor
- [ ] Redeploy Vercel
- [ ] Test forgot password flow
- [ ] Update FROM_EMAIL to custom domain (optional, later)

**Estimated Time:** 5 minutes  
**Difficulty:** Easy  
**Cost:** Free (3000 emails/month)
