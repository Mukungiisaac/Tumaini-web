const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Checking childrens_home table...\n');

// Check if table exists
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='childrens_home'", (err, row) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  if (!row) {
    console.log('❌ Table childrens_home does NOT exist');
    db.close();
    return;
  }
  
  console.log('✅ Table childrens_home exists\n');
  
  // Get table structure
  db.all("PRAGMA table_info(childrens_home)", (err, columns) => {
    if (err) {
      console.error('Error getting columns:', err);
      return;
    }
    
    console.log(`📊 Table has ${columns.length} columns\n`);
    
    // Check for our key columns
    const keyColumns = ['hero_description', 'stat1_number', 'care_section_title', 'tier1_name'];
    keyColumns.forEach(col => {
      const found = columns.find(c => c.name === col);
      if (found) {
        console.log(`✅ Column exists: ${col}`);
      } else {
        console.log(`❌ Column missing: ${col}`);
      }
    });
    
    console.log('\n🔍 Checking data...\n');
    
    // Get actual data
    db.get("SELECT * FROM childrens_home WHERE id = 1", (err, data) => {
      if (err) {
        console.error('Error querying data:', err);
        db.close();
        return;
      }
      
      if (!data) {
        console.log('❌ No data found with id=1');
      } else {
        console.log('✅ Data found with id=1');
        console.log(`   Fields in record: ${Object.keys(data).length}`);
        console.log(`   Sample: hero_heading_line1 = "${data.hero_heading_line1}"`);
        console.log(`   Sample: tier1_name = "${data.tier1_name}"`);
      }
      
      db.close();
    });
  });
});
