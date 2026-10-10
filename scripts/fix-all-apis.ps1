# Fix all API endpoints to use direct Supabase client (faster & more reliable)

Write-Host "🔧 Fixing all API endpoints..." -ForegroundColor Cyan

# Array of API endpoints to fix
$apis = @(
    @{name="children-home"; table="childrens_home"},
    @{name="homepage"; table="homepage"}
)

foreach ($api in $apis) {
    $name = $api.name
    $table = $api.table
    $filePath = "api/$name/index.js"
    
    Write-Host "Fixing $filePath..." -ForegroundColor Yellow
    
    $content = @"
// api/$name/index.js - ${name} content API
const { createClient } = require('@supabase/supabase-js');
const { withAuth } = require('../lib/supabase-auth-middleware');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET - Fetch ${name} content (public)
async function handleGet(req, res) {
  try {
    const { data, error } = await supabase
      .from('$table')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: '${name} content not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// PUT - Update ${name} content (admin only)
async function handlePut(req, res) {
  try {
    const updates = req.body;

    const { data, error } = await supabase
      .from('$table')
      .update(updates)
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      data, 
      updatedBy: req.user?.email 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Cache for 1 minute (improves speed)
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'PUT') {
    return withAuth(handlePut)(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
"@
    
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Host "✅ Fixed $filePath" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ All API endpoints fixed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update Supabase keys in .env file (get from Supabase Dashboard → Settings → API)" -ForegroundColor White
Write-Host "2. Update SUPABASE_SERVICE_ROLE_KEY in Vercel environment variables" -ForegroundColor White
Write-Host "3. Run: git add -A && git commit -m 'Fix and optimize all API endpoints' && git push" -ForegroundColor White
