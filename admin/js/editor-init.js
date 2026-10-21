/**
 * Universal Editor Initialization Script
 * Include this in all admin editor pages for consistent auth handling
 * 
 * Usage:
 * 1. Include auth-helper.js before this script
 * 2. Define initEditorPage() function in your page
 * 3. This script will handle auth and call your init function
 */

(function() {
  'use strict';
  
  // Wait for DOM and auth-helper to be ready
  document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔧 Editor Init:', window.location.pathname);
    console.log('📦 Running in iframe:', window.self !== window.top);
    
    // Check if Auth helper is available
    if (typeof window.Auth === 'undefined') {
      console.error('❌ Auth helper not loaded! Make sure auth-helper.js is included before editor-init.js');
      return;
    }
    
    // In iframe, skip auth check (parent handles it)
    if (window.self !== window.top) {
      console.log('✅ Running in iframe - auth handled by parent');
    } else {
      // Standalone mode - verify authentication
      console.log('🔐 Checking authentication...');
      const session = await window.Auth.requireAuth();
      if (!session) {
        console.error('❌ No valid session');
        return;
      }
      console.log('✅ Authenticated:', session.user.email);
    }
    
    // Call page-specific initialization
    if (typeof window.initEditorPage === 'function') {
      console.log('🚀 Initializing editor page...');
      window.initEditorPage();
    } else {
      console.warn('⚠️ No initEditorPage() function defined');
    }
  });
  
  /**
   * Helper function to make authenticated API calls
   * Use this instead of fetch() for all API requests
   */
  window.apiCall = async function(endpoint, options = {}) {
    try {
      return await window.Auth.apiRequest(endpoint, options);
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };
  
  /**
   * Helper function to upload files with authentication
   */
  window.uploadFile = async function(file, apiUrl = '') {
    try {
      const token = await window.Auth.getAuthToken();
      const formData = new FormData();
      formData.append('image', file);
      
      const url = apiUrl || `${localStorage.getItem('apiUrl') || ''}/api/upload`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };
  
  console.log('✅ Editor init script loaded');
})();
