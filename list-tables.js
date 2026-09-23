const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'backend/database/tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('📋 Listing all tables in database...\n');

db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", (err, tables) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`Found ${tables.length} tables:\n`);
  tables.forEach((table, index) => {
    console.log(`${index + 1}. ${table.name}`);
  });
  
  // Check specifically for children-related tables
  const childrenTables = tables.filter(t => t.name.toLowerCase().includes('child'));
  
  if (childrenTables.length > 0) {
    console.log('\n🔍 Children-related tables:');
    childrenTables.forEach(t => console.log(`   - ${t.name}`));
  }
  
  db.close();
});
