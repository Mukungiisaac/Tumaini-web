# Script to replace old JWT auth with Supabase Auth in all editor pages

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

foreach ($page in $pages) {
    Write-Host "Processing: $page"
    
    $content = Get-Content $page -Raw
    
    # 1. Remove authToken declaration and check
    $content = $content -replace "let authToken = null;\s+", ""
    $content = $content -replace "authToken = localStorage\.getItem\('authToken'\);\s+", ""
    $content = $content -replace "console\.log\('authToken value:', authToken\);\s+", ""
    
    # 2. Remove auth check block
    $content = $content -replace "(?s)// Check authentication.*?loadAboutData\(\);.*?\}", "// Auth is handled by auth-helper.js`n      loadAboutData();"
    $content = $content -replace "(?s)if \(!authToken\).*?else.*?loadData\(\);.*?\}", "// Auth is handled by auth-helper.js`n      loadData();"
    
    # 3. Replace fetch with Auth.apiRequest for PUT/POST (except FormData)
    $content = $content -replace "const response = await fetch\(`\`\${apiUrl}/api/(\w+)``, \{[^}]*method: 'PUT',[^}]*headers:[^}]*'Authorization':[^}]*\},[^}]*body: JSON\.stringify\((\w+)\)[^}]*\}\);", "const response = await Auth.apiRequest('/api/`$1', { method: 'PUT', body: JSON.stringify(`$2) });"
    
    # 4. Replace Authorization header in FormData uploads
    $content = $content -replace "'Authorization': ``Bearer \${authToken}``", "'Authorization': ``Bearer `${await Auth.getAuthToken()}``"
    
    # 5. Add Auth.getAuthToken() call before FormData uploads
    $content = $content -replace "try \{(\s+)const response = await fetch\(`", "try {`$1const token = await Auth.getAuthToken();`$1const response = await fetch(``"
    $content = $content -replace "'Authorization': ``Bearer \${await Auth\.getAuthToken\(\)}`", "'Authorization': ``Bearer `${token}``"
    
    Set-Content -Path $page -Value $content -NoNewline
    
    Write-Host "  Updated auth calls"
}

Write-Host "`nDone! Updated all editor pages."
