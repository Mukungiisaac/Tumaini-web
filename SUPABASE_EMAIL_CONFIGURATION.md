# Supabase Email Configuration Guide

## Overview

This guide will help you configure Supabase Auth email templates and redirect URLs for password reset functionality.

---

## Step 1: Configure Redirect URLs (Required)

### In Supabase Dashboard:

1. **Navigate to Authentication Settings:**
   - Go to your Supabase Dashboard: https://supabase.com/dashboard
   - Select your project
   - Click **Authentication** (left sidebar)
   - Click **URL Configuration**

2. **Add Redirect URLs:**
   
   Add these URLs to the **Redirect URLs** list:
   
   - `https://tumaini-home-iota.vercel.app/admin/reset-password.html`
   - `https://tumaini-home-iota.vercel.app/**` (wildcard for all admin pages)
   - `http://localhost:8080/admin/reset-password.html` (for local testing)
   - `http://localhost:8080/**` (wildcard for local testing)

3. **Set Site URL:**
   
   In the same section, set:
   - **Site URL:** `https://tumaini-home-iota.vercel.app`

4. **Click Save**

---

## Step 2: Customize Email Templates (Optional but Recommended)

### Access Email Templates:

1. In Supabase Dashboard, go to **Authentication** → **Email Templates**

2. You'll see these templates:
   - **Confirm signup** (not needed - auto-confirmed)
   - **Invite user** (not needed)
   - **Magic Link** (not needed)
   - **Change Email Address** (optional)
   - **Reset Password** ⭐ (THIS ONE!)

### Customize "Reset Password" Template:

Click **Edit** on the **Reset Password** template and use this improved version:

```html
<h2>Reset Your Password</h2>

<p>Hello,</p>

<p>You requested to reset your password for your <strong>Tumaini Comprehensive School</strong> admin account.</p>

<p>Click the button below to set a new password:</p>

<p style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #0F766E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
    Reset Password
  </a>
</p>

<p><strong>This link will expire in 1 hour.</strong></p>

<p>If the button doesn't work, copy and paste this link into your browser:</p>
<p style="word-break: break-all; color: #0F766E;">{{ .ConfirmationURL }}</p>

<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

<p style="color: #6b7280; font-size: 14px;">
  If you didn't request this password reset, you can safely ignore this email. Your password will not be changed.
</p>

<p style="color: #6b7280; font-size: 14px;">
  <strong>Tumaini Comprehensive School & Children's Home</strong><br>
  Admin System
</p>
```

**Click Save**

---

## Step 3: Configure Email Settings

### Email Provider Options:

#### Option A: Use Supabase's Built-in Email (Default - Easiest)

Supabase provides email sending out of the box. It works immediately but:
- ✅ No setup required
- ✅ Works instantly
- ⚠️ Limited to 3-4 emails per hour per user
- ⚠️ May land in spam
- ⚠️ Sent from `noreply@mail.app.supabase.io`

**To use:** Nothing to do - it's already active!

#### Option B: Use Custom SMTP (Recommended for Production)

Use your own email service for better deliverability:

1. Go to **Authentication** → **Settings**
2. Scroll to **SMTP Settings**
3. Toggle **Enable Custom SMTP**
4. Fill in your SMTP details:

**Example with Gmail:**
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: tumainicomprehensive@gmail.com
SMTP Password: [App Password - see below]
Sender Email: tumainicomprehensive@gmail.com
Sender Name: Tumaini Admin
```

**Getting Gmail App Password:**
1. Go to Google Account settings
2. Security → 2-Step Verification → App passwords
3. Generate app password for "Mail"
4. Use this password in SMTP settings

**Other SMTP Providers:**
- **SendGrid**: smtp.sendgrid.net, port 587
- **Mailgun**: smtp.mailgun.org, port 587
- **AWS SES**: email-smtp.region.amazonaws.com, port 587

5. **Click Save**
6. **Test by sending a password reset email**

---

## Step 4: Test Email Flow

### Test Password Reset:

1. **Go to login page:**
   ```
   https://tumaini-home-iota.vercel.app/admin/login.html
   ```

2. **Click "Forgot password?"**

3. **Enter email:** `tumainicomprehensive@gmail.com`

4. **Click "Send Reset Link"**

5. **Check your email** (may take 1-2 minutes)

6. **Click the reset link in email**

7. **You should be redirected to:**
   ```
   https://tumaini-home-iota.vercel.app/admin/reset-password.html
   ```

8. **Set your new password**

9. **You should be redirected to login page**

10. **Login with new password** ✅

### Troubleshooting:

**❌ Email not arriving:**
- Check spam folder
- Wait 5 minutes (Supabase rate limits)
- Check Supabase Dashboard → Authentication → Users → Click user → Check "Email Sent At"
- Verify redirect URLs are configured correctly

**❌ "Invalid or expired reset link":**
- Links expire after 1 hour
- Request a new reset link
- Check that redirect URL matches exactly (no trailing slashes)

**❌ Redirect not working:**
- Ensure redirect URLs are added in Supabase settings
- Check browser console for errors
- Verify reset-password.html is deployed on Vercel

---

## Step 5: Customize Email Appearance (Advanced)

### Brand Your Emails:

You can add your school logo and colors to emails:

1. In Email Templates, add this CSS to the template:

```html
<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  }
  .header {
    text-align: center;
    padding: 20px;
    background-color: #0F766E;
    color: white;
  }
  .content {
    padding: 30px;
    background-color: #f9f9f9;
  }
  .button {
    background-color: #0F766E;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    display: inline-block;
  }
</style>

<div class="header">
  <h1>Tumaini Comprehensive School</h1>
</div>
<div class="content">
  <!-- Email content here -->
</div>
```

2. **Upload your logo:**
   - Upload logo to Vercel: `/assets/images/logo.png`
   - Reference in email: `<img src="https://tumaini-home-iota.vercel.app/assets/images/logo.png" width="80" />`

---

## Step 6: Security Settings (Important!)

### Configure Auth Policies:

1. Go to **Authentication** → **Policies**

2. **Recommended Settings:**
   - ✅ **Email confirmation required:** OFF (you're using email for password reset only)
   - ✅ **Secure password:** ON (minimum 8 characters)
   - ✅ **JWT expiration:** 3600 seconds (1 hour) or 86400 (24 hours)
   - ✅ **Refresh token expiration:** 2592000 seconds (30 days)

3. **Rate Limiting:**
   - Supabase automatically rate-limits password reset requests
   - Max ~3 emails per hour per user
   - Protects against spam/abuse

---

## Current Configuration Summary

### ✅ What's Already Set Up:

- Supabase Auth user created (`tumainicomprehensive@gmail.com`)
- Login page uses Supabase Auth
- Forgot password flow uses Supabase Auth
- Reset password page uses Supabase Auth
- API endpoints validate Supabase tokens
- Frontend auth helper created

### ⚠️ What You Need to Configure in Supabase Dashboard:

1. **Redirect URLs** (required - see Step 1)
2. **Email templates** (optional but recommended - see Step 2)
3. **SMTP settings** (optional but recommended for production - see Step 3)

---

## Quick Start Checklist

- [ ] Go to Supabase Dashboard → Authentication → URL Configuration
- [ ] Add redirect URLs for password reset
- [ ] Set Site URL to production domain
- [ ] (Optional) Customize "Reset Password" email template
- [ ] (Optional) Configure custom SMTP for better deliverability
- [ ] Test password reset flow
- [ ] Verify email arrives and link works
- [ ] Login with new password

**Estimated Time:** 10-15 minutes

---

## Support

### Supabase Documentation:
- Auth: https://supabase.com/docs/guides/auth
- Email Templates: https://supabase.com/docs/guides/auth/auth-email-templates
- SMTP: https://supabase.com/docs/guides/auth/auth-smtp

### Need Help?
- Supabase Support: support@supabase.com
- Community: https://github.com/supabase/supabase/discussions

---

## Next Steps

After email is configured and tested:

1. **Update .env.local** to remove Resend variables (no longer needed)
2. **Remove old auth API endpoints** (`api/auth/forgot-password.js`, `api/auth/reset-password.js`)
3. **Remove Resend dependency** from package.json
4. **Deploy to Vercel** with updated code
5. **Test complete auth flow** in production

🎉 Your CMS will now have fully functional password reset via email powered by Supabase!
