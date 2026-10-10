/**
 * Supabase Auth Helper for Admin Pages
 * Handles authentication, session management, and API requests
 */

// Initialize Supabase client
const SUPABASE_URL = 'https://sdqlyzfcffhmmwmxuhrc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkcWx5emZjZmZobW13bXh1aHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0MTIzNzAsImV4cCI6MjA0ODk4ODM3MH0.lOwSwPVxEEaT1Vu9eXLO4JmXiKgWWlGGkLJjH3kYi4E';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// API URL configuration
const apiUrl = localStorage.getItem('apiUrl') || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : '');

/**
 * Check if user is authenticated
 * Redirects to login if not authenticated
 */
async function requireAuth() {
  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (error || !session) {
      // No valid session - redirect to login
      window.location.href = '/admin/login.html';
      return null;
    }

    // Store user info in localStorage for convenience
    localStorage.setItem('user', JSON.stringify({
      id: session.user.id,
      email: session.user.email,
      role: session.user.user_metadata?.role || 'admin'
    }));

    return session;
  } catch (error) {
    console.error('Auth check error:', error);
    window.location.href = '/admin/login.html';
    return null;
  }
}

/**
 * Get current auth token
 */
async function getAuthToken() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  return session?.access_token || null;
}

/**
 * Make authenticated API request
 * Automatically includes Supabase auth token
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    const url = `${apiUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      console.warn('Unauthorized - redirecting to login');
      window.location.href = '/admin/login.html';
      return null;
    }

    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * Sign out user
 */
async function signOut() {
  try {
    await supabaseClient.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('supabaseSession');
    window.location.href = '/admin/login.html';
  } catch (error) {
    console.error('Sign out error:', error);
    // Force redirect even if sign out fails
    window.location.href = '/admin/login.html';
  }
}

/**
 * Get current user info
 */
async function getCurrentUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  return user;
}

/**
 * Listen for auth state changes
 */
function onAuthStateChange(callback) {
  return supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session);
    
    if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
      if (callback) callback(event, session);
    }
    
    // Redirect to login if signed out
    if (event === 'SIGNED_OUT') {
      window.location.href = '/admin/login.html';
    }
  });
}

// Export for use in other scripts
window.Auth = {
  requireAuth,
  getAuthToken,
  apiRequest,
  signOut,
  getCurrentUser,
  onAuthStateChange,
  supabase: supabaseClient
};

// Auto-check auth on page load
window.addEventListener('DOMContentLoaded', async () => {
  // Only check auth on admin pages (not login/reset-password)
  const currentPath = window.location.pathname;
  const publicPages = ['/admin/login.html', '/admin/reset-password.html'];
  
  if (!publicPages.includes(currentPath) && currentPath.startsWith('/admin/')) {
    await requireAuth();
  }
});
