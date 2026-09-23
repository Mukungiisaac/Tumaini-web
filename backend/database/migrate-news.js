const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database/tumaini.db'));
const columns = [
  ['page_badge', 'Campus Chronicles & Announcements'],
  ['page_title', 'Stories of Growth, Joy & Community at Tumaini'],
  ['page_description', 'Follow the latest milestones from our classrooms, residential care community, co-curricular tournaments, and community outreach programmes.'],
  ['stat1_value', '100%'],
  ['stat1_label', 'CBC & KPSEA Pass Rate'],
  ['stat2_value', '70+'],
  ['stat2_label', 'Children in Residential Care'],
  ['stat3_value', '15+'],
  ['stat3_label', 'Co-Curricular Clubs & Sports'],
  ['stat4_value', '2026'],
  ['stat4_label', 'Term 2 Admissions Open']
];

const publicStories = [
  ['exciting-swimming-sessions-water-safety-classes', 'Exciting Swimming Sessions & Water Safety Classes Boost Pupil Fitness', 'Sports', 'Coach Kiprono', 'Our learners take part in structured swimming coaching and water safety awareness under certified instructors, promoting cardiovascular health, motor coordination, and self-confidence.', 'assets/images/image.png', '2026-02-28'],
  ['playtime-joy-recreational-play-emotional-healing', 'Playtime Joy: How Recreational Play Nurtures Emotional Healing', "Children's Home", 'Caregiving Team', 'Play is an essential component of child therapy and social development. Our upgraded playground and merry-go-round give resident children a safe space for joyful recreation and lasting bonding.', 'assets/images/merry-go.jfif', '2026-02-18'],
  ['principals-2026-address-expanding-horizons', "Principal's 2026 Address: Expanding Horizons, Anchored in Values", 'Leadership', 'Office of the Principal', 'Our School Principal outlines our commitment to holistic values-based education, expanding teacher mentoring, and fostering a loving, supportive sanctuary for every pupil.', 'assets/images/pres.jpg', '2026-02-04'],
  ['junior-school-inventors-science-innovation-expo', 'Junior School Inventors Shine at Annual CBC Science & Innovation Expo', 'Academics', 'Science Department', 'From solar-powered irrigation prototypes to organic bio-fertilizer models, our Grade 7 and 8 pupils presented practical solutions designed for Kenyan communities.', 'assets/images/news-science-fair.jpg', '2026-01-26'],
  ['read-to-lead-community-book-drive', 'Read to Lead: Community Book Drive Adds 1,500 Titles to Tumaini Library', 'Community', 'Library Council', 'Thanks to literacy partners and local donors, our school library has expanded its collection of early reader books, storybooks, and STEM encyclopedias.', 'assets/images/news-library.jpg', '2026-01-15'],
  ['tumaini-fc-sub-county-football-championship', 'Tumaini FC Lifts Sub-County Primary Schools Football Championship Trophy', 'Sports', 'Sports Department', 'In a thrilling final match ending in a 2-1 victory, the Tumaini Primary boys and girls soccer squads displayed grit, discipline, and sportsmanship to clinch gold.', 'assets/images/news-soccer.jpg', '2025-12-08'],
  ['global-bridges-international-volunteer-educators', 'Global Bridges: International Volunteer Educators Complete Inspiring Term at Tumaini', 'Community', 'Partnership Desk', 'Volunteer educators shared cross-cultural learning, music workshops, and specialized learning aids with our teachers and children.', 'assets/images/mzungu.jpg', '2025-11-20'],
  ['farm-to-plate-organic-garden-nutrition', 'Farm-to-Plate: How Our School Organic Garden Powers 300+ Nutritious Meals Daily', "Children's Home", 'Health Committee', 'Our sustainable agricultural project yields fresh spinach, kales, maize, and dairy, ensuring every child receives balanced, wholesome nutrition.', 'assets/images/food.jfif', '2025-10-30'],
  ['art-as-a-voice-expressive-arts-workshop', 'Art as a Voice: Children Express Resilience Through Expressive Arts Workshop', "Children's Home", 'Counselling Department', 'Under the guidance of child psychologists and art educators, our children created vibrant murals showcasing hope, healing, and their dreams for the future.', 'assets/images/safeguarding-art.jpg', '2025-10-14']
];

const existingPageContent = {
  featuredTitle: 'Tumaini Comprehensive Unveils New Digital Learning Hub & Science Innovation Laboratory',
  featuredDescription: 'Equipped with modern interactive screens, STEM experiment stations, and an extensive digital library, our new Innovation Hub ensures that every student develops 21st-century digital fluency and scientific inquiry skills.',
  featuredImage: 'assets/images/in-class.png',
  eventsTitle: 'Upcoming Campus Events & Important Dates',
  eventsDescription: 'Stay informed about important dates, school activities, and opportunities to join our campus community.',
  eventsImage: 'assets/images/school.jpg',
  newsletterTitle: "Stay Connected with Tumaini's Transforming Journey",
  newsletterDescription: "Subscribe to our quarterly newsletter for inspiring student stories, examination results, project updates from the Children's Home, and opportunities to make a tangible difference."
  ,event1: { month: 'APR', day: '18', badge: 'Public Invited', title: 'Annual Campus Open Day & Exhibition', time: '8:30 AM - 3:00 PM', location: 'Main Grounds', description: 'Prospective parents, community leaders, and friends of Tumaini tour our classrooms, meet teachers, and view pupil science displays.' },
  event2: { month: 'MAY', day: '09', badge: 'Sports Event', title: 'Inter-House Athletics & Track Gala', time: '9:00 AM - 4:00 PM', location: 'Sports Complex', description: 'A day filled with sprinting, relay races, swimming contests, and family fun as our houses compete for the Tumaini Trophy.' },
  event3: { month: 'JUN', day: '20', badge: 'Community Outreach', title: 'Free Community Medical & Dental Camp', time: '8:00 AM - 5:00 PM', location: 'Health Centre', description: 'In partnership with visiting medical doctors and paediatric dentists, providing free check-ups, eye screenings, and medicine to the local neighbourhood.' }
};

function createSettingsTable() {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS news_page_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      page_badge TEXT,
      page_title TEXT,
      page_description TEXT,
      stat1_value TEXT,
      stat1_label TEXT,
      stat2_value TEXT,
      stat2_label TEXT,
      stat3_value TEXT,
      stat3_label TEXT,
      stat4_value TEXT,
      stat4_label TEXT,
      content_json TEXT DEFAULT '{}',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, error => error ? reject(error) : resolve());
  });
}

function seedSettings() {
  return new Promise((resolve, reject) => {
    const names = columns.map(([name]) => name).join(', ');
    const values = columns.map(() => '?').join(', ');
    db.run(`INSERT OR IGNORE INTO news_page_settings (id, ${names}) VALUES (1, ${values})`, columns.map(([, value]) => value), error => error ? reject(error) : resolve());
  });
}

function addContentColumn() {
  return new Promise(resolve => {
    db.run("ALTER TABLE news_page_settings ADD COLUMN content_json TEXT DEFAULT '{}'", () => resolve());
  });
}

function seedPublicStories() {
  return Promise.all(publicStories.map(story => new Promise((resolve, reject) => {
    db.run(`INSERT OR IGNORE INTO news (slug, title, category, author, content, featured_image, status, publication_date)
      VALUES (?, ?, ?, ?, ?, ?, 'published', ?)`, story, error => error ? reject(error) : resolve());
  })));
}

function seedExistingPageContent() {
  return new Promise((resolve, reject) => {
    db.get('SELECT content_json FROM news_page_settings WHERE id = 1', (readError, row) => {
      if (readError) return reject(readError);
      let current = {};
      try { current = JSON.parse(row && row.content_json || '{}'); } catch (error) { current = {}; }
      const merged = { ...existingPageContent, ...current };
      db.run('UPDATE news_page_settings SET content_json = ? WHERE id = 1', [JSON.stringify(merged)], error => error ? reject(error) : resolve());
    });
  });
}

function getColumns() {
  return new Promise((resolve, reject) => {
    db.all('PRAGMA table_info(news)', (error, rows) => error ? reject(error) : resolve(rows.map(row => row.name)));
  });
}

function addColumn(name, value) {
  return new Promise((resolve, reject) => {
    const escapedValue = value.replace(/'/g, "''");
    db.run(`ALTER TABLE news ADD COLUMN ${name} TEXT DEFAULT '${escapedValue}'`, error => error ? reject(error) : resolve());
  });
}

(async () => {
  try {
    await createSettingsTable();
    await addContentColumn();
    await seedSettings();
    await seedExistingPageContent();
    const existing = await getColumns();
    for (const [name, value] of columns) {
      if (!existing.includes(name)) {
        await addColumn(name, value);
        console.log(`Added ${name}`);
      }
    }
    await seedPublicStories();
    console.log(`Imported ${publicStories.length} public stories when missing.`);
    console.log('News page migration complete.');
  } catch (error) {
    console.error('News migration failed:', error.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
})();
