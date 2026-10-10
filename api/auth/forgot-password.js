const crypto = require('crypto');
const { getQuery, runQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');

// Simple email sending function using Resend (https://resend.com)
// Free tier: 3000 emails/month, 100 emails/day
async function sendPasswordResetEmail(to, resetLink, firstName) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not set. Email will not be sent.');
    return { success: false, error: 'Email service not configured' };
  }

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%); color: white; padding: 30px 20px; text-align: center; }
    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .content { background: #ffffff; padding: 40px 30px; }
    .button { display: inline-block; background: #0f766e; color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
    .button:hover { background: #115e59; }
    .link-box { background: #f3f4f6; padding: 15px; border-radius: 6px; word-break: break-all; font-size: 13px; margin: 20px 0; }
    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; border-radius: 4px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🏫 Tumaini CMS</div>
      <h1 style="margin: 0; font-size: 28px;">Password Reset Request</h1>
    </div>
    <div class="content">
      <p style="font-size: 16px;">Hi ${firstName || 'there'},</p>
      <p>We received a request to reset your password for your Tumaini CMS admin account.</p>
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center;">
        <a href="${resetLink}" class="button">Reset My Password</a>
      </div>
      <p style="font-size: 14px; color: #6b7280;">Or copy and paste this link into your browser:</p>
      <div class="link-box">${resetLink}</div>
      <div class="warning">
        <strong>⏰ Important:</strong> This link expires in <strong>1 hour</strong> for security reasons.
      </div>
      <p style="font-size: 14px; color: #6b7280;">
        If you didn't request this password reset, you can safely ignore this email. 
        Your password will remain unchanged.
      </p>
    </div>
    <div class="footer">
      <p><strong>Tumaini Comprehensive School & Children's Home</strong></p>
      <p>Administrative Dashboard</p>
      <p style="margin-top: 15px;">This is an automated email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'Tumaini CMS <onboarding@resend.dev>',
        to: to,
        subject: '🔐 Reset Your Password - Tumaini CMS',
        html: emailHtml
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
}

async function handleForgotPassword(req, res) {
  await parseBody(req);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Check if user exists
    const user = await getQuery(
      'SELECT id, email, first_name FROM users WHERE email = $1 AND status = $2',
      [email, 'active']
    );

    // Always return success even if user doesn't exist (security best practice)
    if (!user) {
      return res.json({ 
        success: true, 
        message: 'If an account exists with that email, you will receive password reset instructions.' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await runQuery(
      'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE id = $3',
      [resetToken, resetTokenExpiry, user.id]
    );

    // Generate reset link
    const resetLink = `${process.env.FRONTEND_URL || req.headers.origin}/admin/reset-password.html?token=${resetToken}`;
    
    // Send email
    const emailResult = await sendPasswordResetEmail(user.email, resetLink, user.first_name);

    // Log for development/testing
    console.log('='.repeat(50));
    console.log('PASSWORD RESET REQUEST');
    console.log('='.repeat(50));
    console.log('User:', user.email);
    console.log('Email sent:', emailResult.success ? '✅ Yes' : '❌ No (check RESEND_API_KEY)');
    console.log('Reset Link:', resetLink);
    console.log('Token:', resetToken);
    console.log('Expires:', resetTokenExpiry.toLocaleString());
    console.log('='.repeat(50));

    res.json({ 
      success: true, 
      message: 'If an account exists with that email, you will receive password reset instructions.',
      // Include reset link in development for testing
      ...(process.env.NODE_ENV === 'development' && { resetLink, emailSent: emailResult.success })
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
}

module.exports = createHandler({
  post: handleForgotPassword
});
