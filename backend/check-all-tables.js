const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/tumaini.db');

console.log('Checking database: ../database/tumaini.db\n');

db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name", (err, tables) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`Found ${tables.length} tables:\n`);
  tables.forEach((t, i) => {
    console.log(`${i + 1}. ${t.name}`);
  });
  
  db.close();
});
