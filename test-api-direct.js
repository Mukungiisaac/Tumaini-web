// Direct API test without network call
const { getQuery } = require('./backend/database/init');

console.log('🔍 Testing database query directly...\n');

(async () => {
  try {
    const data = await getQuery('SELECT * FROM childrens_home WHERE id = 1');
    
    if (!data) {
      console.log('❌ No data returned from query');
      return;
    }
    
    console.log('✅ Query successful!');
    console.log(`📊 Fields returned: ${Object.keys(data).length}`);
    console.log('\n📋 Sample data:');
    console.log(`   hero_heading_line1: "${data.hero_heading_line1}"`);
    console.log(`   hero_heading_line2: "${data.hero_heading_line2}"`);
    console.log(`   stat1_number: "${data.stat1_number}"`);
    console.log(`   stat1_title: "${data.stat1_title}"`);
    console.log(`   tier1_name: "${data.tier1_name}"`);
    console.log(`   tier2_name: "${data.tier2_name}"`);
    console.log(`   tier3_name: "${data.tier3_name}"`);
    
    console.log('\n✅ Database query works correctly!');
    console.log('\n💡 If admin page shows "Failed to load data":');
    console.log('   1. Restart backend server: cd backend && npm start');
    console.log('   2. Check backend is on port 3001');
    console.log('   3. Check browser console for CORS or network errors');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
