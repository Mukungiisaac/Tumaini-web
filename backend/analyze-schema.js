/**
 * Analyze current SQLite database schema
 * Extract all tables and their structures for Supabase migration
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../database/tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Analyzing current database schema...\n');

let schemaReport = `# Current Database Schema Analysis\n\n`;
schemaReport += `**Database:** SQLite → PostgreSQL (Supabase)\n`;
schemaReport += `**Analysis Date:** ${new Date().toISOString()}\n\n`;
schemaReport += `---\n\n`;

// Get all tables
db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", (err, tables) => {
  if (err) {
    console.error('❌ Error:', err.message);
    db.close();
    return;
  }

  console.log(`✅ Found ${tables.length} tables\n`);
  schemaReport += `## Tables Found: ${tables.length}\n\n`;

  let processedTables = 0;
  const tableSchemas = {};

  tables.forEach((table) => {
    const tableName = table.name;
    
    // Skip SQLite internal tables
    if (tableName.startsWith('sqlite_')) {
      processedTables++;
      return;
    }

    console.log(`📊 Analyzing table: ${tableName}`);

    // Get table structure
    db.all(`PRAGMA table_info(${tableName})`, (err, columns) => {
      if (err) {
        console.error(`   ❌ Error getting columns: ${err.message}`);
        processedTables++;
        return;
      }

      console.log(`   ✅ ${columns.length} columns`);
      
      tableSchemas[tableName] = columns;
      
      schemaReport += `### Table: \`${tableName}\`\n\n`;
      schemaReport += `**Columns:** ${columns.length}\n\n`;
      schemaReport += `| Column | Type | Not Null | Default | Primary Key |\n`;
      schemaReport += `|--------|------|----------|---------|-------------|\n`;
      
      columns.forEach(col => {
        schemaReport += `| ${col.name} | ${col.type} | ${col.notnull ? 'YES' : 'NO'} | ${col.dflt_value || 'NULL'} | ${col.pk ? 'YES' : 'NO'} |\n`;
      });
      
      schemaReport += `\n`;

      // Get row count
      db.get(`SELECT COUNT(*) as count FROM ${tableName}`, (err, row) => {
        if (!err && row) {
          schemaReport += `**Row Count:** ${row.count}\n\n`;
          console.log(`   📈 Rows: ${row.count}`);
        }

        schemaReport += `---\n\n`;
        
        processedTables++;

        // Check if all tables processed
        if (processedTables === tables.length) {
          finalizeReport();
        }
      });
    });
  });

  function finalizeReport() {
    console.log('\n✅ Schema analysis complete!');
    console.log('📝 Writing report...\n');

    // Write schema report
    fs.writeFileSync('DATABASE_SCHEMA_ANALYSIS.md', schemaReport);
    console.log('✅ Created: DATABASE_SCHEMA_ANALYSIS.md');

    // Generate PostgreSQL migration SQL
    generatePostgreSQLMigration(tableSchemas);

    db.close();
  }

  function generatePostgreSQLMigration(schemas) {
    let sqlScript = `-- Tumaini CMS - PostgreSQL Migration Script\n`;
    sqlScript += `-- Generated: ${new Date().toISOString()}\n`;
    sqlScript += `-- Migrate from SQLite to Supabase (PostgreSQL)\n\n`;
    sqlScript += `-- ==============================================\n`;
    sqlScript += `-- IMPORTANT: Run this in Supabase SQL Editor\n`;
    sqlScript += `-- ==============================================\n\n`;

    Object.keys(schemas).forEach(tableName => {
      const columns = schemas[tableName];
      
      sqlScript += `-- Table: ${tableName}\n`;
      sqlScript += `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
      
      const columnDefs = columns.map(col => {
        let def = `  ${col.name} `;
        
        // Convert SQLite types to PostgreSQL types
        if (col.type.includes('INTEGER')) {
          def += col.pk ? 'SERIAL PRIMARY KEY' : 'INTEGER';
        } else if (col.type.includes('TEXT')) {
          def += 'TEXT';
        } else if (col.type.includes('REAL')) {
          def += 'REAL';
        } else if (col.type.includes('DATETIME')) {
          def += 'TIMESTAMP';
        } else {
          def += col.type;
        }
        
        // Add constraints
        if (col.notnull && !col.pk) {
          def += ' NOT NULL';
        }
        
        // Add default value
        if (col.dflt_value) {
          if (col.dflt_value === 'CURRENT_TIMESTAMP') {
            def += ' DEFAULT CURRENT_TIMESTAMP';
          } else {
            def += ` DEFAULT ${col.dflt_value}`;
          }
        }
        
        return def;
      });
      
      sqlScript += columnDefs.join(',\n');
      sqlScript += `\n);\n\n`;
      
      // Add indexes for important columns
      if (tableName === 'users') {
        sqlScript += `CREATE INDEX IF NOT EXISTS idx_${tableName}_email ON ${tableName}(email);\n`;
      }
      
      sqlScript += `-- Enable Row Level Security\n`;
      sqlScript += `ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;\n\n`;
    });

    // Add RLS policies
    sqlScript += `-- ==============================================\n`;
    sqlScript += `-- ROW LEVEL SECURITY POLICIES\n`;
    sqlScript += `-- ==============================================\n\n`;
    
    sqlScript += `-- Public read access for content tables\n`;
    const publicTables = ['homepage', 'about', 'admissions', 'childrens_home', 'news', 'gallery'];
    publicTables.forEach(table => {
      sqlScript += `CREATE POLICY "Allow public read access" ON ${table}\n`;
      sqlScript += `  FOR SELECT USING (true);\n\n`;
    });
    
    sqlScript += `-- Admin write access (requires authentication)\n`;
    publicTables.forEach(table => {
      sqlScript += `CREATE POLICY "Allow authenticated updates" ON ${table}\n`;
      sqlScript += `  FOR UPDATE USING (auth.role() = 'authenticated');\n\n`;
    });

    fs.writeFileSync('supabase-migration.sql', sqlScript);
    console.log('✅ Created: supabase-migration.sql');
    console.log('\n🎉 Migration scripts ready!\n');
  }
});
