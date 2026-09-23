/**
 * Database Migration Script: Children's Home CMS
 * Creates childrens_home table with 65 content fields + 5 image fields
 * Total: 70 columns
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database/tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('🔄 Starting Children\'s Home CMS migration...\n');

// Get current content from childrens-home.html (default values)
const defaultValues = {
  // HERO SECTION (12 fields + 1 image)
  hero_image: 'assets/images/enviroment.jpg',
  hero_badge_title: 'Safe Family Environment',
  hero_badge_subtitle: 'Loving caregivers & 24/7 dedicated supervision',
  hero_badge_tag: '100% Safe',
  hero_card_badge: 'Residential Care',
  hero_heading_line1: 'A Nurturing Home for',
  hero_heading_line2: 'Every Child',
  hero_description: 'Providing a safe, loving, and supportive residential community for orphans and vulnerable children in Kenya since 2010. We empower each child with family warmth, nutrition, medical care, and quality education.',
  hero_button1_text: 'Apply for Residency',
  hero_button2_text: 'Sponsor a Child',
  hero_social_number: '70+',
  hero_social_text: 'Joined by 70+ happy children under our holistic residential care program.',

  // KEY STATS SECTION (16 fields)
  stat1_number: '70+',
  stat1_title: 'Resident Children',
  stat1_description: 'Safe housing and family-style dormitories',
  
  stat2_number: '1,500+',
  stat2_title: 'Daily Meals Served',
  stat2_description: 'Nutritious, chef-prepared balanced diet',
  
  stat3_number: '100%',
  stat3_title: 'School Enrollment',
  stat3_description: 'Full CBC primary & junior school access',
  
  stat4_number: '24/7',
  stat4_title: 'Professional Care',
  stat4_description: 'Resident parents, nurses & counselors',

  // HOLISTIC CARE SECTION (15 fields + 3 images)
  care_section_badge: 'Our Holistic Model',
  care_section_title: 'Comprehensive Care & Development',
  care_section_description: 'We believe every child deserves comprehensive care that fosters emotional security, physical vitality, academic growth, and spiritual strength.',
  
  care1_image: 'assets/images/care-academic.jpg',
  care1_badge: 'Education',
  care1_title: 'Academic & Skills Training',
  care1_description: 'Full integration into our on-school CBC school, modern computer labs, well-stocked library, and tailored vocational apprenticeships for senior youth.',
  
  care2_image: 'assets/images/food.jfif',
  care2_badge: 'Nutrition',
  care2_title: 'Nutritious Dining & Wellness',
  care2_description: 'Fresh, balanced meals prepared daily by our dietary staff using organic produce from our school farm to fuel growing bodies and active minds.',
  
  care3_image: 'assets/images/care-health.jpg',
  care3_badge: 'Health & Therapy',
  care3_title: 'Healthcare & Counseling',
  care3_description: 'On-school medical clinic, routine pediatric checkups, immunization, and professional trauma-informed psychosocial support.',

  // SAFEGUARDING SECTION (9 fields + 1 image)
  safeguarding_image: 'assets/images/safeguarding-art.jpg',
  safeguarding_badge: 'Child Protection Standards',
  safeguarding_title: 'Our Zero-Tolerance Safeguarding Policy',
  safeguarding_description: 'At Tumaini Children\'s Home, the safety, dignity, and mental well-being of every child is our utmost priority. We strictly comply with the Kenya Directorate of Children\'s Services regulations and global safeguarding frameworks.',
  safeguarding_point1: 'Strict Staff Vetting: Comprehensive police clearance certificates and mandatory child-protection background checks for all workers and volunteers.',
  safeguarding_point2: 'Secure Gated Facility: 24-hour perimeter security, biometric visitor logging, and strict parental/guardian verification protocol.',
  safeguarding_point3: 'Individual Care Plans: Customized psycho-social support, academic tracking, and case management for every resident child.',
  safeguarding_point4: 'Whistleblowing & Advocacy: Direct reporting mechanisms and unannounced oversight visits by certified child welfare officers.',

  // SPONSORSHIP SECTION (18 fields)
  sponsor_badge: 'Sponsorship & Giving',
  sponsor_title: 'Make a Lasting Impact Today',
  sponsor_description: 'Your direct contribution funds essential meals, medical care, school books, and boarding necessities for children in need.',
  
  tier1_name: 'Supporter',
  tier1_price: 'KES 2,500',
  tier1_period: '/ month',
  tier1_description: 'Provides daily nutritious meals, essential hygiene supplies, and routine medical checkups for one child.',
  tier1_button_text: 'Sponsor as Supporter',
  
  tier2_name: 'Guardian',
  tier2_price: 'KES 7,500',
  tier2_period: '/ month',
  tier2_description: 'Covers full school tuition, learning materials, uniform, residential housing, full nutrition, and healthcare.',
  tier2_button_text: 'Sponsor as Guardian',
  
  tier3_name: 'Champion',
  tier3_price: 'KES 15,000',
  tier3_period: '/ month',
  tier3_description: 'Comprehensive support for two children plus contributions to our school clinic, library, and vocational workshop.',
  tier3_button_text: 'Sponsor as Champion'
};

// SQL to add all 70 columns
const migrations = [
  // Hero Section (13 columns)
  `ALTER TABLE childrens_home ADD COLUMN hero_image TEXT DEFAULT 'assets/images/enviroment.jpg'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_badge_title TEXT DEFAULT 'Safe Family Environment'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_badge_subtitle TEXT DEFAULT 'Loving caregivers & 24/7 dedicated supervision'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_badge_tag TEXT DEFAULT '100% Safe'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_card_badge TEXT DEFAULT 'Residential Care'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_heading_line1 TEXT DEFAULT 'A Nurturing Home for'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_heading_line2 TEXT DEFAULT 'Every Child'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_description TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN hero_button1_text TEXT DEFAULT 'Apply for Residency'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_button2_text TEXT DEFAULT 'Sponsor a Child'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_social_number TEXT DEFAULT '70+'`,
  `ALTER TABLE childrens_home ADD COLUMN hero_social_text TEXT DEFAULT ''`,

  // Key Stats Section (12 columns)
  `ALTER TABLE childrens_home ADD COLUMN stat1_number TEXT DEFAULT '70+'`,
  `ALTER TABLE childrens_home ADD COLUMN stat1_title TEXT DEFAULT 'Resident Children'`,
  `ALTER TABLE childrens_home ADD COLUMN stat1_description TEXT DEFAULT 'Safe housing and family-style dormitories'`,
  
  `ALTER TABLE childrens_home ADD COLUMN stat2_number TEXT DEFAULT '1,500+'`,
  `ALTER TABLE childrens_home ADD COLUMN stat2_title TEXT DEFAULT 'Daily Meals Served'`,
  `ALTER TABLE childrens_home ADD COLUMN stat2_description TEXT DEFAULT 'Nutritious, chef-prepared balanced diet'`,
  
  `ALTER TABLE childrens_home ADD COLUMN stat3_number TEXT DEFAULT '100%'`,
  `ALTER TABLE childrens_home ADD COLUMN stat3_title TEXT DEFAULT 'School Enrollment'`,
  `ALTER TABLE childrens_home ADD COLUMN stat3_description TEXT DEFAULT 'Full CBC primary & junior school access'`,
  
  `ALTER TABLE childrens_home ADD COLUMN stat4_number TEXT DEFAULT '24/7'`,
  `ALTER TABLE childrens_home ADD COLUMN stat4_title TEXT DEFAULT 'Professional Care'`,
  `ALTER TABLE childrens_home ADD COLUMN stat4_description TEXT DEFAULT 'Resident parents, nurses & counselors'`,

  // Holistic Care Section (15 columns)
  `ALTER TABLE childrens_home ADD COLUMN care_section_badge TEXT DEFAULT 'Our Holistic Model'`,
  `ALTER TABLE childrens_home ADD COLUMN care_section_title TEXT DEFAULT 'Comprehensive Care & Development'`,
  `ALTER TABLE childrens_home ADD COLUMN care_section_description TEXT DEFAULT ''`,
  
  `ALTER TABLE childrens_home ADD COLUMN care1_image TEXT DEFAULT 'assets/images/care-academic.jpg'`,
  `ALTER TABLE childrens_home ADD COLUMN care1_badge TEXT DEFAULT 'Education'`,
  `ALTER TABLE childrens_home ADD COLUMN care1_title TEXT DEFAULT 'Academic & Skills Training'`,
  `ALTER TABLE childrens_home ADD COLUMN care1_description TEXT DEFAULT ''`,
  
  `ALTER TABLE childrens_home ADD COLUMN care2_image TEXT DEFAULT 'assets/images/food.jfif'`,
  `ALTER TABLE childrens_home ADD COLUMN care2_badge TEXT DEFAULT 'Nutrition'`,
  `ALTER TABLE childrens_home ADD COLUMN care2_title TEXT DEFAULT 'Nutritious Dining & Wellness'`,
  `ALTER TABLE childrens_home ADD COLUMN care2_description TEXT DEFAULT ''`,
  
  `ALTER TABLE childrens_home ADD COLUMN care3_image TEXT DEFAULT 'assets/images/care-health.jpg'`,
  `ALTER TABLE childrens_home ADD COLUMN care3_badge TEXT DEFAULT 'Health & Therapy'`,
  `ALTER TABLE childrens_home ADD COLUMN care3_title TEXT DEFAULT 'Healthcare & Counseling'`,
  `ALTER TABLE childrens_home ADD COLUMN care3_description TEXT DEFAULT ''`,

  // Safeguarding Section (9 columns)
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_image TEXT DEFAULT 'assets/images/safeguarding-art.jpg'`,
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_badge TEXT DEFAULT 'Child Protection Standards'`,
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_title TEXT DEFAULT 'Our Zero-Tolerance Safeguarding Policy'`,
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_description TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_point1 TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_point2 TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_point3 TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN safeguarding_point4 TEXT DEFAULT ''`,

  // Sponsorship Section (21 columns)
  `ALTER TABLE childrens_home ADD COLUMN sponsor_badge TEXT DEFAULT 'Sponsorship & Giving'`,
  `ALTER TABLE childrens_home ADD COLUMN sponsor_title TEXT DEFAULT 'Make a Lasting Impact Today'`,
  `ALTER TABLE childrens_home ADD COLUMN sponsor_description TEXT DEFAULT ''`,
  
  `ALTER TABLE childrens_home ADD COLUMN tier1_name TEXT DEFAULT 'Supporter'`,
  `ALTER TABLE childrens_home ADD COLUMN tier1_price TEXT DEFAULT 'KES 2,500'`,
  `ALTER TABLE childrens_home ADD COLUMN tier1_period TEXT DEFAULT '/ month'`,
  `ALTER TABLE childrens_home ADD COLUMN tier1_description TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN tier1_button_text TEXT DEFAULT 'Sponsor as Supporter'`,
  
  `ALTER TABLE childrens_home ADD COLUMN tier2_name TEXT DEFAULT 'Guardian'`,
  `ALTER TABLE childrens_home ADD COLUMN tier2_price TEXT DEFAULT 'KES 7,500'`,
  `ALTER TABLE childrens_home ADD COLUMN tier2_period TEXT DEFAULT '/ month'`,
  `ALTER TABLE childrens_home ADD COLUMN tier2_description TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN tier2_button_text TEXT DEFAULT 'Sponsor as Guardian'`,
  
  `ALTER TABLE childrens_home ADD COLUMN tier3_name TEXT DEFAULT 'Champion'`,
  `ALTER TABLE childrens_home ADD COLUMN tier3_price TEXT DEFAULT 'KES 15,000'`,
  `ALTER TABLE childrens_home ADD COLUMN tier3_period TEXT DEFAULT '/ month'`,
  `ALTER TABLE childrens_home ADD COLUMN tier3_description TEXT DEFAULT ''`,
  `ALTER TABLE childrens_home ADD COLUMN tier3_button_text TEXT DEFAULT 'Sponsor as Champion'`
];

let successCount = 0;
let errorCount = 0;

// Function to run migrations sequentially
function runMigration(index) {
  if (index >= migrations.length) {
    // All migrations complete, now insert default record
    insertDefaultRecord();
    return;
  }

  db.run(migrations[index], (err) => {
    if (err) {
      if (err.message.includes('duplicate column name')) {
        console.log(`⚠️  Column already exists (skipped): ${migrations[index].match(/ADD COLUMN (\w+)/)[1]}`);
      } else {
        console.error(`❌ Error: ${err.message}`);
        errorCount++;
      }
    } else {
      successCount++;
      const columnName = migrations[index].match(/ADD COLUMN (\w+)/)[1];
      console.log(`✅ Added column: ${columnName}`);
    }
    
    // Continue with next migration
    runMigration(index + 1);
  });
}

// Function to insert default record if not exists
function insertDefaultRecord() {
  console.log('\n📝 Checking for default record...');
  
  db.get('SELECT * FROM childrens_home WHERE id = 1', (err, row) => {
    if (err) {
      console.error('❌ Error checking for record:', err.message);
      closeDatabase();
      return;
    }

    if (row) {
      console.log('✅ Default record already exists (id=1)');
      closeDatabase();
      return;
    }

    // Insert default record with all values
    const columns = Object.keys(defaultValues).join(', ');
    const placeholders = Object.keys(defaultValues).map(() => '?').join(', ');
    const values = Object.values(defaultValues);

    const insertSQL = `INSERT INTO childrens_home (id, ${columns}) VALUES (1, ${placeholders})`;

    db.run(insertSQL, values, function(err) {
      if (err) {
        console.error('❌ Error inserting default record:', err.message);
      } else {
        console.log('✅ Created default record with id=1');
      }
      closeDatabase();
    });
  });
}

// Function to close database and show summary
function closeDatabase() {
  console.log('\n' + '='.repeat(50));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successful: ${successCount} columns`);
  console.log(`❌ Errors: ${errorCount} columns`);
  console.log(`📋 Total Attempted: ${migrations.length} columns`);
  console.log('='.repeat(50));
  
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
    } else {
      console.log('\n✅ Database connection closed');
      console.log('🎉 Children\'s Home CMS migration complete!\n');
    }
  });
}

// Start migration
db.serialize(() => {
  // First, ensure table exists
  db.run(`CREATE TABLE IF NOT EXISTS childrens_home (
    id INTEGER PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
      db.close();
    } else {
      console.log('✅ Table childrens_home ready\n');
      console.log('Adding 70 content columns...\n');
      runMigration(0);
    }
  });
});
