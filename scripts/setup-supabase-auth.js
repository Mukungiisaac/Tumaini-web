/**
 * Setup Supabase Auth User
 * Creates admin user in Supabase Auth system for password reset functionality
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in your .env file');
  process.exit(1);
}

// Create Supabase client with service role key (required for admin operations)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupAuthUser() {
  try {
    console.log('🔄 Setting up Supabase Auth user...\n');

    // Admin user details
    const adminEmail = 'tumainicomprehensive@gmail.com';
    const adminPassword = 'TumainiAdmin2024!'; // User will reset this immediately

    // Check if user already exists in Auth
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }

    const existingUser = existingUsers.users.find(u => u.email === adminEmail);

    if (existingUser) {
      console.log('✅ User already exists in Supabase Auth');
      console.log(`   User ID: ${existingUser.id}`);
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   Email Confirmed: ${existingUser.email_confirmed_at ? 'Yes' : 'No'}`);
      console.log('\n💡 If you need to reset password, use the "Forgot Password" flow on the login page.');
      return;
    }

    // Create user in Supabase Auth
    console.log('📧 Creating user in Supabase Auth...');
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Auto-confirm email (no confirmation email needed)
      user_metadata: {
        role: 'admin',
        full_name: 'Tumaini Admin'
      }
    });

    if (createError) {
      throw createError;
    }

    console.log('\n✅ User created successfully in Supabase Auth!');
    console.log('\n📋 User Details:');
    console.log(`   User ID: ${newUser.user.id}`);
    console.log(`   Email: ${newUser.user.email}`);
    console.log(`   Email Confirmed: Yes (auto-confirmed)`);
    
    console.log('\n🔑 Login Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    
    console.log('\n🔗 Login URL:');
    console.log('   https://tumaini-home-iota.vercel.app/admin/login.html');
    
    console.log('\n⚠️  IMPORTANT: Change this password immediately after first login!');
    
    console.log('\n📧 Password Reset:');
    console.log('   You can now use "Forgot Password?" on the login page');
    console.log('   Supabase will send reset emails automatically!');

  } catch (error) {
    console.error('\n❌ Error setting up auth user:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

setupAuthUser();
