const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../database/tumaini.db');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Helper to run queries
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize database
const initializeDatabase = async () => {
  try {
    console.log('🗄️  Initializing database...');

    // Users table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        role TEXT DEFAULT 'admin',
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Homepage table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS homepage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hero_image TEXT,
        hero_badge TEXT,
        hero_title TEXT,
        hero_description TEXT,
        hero_button_primary TEXT,
        hero_button_primary_link TEXT,
        hero_button_secondary TEXT,
        hero_button_secondary_link TEXT,
        stat_students TEXT,
        stat_pass_rate TEXT,
        stat_children_residence TEXT,
        stat_awards TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // About table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS about (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        history TEXT,
        description TEXT,
        mission TEXT,
        vision TEXT,
        core_values TEXT,
        leadership_info TEXT,
        images TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Admissions table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS admissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        requirements TEXT,
        available_classes TEXT,
        instructions TEXT,
        important_dates TEXT,
        documents TEXT,
        application_links TEXT,
        is_published INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Children's Home table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS childrens_home (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        programmes TEXT,
        activities TEXT,
        impact_info TEXT,
        statistics TEXT,
        support_ways TEXT,
        images TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // News table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        featured_image TEXT,
        category TEXT,
        author TEXT,
        content TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        publication_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Gallery Categories table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS gallery_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Gallery Images table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        category_id INTEGER,
        is_published INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES gallery_categories(id) ON DELETE SET NULL
      )
    `);

    // Get Involved table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS get_involved (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donation_info TEXT,
        volunteer_info TEXT,
        partnership_info TEXT,
        sponsorship_info TEXT,
        support_ways TEXT,
        donation_instructions TEXT,
        contact_info TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone_primary TEXT,
        phone_secondary TEXT,
        email_primary TEXT,
        email_secondary TEXT,
        physical_address TEXT,
        office_hours TEXT,
        social_media TEXT,
        google_maps_link TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Settings table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT UNIQUE NOT NULL,
        setting_value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database initialized successfully');
    
    // Check if admin user exists
    const adminUser = await getQuery('SELECT * FROM users WHERE email = ?', ['admin@tumaini.school']);
    
    if (!adminUser) {
      // Create default admin user (password: Admin123!)
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      
      await runQuery(
        `INSERT INTO users (email, username, password, first_name, last_name, role) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['admin@tumaini.school', 'admin', hashedPassword, 'Admin', 'User', 'admin']
      );
      
      console.log('✅ Default admin user created');
      console.log('   Email: admin@tumaini.school');
      console.log('   Password: Admin123!');
      console.log('   ⚠️  IMPORTANT: Change this password after first login!');
    }

  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

module.exports = {
  db,
  runQuery,
  getQuery,
  allQuery,
  initializeDatabase
};
