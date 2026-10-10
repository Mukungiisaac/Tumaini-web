# Simple script to add editor-init.js to remaining pages
# The editor-init.js will handle auth automatically

$pages = @(
    "public\admin\pages\admissions.html",
    "public\admin\pages\children-home.html",
    "public\admin\pages\contact.html",
    "public\admin\pages\gallery.html",
    "public\admin\pages\get-involved.html",
    "public\admin\pages\homepage.html",
    "public\admin\pages\news.html",
    "public\admin\pages\settings.html"
)

$editorInitScript = '  <script src="/admin/js/editor-init.js"></script>'

Write-Host "Adding editor-init.js to all pages..." -ForegroundColor Cyan

foreach ($page in $pages) {
    if (!(Test-Path $page)) {
        Write-Host "  Skipping $page (not found)" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Processing: $page" -ForegroundColor White
    
    $content = Get-Content $page -Raw
    
    # Check if editor-init.js is already included
    if ($content -match "editor-init\.js") {
        Write-Host "  Already has editor-init.js" -ForegroundColor Gray
        continue
    }
    
    # Add editor-init.js after auth-helper.js
    if ($content -match '(<script src="/admin/js/auth-helper\.js"></script>)') {
        $content = $content -replace '(<script src="/admin/js/auth-helper\.js"></script>)', "`$1`n$editorInitScript"
        Set-Content -Path $page -Value $content -NoNewline
        Write-Host "  Added editor-init.js" -ForegroundColor Green
    } else {
        Write-Host "  Warning: Could not find auth-helper.js" -ForegroundColor Yellow
    }
}

Write-Host "`nDone! Now updating the pages to remove old auth checks..." -ForegroundColor Cyan
Write-Host ""

# For each page, remove the old auth check and use the new system
foreach ($page in $pages) {
    if (!(Test-Path $page)) { continue }
    
    $content = Get-Content $page -Raw
    $modified = $false
    
    # Remove authToken variable
    if ($content -match "let authToken") {
        $content = $content -replace "let authToken = null;\s*\n", ""
        $content = $content -replace "authToken = localStorage\.getItem\('authToken'\);\s*\n", ""
        $modified = $true
    }
    
    # Replace the auth check with simpler version
    $oldAuthCheck = @"
      // Check authentication
      if (!authToken) {
        console.error('❌ No authToken found in localStorage!');
        alert('No authentication token found. You will be redirected to login.\nCheck console for details.');
        setTimeout(() => {
          window.location.href = '../login.html';
        }, 2000);
      } else {
        console.log('✅ Authentication successful! Token found:', authToken.substring(0, 20) + '...');
        // Load data after authentication is confirmed
        loadData();
      }
"@
    
    if ($content -match "Check authentication") {
        # Just remove the whole auth check block and replace with load call
        $content = $content -replace "(?s)// Check authentication.*?loadData\(\);.*?\}", "// Auth handled by editor-init.js - just load data`n      loadData();"
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $page -Value $content -NoNewline
        Write-Host "  Updated auth in $page" -ForegroundColor Green
    }
}

Write-Host "`n✅ All pages updated!" -ForegroundColor Green
Write-Host "Note: Pages still use fetch() directly - they'll work but won't redirect properly on auth failure" -ForegroundColor Yellow
Write-Host "For best results, update fetch() calls to use window.apiCall() as shown in TEMPLATE-editor.html" -ForegroundColor Yellow
