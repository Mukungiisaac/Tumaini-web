/**
 * Supabase Configuration
 * 
 * IMPORTANT: Get your keys from Supabase Dashboard
 * 1. Go to: https://supabase.com/dashboard/project/sdqlyzfcffhmmwmxuhrc
 * 2. Click: Settings > API
 * 3. Copy the "anon" "public" key (long JWT starting with eyJ...)
 * 4. Paste it below
 */

const SUPABASE_CONFIG = {
  url: 'https://sdqlyzfcffhmmwmxuhrc.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkcWx5emZjZmZobW13bXh1aHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NTA0NTYsImV4cCI6MjEwNzEyNjQ1Nn0.LVtj6Tdu9txB1-NUUXQ_it5Sqt4I0PVxCID2WWHu9ec'
};

// Export for use in other files
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
