# Script to migrate all editor pages from old JWT auth to Supabase Auth
# This script adds the editor-init.js and updates all pages to use new auth

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

Write-Host "🚀 Migrating editor pages to Supabase Auth..." -ForegroundColor Cyan
Write-Host ""

foreach ($page in $pages) {
    if (!(Test-Path $page)) {
        Write-Host "⚠️  Skipping $page (not found)" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "📝 Processing: $page" -ForegroundColor White
    
    $content = Get-Content $page -Raw
    $modified = $false
    
    # 1. Remove old authToken variable declaration
    if ($content -match "let authToken = null;") {
        $content = $content -replace "let authToken = null;\s*", ""
        Write-Host "   ✓ Removed authToken declaration" -ForegroundColor Green
        $modified = $true
    }
    
    # 2. Remove authToken retrieval from localStorage
    if ($content -match "authToken = localStorage\.getItem\('authToken'\);") {
        $content = $content -replace "authToken = localStorage\.getItem\('authToken'\);\s*", ""
        Write-Host "   ✓ Removed authToken localStorage call" -ForegroundColor Green
        $modified = $true
    }
    
    # 3. Remove auth check alert/redirect blocks
    if ($content -match "if \(!authToken\)") {
        # Replace the entire if-else auth check block
        $content = $content -replace "(?s)if \(!authToken\) \{[^}]*alert\([^)]*\);[^}]*window\.location\.href[^}]*\}[^}]*else[^}]*\{", "// Auth handled by editor-init.js`n      {"
        $content = $content -replace "(?s)// Check authentication.*?if \(!authToken\)[^}]*\}", "// Auth handled by editor-init.js"
        Write-Host "   ✓ Removed old auth check" -ForegroundColor Green
        $modified = $true
    }
    
    # 4. Replace direct fetch calls with apiCall (for JSON APIs)
    if ($content -match "fetch\(`\`\$\{apiUrl\}/api/") {
        # Replace PUT/POST requests
        $content = $content -replace "await fetch\(`\`\$\{apiUrl\}(/api/\w+)``, \{\s*method: '(PUT|POST)',\s*headers: \{[^}]*'Content-Type'[^}]*'Authorization'[^}]*\},\s*body: JSON\.stringify\((\w+)\)", "await apiCall('`$1', { method: '`$2', body: JSON.stringify(`$3)"
        Write-Host "   ✓ Updated API calls to use apiCall()" -ForegroundColor Green
        $modified = $true
    }
    
    # 5. Replace Authorization header in file uploads
    if ($content -match "'Authorization': ``Bearer \${authToken}``") {
        $content = $content -replace "'Authorization': ``Bearer \$\{authToken\}``", "'Authorization': ``Bearer `${await Auth.getAuthToken()}``"
        Write-Host "   ✓ Updated file upload auth" -ForegroundColor Green
        $modified = $true
    }
    
    # 6. Add editor-init.js if not present
    if ($content -notmatch "editor-init\.js") {
        $content = $content -replace "(<script src=""/admin/js/auth-helper\.js""></script>)", "`$1`n  <script src=""/admin/js/editor-init.js""></script>"
        Write-Host "   ✓ Added editor-init.js script" -ForegroundColor Green
        $modified = $true
    }
    
    # 7. Wrap existing init code in initEditorPage function if not already wrapped
    if ($content -match "document\.addEventListener\('DOMContentLoaded'," -and $content -notmatch "window\.initEditorPage") {
        # This is complex, so we'll just add a comment
        Write-Host "   ⚠️  Manual update needed: Wrap init code in window.initEditorPage" -ForegroundColor Yellow
    }
    
    if ($modified) {
        Set-Content -Path $page -Value $content -NoNewline
        Write-Host "   ✅ Updated successfully!" -ForegroundColor Green
    } else {
        Write-Host "   ℹ️  No changes needed" -ForegroundColor Gray
    }
    
    Write-Host ""
}

Write-Host "✅ Migration complete!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Manual verification needed for:" -ForegroundColor Yellow
Write-Host "   • Check that each page loads data correctly" -ForegroundColor Yellow
Write-Host "   • Verify save functions work properly" -ForegroundColor Yellow
Write-Host "   • Test file uploads if applicable" -ForegroundColor Yellow
Write-Host ""
Write-Host "📖 See TEMPLATE-editor.html for reference on proper structure" -ForegroundColor Cyan
