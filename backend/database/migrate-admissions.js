const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database/tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('Starting Admissions Page Migration...\n');

// Define all new columns to add
const newColumns = [
  // Hero Section (7 fields)
  { name: 'hero_badge', type: 'TEXT', default: 'Admissions 2024/2025' },
  { name: 'hero_title_line1', type: 'TEXT', default: 'Your Child\'s Future' },
  { name: 'hero_title_line2', type: 'TEXT', default: 'Starts Here' },
  { name: 'hero_description', type: 'TEXT', default: 'Join a community where academic excellence meets nurturing care. We are now accepting applications for all grades. Empower your child with a holistic education rooted in values.' },
  { name: 'hero_button1_text', type: 'TEXT', default: 'Apply Now' },
  { name: 'hero_button2_text', type: 'TEXT', default: 'Download Prospectus' },
  { name: 'hero_image', type: 'TEXT', default: 'assets/images/admissions-hero.jpg' },

  // Process Steps Section (10 fields)
  { name: 'process_section_title', type: 'TEXT', default: 'Simple 4-Step Process' },
  { name: 'process_section_subtitle', type: 'TEXT', default: 'We\'ve streamlined our admission process to make it as smooth and welcoming as possible for your family.' },
  { name: 'step1_title', type: 'TEXT', default: 'Initial Inquiry' },
  { name: 'step1_description', type: 'TEXT', default: 'Submit an online inquiry form or visit our school to learn more about our programs and facilities.' },
  { name: 'step2_title', type: 'TEXT', default: 'Application Submission' },
  { name: 'step2_description', type: 'TEXT', default: 'Complete the formal application form and provide necessary documents including birth certificates and previous transcripts.' },
  { name: 'step3_title', type: 'TEXT', default: 'Assessment & Interview' },
  { name: 'step3_description', type: 'TEXT', default: 'Prospective students participate in a friendly placement assessment, followed by a family interview with our heads of department.' },
  { name: 'step4_title', type: 'TEXT', default: 'Enrollment & Orientation' },
  { name: 'step4_description', type: 'TEXT', default: 'Upon acceptance, secure the spot by paying the enrollment fee and attending our comprehensive new student orientation.' },

  // Fee Schedule Section (22 fields)
  { name: 'fee_section_badge', type: 'TEXT', default: 'Investment in Excellence' },
  { name: 'fee_section_title', type: 'TEXT', default: 'Transparent Fee Schedule' },
  { name: 'fee_section_description', type: 'TEXT', default: 'We believe in providing world-class education at accessible rates. Our fee structure is comprehensive and includes tuition, essential learning materials, and co-curricular activities.' },
  { name: 'fee_value_prop1', type: 'TEXT', default: 'All-inclusive Tuition' },
  { name: 'fee_value_prop2', type: 'TEXT', default: 'Flexible Payment Plans' },
  { name: 'fee_value_prop3', type: 'TEXT', default: 'Sibling Discounts Available' },
  { name: 'fee_table_year', type: 'TEXT', default: '2026' },
  { name: 'fee_early_years_enrollment', type: 'TEXT', default: 'KES 15,000' },
  { name: 'fee_early_years_tuition', type: 'TEXT', default: 'KES 45,000' },
  { name: 'fee_lower_primary_enrollment', type: 'TEXT', default: 'KES 20,000' },
  { name: 'fee_lower_primary_tuition', type: 'TEXT', default: 'KES 55,000' },
  { name: 'fee_upper_primary_enrollment', type: 'TEXT', default: 'KES 20,000' },
  { name: 'fee_upper_primary_tuition', type: 'TEXT', default: 'KES 65,000' },
  { name: 'fee_junior_secondary_enrollment', type: 'TEXT', default: 'KES 25,000' },
  { name: 'fee_junior_secondary_tuition', type: 'TEXT', default: 'KES 85,000' },
  { name: 'fee_boarding_enrollment', type: 'TEXT', default: 'N/A' },
  { name: 'fee_boarding_tuition', type: 'TEXT', default: 'KES 35,000' },
  { name: 'fee_structure_json', type: 'TEXT', default: '{}' },
  { name: 'fee_note_text', type: 'TEXT', default: 'Enrollment fees are one-time and non-refundable. Boarding fees are inclusive of meals, laundry, and 24/7 care. Fees are subject to review annually.' },

  // FAQ Section (11 fields)
  { name: 'faq_section_title', type: 'TEXT', default: 'Frequently Asked Questions' },
  { name: 'faq_section_subtitle', type: 'TEXT', default: 'Find quick answers to common questions regarding admissions, documents, and student life.' },
  { name: 'faq1_question', type: 'TEXT', default: 'When does the academic year begin at Tumaini?' },
  { name: 'faq1_answer', type: 'TEXT', default: 'Our academic year follows the Kenyan Ministry of Education calendar, starting in January with Term 1, May for Term 2, and September for Term 3. We accept rolling admissions where vacancies exist.' },
  { name: 'faq2_question', type: 'TEXT', default: 'What documents are required for the application?' },
  { name: 'faq2_answer', type: 'TEXT', default: 'Required documents include a copy of the child\'s birth certificate, recent passport-sized photos, academic transcripts or report cards from the previous school, and health/immunization records.' },
  { name: 'faq3_question', type: 'TEXT', default: 'Do you offer scholarships or financial aid?' },
  { name: 'faq3_answer', type: 'TEXT', default: 'Yes, we provide need-based and merit-based financial aid for deserving learners, as well as full residential sponsorships through our Children\'s Home initiative.' },
  { name: 'faq4_question', type: 'TEXT', default: 'What is the teacher-to-student ratio?' },
  { name: 'faq4_answer', type: 'TEXT', default: 'We maintain an optimal ratio of approximately 1:20 to ensure personalized attention, individual mentorship, and holistic development for every learner.' },
  { name: 'faq5_question', type: 'TEXT', default: 'Are there transport services available?' },
  { name: 'faq5_answer', type: 'TEXT', default: 'Yes, we operate safe and monitored school vans routes across Soy and surrounding areas with designated pick-up and drop-off points.' },

  // CTA Section (3 fields)
  { name: 'cta_title', type: 'TEXT', default: 'Ready to Join the Tumaini Family?' },
  { name: 'cta_description', type: 'TEXT', default: 'Application for the next academic term is currently open. Secure your child\'s place today.' },
  { name: 'cta_button1_text', type: 'TEXT', default: 'Start Online Application' },
  { name: 'cta_button2_text', type: 'TEXT', default: 'Book a School Tour' }
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

  console.log('Checking and adding columns to "admissions" table...\n');

  for (const column of newColumns) {
    try {
      const exists = await columnExists('admissions', column.name);
      
      if (exists) {
        console.log(`⊘ Skipped (already exists): ${column.name}`);
        skippedCount++;
      } else {
        await addColumn('admissions', column.name, column.type, column.default);
        addedCount++;
      }
    } catch (err) {
      console.error(`✗ Error adding ${column.name}:`, err.message);
      errorCount++;
    }
  }

  await new Promise((resolve, reject) => {
    db.run(`UPDATE admissions SET fee_table_year = '2026' WHERE fee_table_year = '2024'`, [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total columns to process: ${newColumns.length}`);
  console.log(`✓ Added: ${addedCount}`);
  console.log(`⊘ Skipped: ${skippedCount}`);
  console.log(`✗ Errors: ${errorCount}`);
  console.log('='.repeat(60) + '\n');

  if (errorCount === 0) {
    console.log('✓ Admissions page migration completed successfully!\n');
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
