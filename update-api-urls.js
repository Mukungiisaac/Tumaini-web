/**
 * Script to update hardcoded API URLs to environment-aware URLs
 * Run this after copying files to /public directory
 */

const fs = require('fs');
const path = require('path');

// Old URL patterns to replace
const oldPatterns = [
  'http://192.168.0.110:3001',
  'http://localhost:3001',
];

// New environment-aware URL
const newUrlCode = `(window.location.hostname === 'localhost' ? 'http://localhost:3001' : '')`;

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    oldPatterns.forEach(oldPattern => {
      const regex = new RegExp(`['"]${oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
      if (content.match(regex)) {
        content = content.replace(regex, newUrlCode);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function scanDirectory(dir, filePattern = /\.(html|js)$/) {
  let updatedFiles = 0;
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (filePattern.test(item)) {
        if (updateFile(fullPath)) {
          updatedFiles++;
        }
      }
    });
  }
  
  scan(dir);
  return updatedFiles;
}

// Main execution
console.log('🔄 Updating API URLs in frontend files...\n');

const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
  console.error('❌ /public directory not found!');
  console.log('Please run the folder reorganization first.');
  process.exit(1);
}

const updatedCount = scanDirectory(publicDir);

console.log(`\n✨ Complete! Updated ${updatedCount} file(s).`);
console.log('\nNew API URL pattern:');
console.log('  const apiUrl = (window.location.hostname === "localhost" ? "http://localhost:3001" : "");');
console.log('\nThis will:');
console.log('  - Use "http://localhost:3001" when testing locally');
console.log('  - Use relative URLs (same domain) when deployed to Vercel');
