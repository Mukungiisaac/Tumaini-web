const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database/tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('🔄 Starting homepage table migration...\n');

const migrations = [
  // Social Proof
  { column: 'hero_social_proof_text', type: 'TEXT', default: 'Join 450+ students on their journey to excellence' },
  
  // Statistics Labels
  { column: 'stat_students_label', type: 'TEXT', default: 'Empowered Students' },
  { column: 'stat_pass_rate_label', type: 'TEXT', default: 'Examination Pass Rate' },
  { column: 'stat_children_label', type: 'TEXT', default: 'Children in Residence' },
  { column: 'stat_awards_label', type: 'TEXT', default: 'Co-Curricular Awards' },
  
  // Holistic Approach Section
  { column: 'holistic_badge', type: 'TEXT', default: 'Our Foundation' },
  { column: 'holistic_title', type: 'TEXT', default: 'A Holistic Approach to Learning and Living' },
  { column: 'holistic_description', type: 'TEXT', default: 'At Tumaini, we believe that education is more than just textbooks. It is about providing a safe, nurturing environment where every child feels valued, supported, and inspired to reach their full potential.' },
  { column: 'holistic_feature_1', type: 'TEXT', default: 'Nationally recognized academic curriculum' },
  { column: 'holistic_feature_2', type: 'TEXT', default: 'Safe and modern residential housing facilities' },
  { column: 'holistic_feature_3', type: 'TEXT', default: 'Holistic character development and mentorship' },
  { column: 'holistic_feature_4', type: 'TEXT', default: 'Thriving sports and arts programs' },
  { column: 'holistic_button_text', type: 'TEXT', default: 'Explore Our Programs' },
  { column: 'holistic_button_link', type: 'TEXT', default: '/about.html' },
  { column: 'holistic_image', type: 'TEXT', default: 'assets/images/in-class.png' },
  { column: 'holistic_badge_top', type: 'TEXT', default: 'Quality Education' },
  { column: 'holistic_badge_bottom', type: 'TEXT', default: 'Since 2010' },
  
  // Pillars Section
  { column: 'pillars_title', type: 'TEXT', default: 'Pillars of Our Excellence' },
  { column: 'pillars_subtitle', type: 'TEXT', default: 'We provide a comprehensive ecosystem designed to support the growth of our students academically, physically, and emotionally.' },
  { column: 'pillar_1_title', type: 'TEXT', default: 'Academic Rigor' },
  { column: 'pillar_1_description', type: 'TEXT', default: 'Our curriculum is designed to challenge students while providing the support they need to succeed in national examinations and beyond.' },
  { column: 'pillar_2_title', type: 'TEXT', default: 'Residential Care' },
  { column: 'pillar_2_description', type: 'TEXT', default: 'A home away from home. Our residential facilities provide a safe, clean, and nurturing environment for children to live and grow.' },
  { column: 'pillar_3_title', type: 'TEXT', default: 'Community Impact' },
  { column: 'pillar_3_description', type: 'TEXT', default: 'We believe in the power of community. Our students are encouraged to engage with and give back to the local society.' },
  
  // News Section
  { column: 'news_section_title', type: 'TEXT', default: 'Latest from Our School' },
  { column: 'news_section_subtitle', type: 'TEXT', default: 'Stay updated with the vibrant life at Tumaini—from academic milestones to exciting sports events and community projects.' },
  { column: 'news_section_button_text', type: 'TEXT', default: 'View All News' },
  
  // Testimonial Section
  { column: 'testimonial_quote', type: 'TEXT', default: 'Tumaini didn\'t just give my daughter an education; they gave her a future she never thought possible. The teachers truly care about the soul of the child, not just their grades.' },
  { column: 'testimonial_author', type: 'TEXT', default: 'Sarah Mwikali' },
  { column: 'testimonial_author_title', type: 'TEXT', default: 'Parent of Class 8 Graduate' },
  { column: 'testimonial_author_image', type: 'TEXT', default: 'assets/images/testimonial-sarah.jpg' },
  
  // Bottom CTA Section
  { column: 'cta_title', type: 'TEXT', default: 'Invest in the Leaders of Tomorrow' },
  { column: 'cta_description', type: 'TEXT', default: 'Whether you are a prospective parent, a community partner, or a donor, there are many ways to be part of the Tumaini story. Join us today.' },
  { column: 'cta_button_1_text', type: 'TEXT', default: 'Apply for Admission' },
  { column: 'cta_button_1_link', type: 'TEXT', default: '/admissions.html' },
  { column: 'cta_button_2_text', type: 'TEXT', default: 'Partner with Us' },
  { column: 'cta_button_2_link', type: 'TEXT', default: '/contact.html' }
];

let completed = 0;
let skipped = 0;
let errors = 0;

function addColumn(migration) {
  return new Promise((resolve) => {
    // Check if column already exists
    db.all(`PRAGMA table_info(homepage)`, (err, columns) => {
      if (err) {
        console.error(`❌ Error checking columns: ${err.message}`);
        errors++;
        resolve();
        return;
      }
      
      const columnExists = columns.some(col => col.name === migration.column);
      
      if (columnExists) {
        console.log(`⏭️  Column '${migration.column}' already exists - skipping`);
        skipped++;
        resolve();
        return;
      }
      
      // Add the column
      const sql = `ALTER TABLE homepage ADD COLUMN ${migration.column} ${migration.type} DEFAULT '${migration.default.replace(/'/g, "''")}'`;
      
      db.run(sql, (err) => {
        if (err) {
          console.error(`❌ Error adding column '${migration.column}': ${err.message}`);
          errors++;
        } else {
          console.log(`✅ Added column: ${migration.column}`);
          completed++;
        }
        resolve();
      });
    });
  });
}

async function runMigrations() {
  console.log(`📋 Total columns to add: ${migrations.length}\n`);
  
  for (const migration of migrations) {
    await addColumn(migration);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log(`   ✅ Added: ${completed}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('='.repeat(60));
  
  if (errors === 0) {
    console.log('\n✨ Migration completed successfully!');
  } else {
    console.log('\n⚠️  Migration completed with errors');
  }
  
  db.close();
}

runMigrations();
