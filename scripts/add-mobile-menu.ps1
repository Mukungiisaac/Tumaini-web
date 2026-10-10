# Add mobile menu toggle JavaScript to all public pages

Write-Host "📱 Adding mobile menu functionality to public pages..." -ForegroundColor Cyan
Write-Host ""

$mobileMenuScript = @'

  <!-- Mobile Menu Toggle Script -->
  <script>
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu visibility
        mobileMenu.classList.toggle('hidden');
        
        // Toggle aria-expanded
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle icons
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.classList.toggle('hidden');
          menuIconClose.classList.toggle('hidden');
        }
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          if (menuIconOpen && menuIconClose) {
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
          }
        }
      });

      // Close mobile menu when resizing to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) { // lg breakpoint
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          if (menuIconOpen && menuIconClose) {
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
          }
        }
      });
    }
  </script>
'@

$pages = @(
    "public/about.html",
    "public/admissions.html",
    "public/childrens-home.html",
    "public/contact.html",
    "public/gallery.html",
    "public/get-involved.html",
    "public/news.html"
)

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "Processing: $page" -ForegroundColor Yellow
        
        $content = Get-Content $page -Raw
        
        # Check if mobile menu script already exists
        if ($content -match "Mobile Menu Toggle Script") {
            Write-Host "  ⏭️  Already has mobile menu script" -ForegroundColor Gray
            continue
        }
        
        # Check if file ends with closing tags
        if ($content -match "</body>") {
            # Insert before </body>
            $content = $content -replace "</body>", "$mobileMenuScript`n</body>"
            Set-Content -Path $page -Value $content -NoNewline
            Write-Host "  ✅ Added mobile menu script" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Could not find closing body tag - manual fix needed" -ForegroundColor Red
        }
    } else {
        Write-Host "  ❌ File not found: $page" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Mobile menu added to all pages!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test on mobile device or use Chrome DevTools" -ForegroundColor White
Write-Host "2. Click hamburger menu - should open and close smoothly" -ForegroundColor White
Write-Host "3. Commit and deploy the changes" -ForegroundColor White
