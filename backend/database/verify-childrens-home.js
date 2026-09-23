/**
 * Verification Script: Children's Home CMS
 * Checks that database has correct default values matching public page
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'tumaini.db');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Verifying Children\'s Home database content...\n');

db.get('SELECT * FROM childrens_home WHERE id = 1', (err, row) => {
  if (err) {
    console.error('❌ Error querying database:', err.message);
    db.close();
    return;
  }

  if (!row) {
    console.error('❌ No record found with id=1');
    db.close();
    return;
  }

  console.log('✅ Record found (id=1)\n');
  
  // Check key fields
  const checks = [
    {
      field: 'hero_description',
      expected: 'Providing a safe, loving, and supportive residential community',
      value: row.hero_description
    },
    {
      field: 'hero_heading_line1',
      expected: 'A Nurturing Home for',
      value: row.hero_heading_line1
    },
    {
      field: 'hero_heading_line2',
      expected: 'Every Child',
      value: row.hero_heading_line2
    },
    {
      field: 'stat1_number',
      expected: '70+',
      value: row.stat1_number
    },
    {
      field: 'stat1_title',
      expected: 'Resident Children',
      value: row.stat1_title
    },
    {
      field: 'care_section_title',
      expected: 'Comprehensive Care & Development',
      value: row.care_section_title
    },
    {
      field: 'care_section_description',
      expected: 'We believe every child deserves comprehensive care',
      value: row.care_section_description
    },
    {
      field: 'safeguarding_title',
      expected: 'Our Zero-Tolerance Safeguarding Policy',
      value: row.safeguarding_title
    },
    {
      field: 'sponsor_title',
      expected: 'Make a Lasting Impact Today',
      value: row.sponsor_title
    },
    {
      field: 'tier1_name',
      expected: 'Supporter',
      value: row.tier1_name
    },
    {
      field: 'tier2_name',
      expected: 'Guardian',
      value: row.tier2_name
    },
    {
      field: 'tier3_name',
      expected: 'Champion',
      value: row.tier3_name
    }
  ];

  let passCount = 0;
  let failCount = 0;

  checks.forEach(check => {
    const matches = check.value && check.value.includes(check.expected);
    if (matches) {
      console.log(`✅ ${check.field}: OK`);
      passCount++;
    } else {
      console.log(`❌ ${check.field}: MISMATCH`);
      console.log(`   Expected (contains): "${check.expected}"`);
      console.log(`   Got: "${check.value}"`);
      failCount++;
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Passed: ${passCount}/${checks.length}`);
  console.log(`❌ Failed: ${failCount}/${checks.length}`);
  console.log('='.repeat(50));

  if (failCount === 0) {
    console.log('\n🎉 All fields verified successfully!');
    console.log('✅ Database content matches public page');
  } else {
    console.log('\n⚠️  Some fields need attention');
    console.log('💡 Values in database may need to be updated');
  }

  db.close();
});
