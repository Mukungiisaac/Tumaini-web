# Script to add Supabase Auth Helper to all admin editor pages

$pages = @(
    "public\admin\pages\about.html",
    "public\admin\pages\admissions.html", 
    "public\admin\pages\children-home.html",
    "public\admin\pages\contact.html",
    "public\admin\pages\gallery.html",
    "public\admin\pages\get-involved.html",
    "public\admin\pages\homepage.html",
    "public\admin\pages\news.html",
    "public\admin\pages\settings.html"
)

$authScripts = @"

  <!-- Supabase Auth Helper -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="/admin/js/auth-helper.js"></script>
</body>
</html>
"@

foreach ($page in $pages) {
    Write-Host "Processing: $page"
    
    # Read file content
    $content = Get-Content $page -Raw
    
    # Check if already has auth helper
    if ($content -match "auth-helper.js") {
        Write-Host "  Already has auth helper, skipping"
        continue
    }
    
    # Replace closing tags
    $newContent = $content -replace "</body>\s*</html>", $authScripts
    
    # Write back
    Set-Content -Path $page -Value $newContent -NoNewline
    
    Write-Host "  Added auth helper"
}

Write-Host "`n✅ Done! Updated all admin pages with Supabase Auth."
