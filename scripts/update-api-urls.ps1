# Update all frontend files to use new consolidated API endpoints

Write-Host "🔄 Updating API URLs in frontend files..." -ForegroundColor Cyan
Write-Host ""

$updates = @(
    @{file="public/admin/pages/homepage.html"; old="/api/homepage"; new="/api/content?type=homepage"},
    @{file="public/admin/pages/about.html"; old="/api/about"; new="/api/content?type=about"},
    @{file="public/admin/pages/admissions.html"; old="/api/admissions"; new="/api/content?type=admissions"},
    @{file="public/admin/pages/children-home.html"; old="/api/children-home"; new="/api/content?type=children-home"},
    @{file="public/admin/pages/contact.html"; old="/api/contact"; new="/api/content?type=contact"},
    @{file="public/admin/pages/get-involved.html"; old="/api/get-involved"; new="/api/content?type=get-involved"},
    @{file="public/admin/pages/settings.html"; old="/api/settings"; new="/api/content?type=settings"}
)

$newsGalleryUpdates = @(
    @{file="public/admin/pages/news.html"; old="/api/news/all"; new="/api/news?all=true"},
    @{file="public/admin/pages/gallery.html"; old="/api/gallery/images"; new="/api/gallery?type=images"},
    @{file="public/admin/pages/gallery.html"; old="/api/gallery/categories"; new="/api/gallery?type=categories"},
    @{file="public/admin/pages/gallery.html"; old="/api/gallery/all"; new="/api/gallery?type=images&all=true"}
)

foreach ($update in $updates) {
    if (Test-Path $update.file) {
        Write-Host "Updating: $($update.file)" -ForegroundColor Yellow
        $content = Get-Content $update.file -Raw
        $content = $content -replace [regex]::Escape($update.old), $update.new
        Set-Content -Path $update.file -Value $content -NoNewline
        Write-Host "  ✅ Updated $($update.old) → $($update.new)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  File not found: $($update.file)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Updating news and gallery pages..." -ForegroundColor Yellow

foreach ($update in $newsGalleryUpdates) {
    if (Test-Path $update.file) {
        $content = Get-Content $update.file -Raw
        $content = $content -replace [regex]::Escape($update.old), $update.new
        Set-Content -Path $update.file -Value $content -NoNewline
        Write-Host "  ✅ Updated $($update.old) → $($update.new) in $($update.file)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ All API URLs updated!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test the changes locally if possible" -ForegroundColor White
Write-Host "2. Run: git add -A" -ForegroundColor White
Write-Host "3. Run: git commit -m 'Consolidate APIs to fit Vercel free plan'" -ForegroundColor White
Write-Host "4. Run: git push origin main" -ForegroundColor White
Write-Host "5. Wait for Vercel deployment (should succeed now with <12 functions!)" -ForegroundColor White
