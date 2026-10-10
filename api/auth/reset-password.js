const bcrypt = require('bcryptjs');
const { getQuery, runQuery } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');

async function handleResetPassword(req, res) {
  await parseBody(req);
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    // Find user with valid reset token
    const user = await getQuery(
      `SELECT id, email, reset_token_expiry 
       FROM users 
       WHERE reset_token = $1 AND status = $2`,
      [token, 'active']
    );

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Check if token has expired
    const now = new Date();
    const expiry = new Date(user.reset_token_expiry);

    if (expiry < now) {
      return res.status(400).json({ error: 'Reset token has expired. Please request a new one.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await runQuery(
      `UPDATE users 
       SET password = $1, reset_token = NULL, reset_token_expiry = NULL 
       WHERE id = $2`,
      [hashedPassword, user.id]
    );

    console.log(`Password reset successful for user: ${user.email}`);

    res.json({ 
      success: true, 
      message: 'Password has been reset successfully' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}

module.exports = createHandler({
  post: handleResetPassword
});
