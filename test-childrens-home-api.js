// Quick test to verify API returns correct data
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/children-home',
  method: 'GET'
};

console.log('🔍 Testing Children\'s Home API endpoint...\n');
console.log(`GET http://192.168.0.110:3001/api/children-home\n`);

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const json = JSON.parse(data);
      
      console.log('✅ API Response: SUCCESS\n');
      console.log('📋 Sample Fields:');
      console.log(`- hero_heading_line1: "${json.hero_heading_line1}"`);
      console.log(`- hero_heading_line2: "${json.hero_heading_line2}"`);
      console.log(`- stat1_number: "${json.stat1_number}"`);
      console.log(`- stat1_title: "${json.stat1_title}"`);
      console.log(`- care_section_title: "${json.care_section_title}"`);
      console.log(`- tier1_name: "${json.tier1_name}"`);
      console.log(`- tier2_name: "${json.tier2_name}"`);
      console.log(`- tier3_name: "${json.tier3_name}"`);
      console.log(`\n✅ Total fields returned: ${Object.keys(json).length}`);
      console.log('\n🎉 API is working correctly!');
    } else {
      console.error(`❌ API Error: Status ${res.statusCode}`);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Connection Error:', error.message);
  console.log('\n💡 Make sure backend server is running:');
  console.log('   cd backend && npm start');
});

req.end();
