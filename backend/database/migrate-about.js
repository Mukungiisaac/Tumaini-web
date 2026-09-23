const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database/tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('Starting About Page Migration...\n');

// Define all new columns to add
const newColumns = [
  // Hero Section (6 fields)
  { name: 'hero_badge_text1', type: 'TEXT', default: 'Established 2010' },
  { name: 'hero_badge_text2', type: 'TEXT', default: 'Motto: Knowledge is Power' },
  { name: 'hero_title_line1', type: 'TEXT', default: 'Nurturing Minds,' },
  { name: 'hero_title_line2', type: 'TEXT', default: 'Transforming Futures' },
  { name: 'hero_description', type: 'TEXT', default: 'Tumaini Comprehensive School is more than just an educational institution. We are a community dedicated to academic excellence, moral integrity, and the compassionate care of our residential children.' },
  { name: 'hero_image', type: 'TEXT', default: 'assets/images/about-hero.jpg' },

  // Mission, Vision, Values Section (9 fields)
  { name: 'mission_title', type: 'TEXT', default: 'Our Mission' },
  { name: 'mission_description', type: 'TEXT', default: 'To provide and advance holistic quality education which develops everyone to be earnest seekers of truth and be adequately equipped with appropriate knowledge and attitudes for service to God and humanity.' },
  { name: 'vision_title', type: 'TEXT', default: 'Our Vision' },
  { name: 'vision_description', type: 'TEXT', default: 'To be a leading Centre of excellence in learning and produce world class individuals equipped with moral virtues.' },
  { name: 'values_title', type: 'TEXT', default: 'Our Motto & Values' },
  { name: 'values_motto', type: 'TEXT', default: 'Knowledge is power' },
  { name: 'values_item1', type: 'TEXT', default: 'Moral Virtues & Truth' },
  { name: 'values_item2', type: 'TEXT', default: 'Holistic Excellence' },
  { name: 'values_item3', type: 'TEXT', default: 'Service to God & Humanity' },
  { name: 'values_item4', type: 'TEXT', default: 'Compassion & Community' },

  // Timeline Section (11 fields)
  { name: 'timeline_section_title', type: 'TEXT', default: 'A Legacy of Growth' },
  { name: 'timeline_intro', type: 'TEXT', default: 'Our journey began with a simple belief: that every child in Kenya deserves an education that challenges the mind and nurtures the soul. Over the years, our campus has grown from a single classroom into a comprehensive environment that includes residential facilities, modern labs, and vast green spaces.' },
  { name: 'timeline_year1', type: 'TEXT', default: '2010' },
  { name: 'timeline_title1', type: 'TEXT', default: 'The Beginning' },
  { name: 'timeline_desc1', type: 'TEXT', default: 'Tumaini was founded as a small community center with 15 students.' },
  { name: 'timeline_year2', type: 'TEXT', default: '2012' },
  { name: 'timeline_title2', type: 'TEXT', default: 'Residential Wing' },
  { name: 'timeline_desc2', type: 'TEXT', default: 'The Children\'s Home was established to provide a safe haven for vulnerable youth.' },
  { name: 'timeline_year3', type: 'TEXT', default: '2016' },
  { name: 'timeline_title3', type: 'TEXT', default: 'School Expansion' },
  { name: 'timeline_desc3', type: 'TEXT', default: 'Completion of the junior secondary wing and modern computer laboratories.' },
  { name: 'timeline_year4', type: 'TEXT', default: '2021' },
  { name: 'timeline_title4', type: 'TEXT', default: 'National Recognition' },
  { name: 'timeline_desc4', type: 'TEXT', default: 'Awarded \'Most Improved Educational Institution\' in the Sub County.' },
  { name: 'campus_image', type: 'TEXT', default: 'assets/images/about-campus.jpg' },
  { name: 'campus_badge_number', type: 'TEXT', default: '500+' },
  { name: 'campus_badge_text', type: 'TEXT', default: 'Happy students currently enrolled and thriving in our community.' },

  // Leadership Section (11 fields)
  { name: 'leadership_section_title', type: 'TEXT', default: 'Our Dedicated Leadership' },
  { name: 'leadership_intro', type: 'TEXT', default: 'Meet the passionate educators and administrators who steer our vision and ensure the highest standards of care and learning.' },
  { name: 'leader1_image', type: 'TEXT', default: 'assets/images/leader-sarah.jpg' },
  { name: 'leader1_name', type: 'TEXT', default: 'Dr. Sarah Mbeki' },
  { name: 'leader1_title', type: 'TEXT', default: 'Principal & Founder' },
  { name: 'leader1_bio', type: 'TEXT', default: 'With over 20 years in education, Dr. Sarah founded Tumaini to bridge the gap in quality learning for the community.' },
  { name: 'leader2_image', type: 'TEXT', default: 'assets/images/leader-james.jpg' },
  { name: 'leader2_name', type: 'TEXT', default: 'Mr. James Ochieng' },
  { name: 'leader2_title', type: 'TEXT', default: 'Head Administrator' },
  { name: 'leader2_bio', type: 'TEXT', default: 'James oversees operations, ensuring that both the school and children\'s home function with excellence and care.' },
  { name: 'leader3_image', type: 'TEXT', default: 'assets/images/leader-amina.jpg' },
  { name: 'leader3_name', type: 'TEXT', default: 'Ms. Amina Yusuf' },
  { name: 'leader3_title', type: 'TEXT', default: 'Director of Academics' },
  { name: 'leader3_bio', type: 'TEXT', default: 'Amina leads our curriculum development, focusing on holistic growth and 21st-century skills for every student.' },

  // Certification Section (6 fields)
  { name: 'certification_title', type: 'TEXT', default: 'Certified Excellence' },
  { name: 'certification_description', type: 'TEXT', default: 'Tumaini Comprehensive is fully accredited by the Ministry of Education, Science, and Technology. Our residential home is licensed and inspected regularly to ensure the highest safety and care standards.' },
  { name: 'cert_badge1', type: 'TEXT', default: 'KICD APPROVED' },
  { name: 'cert_badge2', type: 'TEXT', default: 'CERTIFIED SAFE HAVEN' },
  { name: 'cert_item1', type: 'TEXT', default: 'K-12 Education Licensing' },
  { name: 'cert_item2', type: 'TEXT', default: 'Child Safety Certification' },
  { name: 'cert_item3', type: 'TEXT', default: 'Modern Lab Safety Cert' },
  { name: 'cert_item4', type: 'TEXT', default: 'Nutrition & Health Award' },

  // CTA Section (3 fields)
  { name: 'cta_title', type: 'TEXT', default: 'Ready to join the Tumaini Family?' },
  { name: 'cta_description', type: 'TEXT', default: 'Whether you are looking to enroll your child or want to support our mission, we would love to hear from you.' },
  { name: 'cta_button1_text', type: 'TEXT', default: 'Apply Now' },
  { name: 'cta_button2_text', type: 'TEXT', default: 'Visit Our Campus' }
];

// Function to check if column exists
function columnExists(tableName, columnName) {
  return new Promise((resolve, reject) => {
    db.all(`PRAGMA table_info(${tableName})`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const exists = rows.some(row => row.name === columnName);
        resolve(exists);
      }
    });
  });
}

// Function to add a column
function addColumn(tableName, columnName, columnType, defaultValue) {
  return new Promise((resolve, reject) => {
    const escapedDefault = defaultValue.replace(/'/g, "''");
    const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType} DEFAULT '${escapedDefault}'`;
    
    db.run(sql, [], (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`✓ Added column: ${columnName}`);
        resolve();
      }
    });
  });
}

// Main migration function
let errorCount = 0;

async function migrate() {
  let addedCount = 0;
  let skippedCount = 0;
  errorCount = 0;

  console.log('Checking and adding columns to "about" table...\n');

  for (const column of newColumns) {
    try {
      const exists = await columnExists('about', column.name);
      
      if (exists) {
        console.log(`⊘ Skipped (already exists): ${column.name}`);
        skippedCount++;
      } else {
        await addColumn('about', column.name, column.type, column.default);
        addedCount++;
      }
    } catch (err) {
      console.error(`✗ Error adding ${column.name}:`, err.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total columns to process: ${newColumns.length}`);
  console.log(`✓ Added: ${addedCount}`);
  console.log(`⊘ Skipped: ${skippedCount}`);
  console.log(`✗ Errors: ${errorCount}`);
  console.log('='.repeat(60) + '\n');

  if (errorCount === 0) {
    console.log('✓ About page migration completed successfully!\n');
  } else {
    console.log('⚠ Migration completed with errors. Please review the log above.\n');
  }
}

// Run migration and close database
migrate()
  .then(() => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
      process.exit(errorCount > 0 ? 1 : 0);
    });
  })
  .catch((err) => {
    console.error('Migration failed:', err);
    db.close();
    process.exit(1);
  });
