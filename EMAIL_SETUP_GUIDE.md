# Email Setup with Resend (FREE!)

## Why Resend?

- ✅ **FREE**: 3,000 emails/month, 100 emails/day
- ✅ **Simple**: Just one API key
- ✅ **Fast**: Emails delivered in seconds
- ✅ **Reliable**: 99.9% uptime
- ✅ **No credit card needed** for free tier

## Step-by-Step Setup (5 minutes)

### Step 1: Create Resend Account

1. Go to: https://resend.com/signup
2. Sign up with your email (or GitHub)
3. Verify your email

### Step 2: Get API Key

1. After logging in, you'll see the dashboard
2. Click **"API Keys"** in the left sidebar
3. Click **"Create API Key"**
4. Name it: `Tumaini CMS`
5. Copy the API key (starts with `re_...`)
6. **Save it** - you won't see it again!

### Step 3: Add to Environment Variables

#### For Local Development:

Add to your `.env` file:
```env
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=Tumaini CMS <noreply@yourdomain.com>
FRONTEND_URL=http://localhost:8080
```

#### For Production (Vercel):

1. Go to Vercel Dashboard
2. Open your project: **tumaini-home**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
RESEND_API_KEY = re_your_api_key_here
FROM_EMAIL = Tumaini CMS <noreply@yourdomain.com>
FRONTEND_URL = https://tumaini-home-iota.vercel.app
```

5. Click **Save**
6. **Redeploy** your project

### Step 4: Verify Domain (Optional but Recommended)

To send from your own domain (e.g., `admin@tumaini.school`):

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `tumaini.school`
4. Add the DNS records they provide to your domain registrar
5. Wait for verification (usually 5-10 minutes)
6. Update `FROM_EMAIL` to: `Tumaini CMS <admin@tumaini.school>`

**Without domain verification**, emails come from: `onboarding@resend.dev`

## Testing

### Test Password Reset:

1. Go to admin login page
2. Click "Forgot password?"
3. Enter email: `tumainicomprehensive@gmail.com`
4. Check inbox for reset email
5. Click reset link
6. Set new password

### Check Logs:

If email doesn't arrive:
1. Go to Resend Dashboard → **Emails**
2. See all sent emails and delivery status
3. Check Vercel Runtime Logs for errors

## Email Template Preview

Your users will receive a beautiful email like this:

```
┌─────────────────────────────────────┐
│   🏫 Tumaini CMS                    │
│   Password Reset Request            │
├─────────────────────────────────────┤
│                                     │
│  Hi [Name],                         │
│                                     │
│  We received a request to reset     │
│  your password.                     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Reset My Password] Button │   │
│  └─────────────────────────────┘   │
│                                     │
│  ⏰ Expires in 1 hour               │
│                                     │
├─────────────────────────────────────┤
│  Tumaini Comprehensive School       │
│  This is an automated email         │
└─────────────────────────────────────┘
```

## Troubleshooting

### "Email service not configured"
- Check `RESEND_API_KEY` is set in environment variables
- Restart Vercel deployment after adding variables

### Email not received
1. Check spam folder
2. Verify email address is correct in Supabase `users` table
3. Check Resend dashboard for delivery status
4. Check Vercel logs for errors

### "Invalid API key"
- Make sure you copied the full key (starts with `re_`)
- Check for extra spaces in `.env` or Vercel variables
- Generate a new API key if needed

## Free Tier Limits

Resend Free Tier:
- **3,000 emails/month**
- **100 emails/day**
- **1 domain verification**
- No credit card required

For Tumaini CMS admin use, this is more than enough!

## Alternative: Use Resend without Domain

If you don't want to verify a domain, emails will come from:
```
onboarding@resend.dev
```

This works fine for internal admin use! Just leave `FROM_EMAIL` as default.

## Cost Estimate

If you need more emails later:

| Plan | Emails/month | Cost |
|------|--------------|------|
| Free | 3,000 | $0 |
| Growth | 50,000 | $20 |
| Pro | 100,000 | $80 |

For admin password resets, Free tier is perfect! 🎉

## Summary

1. ✅ Sign up at resend.com
2. ✅ Get API key
3. ✅ Add to .env and Vercel
4. ✅ Redeploy
5. ✅ Test password reset

**Total time: 5 minutes**
**Total cost: $0**

---

## What's Already Done:

✅ Email template created (beautiful HTML)
✅ Reset link generation
✅ Token expiration (1 hour)
✅ Error handling
✅ Development mode (shows link in console)
✅ Production mode (sends real email)

**You just need to add the API key!** 🚀
