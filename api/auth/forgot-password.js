const crypto = require('crypto');
const { getQuery, runQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');

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

    // In production, send email here
    // For now, we'll just log the reset link
    const resetLink = `${process.env.FRONTEND_URL || req.headers.origin}/admin/reset-password.html?token=${resetToken}`;
    
    console.log('='.repeat(50));
    console.log('PASSWORD RESET REQUEST');
    console.log('='.repeat(50));
    console.log('User:', user.email);
    console.log('Reset Link:', resetLink);
    console.log('Token:', resetToken);
    console.log('Expires:', resetTokenExpiry);
    console.log('='.repeat(50));

    // TODO: Send email using SendGrid, AWS SES, or other email service
    // Example with SendGrid:
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Password Reset Request - Tumaini CMS',
    //   html: `
    //     <h2>Reset Your Password</h2>
    //     <p>Hi ${user.first_name},</p>
    //     <p>Click the link below to reset your password:</p>
    //     <a href="${resetLink}">${resetLink}</a>
    //     <p>This link expires in 1 hour.</p>
    //   `
    // });

    res.json({ 
      success: true, 
      message: 'If an account exists with that email, you will receive password reset instructions.',
      // Include reset link in development for testing
      ...(process.env.NODE_ENV === 'development' && { resetLink })
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
}

module.exports = createHandler({
  post: handleForgotPassword
});
