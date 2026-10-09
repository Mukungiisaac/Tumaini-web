-- Tumaini CMS - PostgreSQL Migration Script
-- Generated: 2026-10-09T12:38:11.509Z
-- Migrate from SQLite to Supabase (PostgreSQL)

-- ==============================================
-- IMPORTANT: Run this in Supabase SQL Editor
-- ==============================================

-- Table: about
CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  history TEXT,
  description TEXT,
  mission TEXT,
  vision TEXT,
  core_values TEXT,
  leadership_info TEXT,
  images TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  hero_badge_text1 TEXT DEFAULT 'Established 2010',
  hero_badge_text2 TEXT DEFAULT 'Motto: Knowledge is Power',
  hero_title_line1 TEXT DEFAULT 'Nurturing Minds,',
  hero_title_line2 TEXT DEFAULT 'Transforming Futures',
  hero_description TEXT DEFAULT 'Tumaini Comprehensive School is more than just an educational institution. We are a community dedicated to academic excellence, moral integrity, and the compassionate care of our residential children.',
  hero_image TEXT DEFAULT 'assets/images/about-hero.jpg',
  mission_title TEXT DEFAULT 'Our Mission',
  mission_description TEXT DEFAULT 'To provide and advance holistic quality education which develops everyone to be earnest seekers of truth and be adequately equipped with appropriate knowledge and attitudes for service to God and humanity.',
  vision_title TEXT DEFAULT 'Our Vision',
  vision_description TEXT DEFAULT 'To be a leading Centre of excellence in learning and produce world class individuals equipped with moral virtues.',
  values_title TEXT DEFAULT 'Our Motto & Values',
  values_motto TEXT DEFAULT 'Knowledge is power',
  values_item1 TEXT DEFAULT 'Moral Virtues & Truth',
  values_item2 TEXT DEFAULT 'Holistic Excellence',
  values_item3 TEXT DEFAULT 'Service to God & Humanity',
  values_item4 TEXT DEFAULT 'Compassion & Community',
  timeline_section_title TEXT DEFAULT 'A Legacy of Growth',
  timeline_intro TEXT DEFAULT 'Our journey began with a simple belief: that every child in Kenya deserves an education that challenges the mind and nurtures the soul. Over the years, our campus has grown from a single classroom into a comprehensive environment that includes residential facilities, modern labs, and vast green spaces.',
  timeline_year1 TEXT DEFAULT '2010',
  timeline_title1 TEXT DEFAULT 'The Beginning',
  timeline_desc1 TEXT DEFAULT 'Tumaini was founded as a small community center with 15 students.',
  timeline_year2 TEXT DEFAULT '2012',
  timeline_title2 TEXT DEFAULT 'Residential Wing',
  timeline_desc2 TEXT DEFAULT 'The Children''s Home was established to provide a safe haven for vulnerable youth.',
  timeline_year3 TEXT DEFAULT '2016',
  timeline_title3 TEXT DEFAULT 'School Expansion',
  timeline_desc3 TEXT DEFAULT 'Completion of the junior secondary wing and modern computer laboratories.',
  timeline_year4 TEXT DEFAULT '2021',
  timeline_title4 TEXT DEFAULT 'National Recognition',
  timeline_desc4 TEXT DEFAULT 'Awarded ''Most Improved Educational Institution'' in the Sub County.',
  campus_image TEXT DEFAULT 'assets/images/about-campus.jpg',
  campus_badge_number TEXT DEFAULT '500+',
  campus_badge_text TEXT DEFAULT 'Happy students currently enrolled and thriving in our community.',
  leadership_section_title TEXT DEFAULT 'Our Dedicated Leadership',
  leadership_intro TEXT DEFAULT 'Meet the passionate educators and administrators who steer our vision and ensure the highest standards of care and learning.',
  leader1_image TEXT DEFAULT 'assets/images/leader-sarah.jpg',
  leader1_name TEXT DEFAULT 'Dr. Sarah Mbeki',
  leader1_title TEXT DEFAULT 'Principal & Founder',
  leader1_bio TEXT DEFAULT 'With over 20 years in education, Dr. Sarah founded Tumaini to bridge the gap in quality learning for the community.',
  leader2_image TEXT DEFAULT 'assets/images/leader-james.jpg',
  leader2_name TEXT DEFAULT 'Mr. James Ochieng',
  leader2_title TEXT DEFAULT 'Head Administrator',
  leader2_bio TEXT DEFAULT 'James oversees operations, ensuring that both the school and children''s home function with excellence and care.',
  leader3_image TEXT DEFAULT 'assets/images/leader-amina.jpg',
  leader3_name TEXT DEFAULT 'Ms. Amina Yusuf',
  leader3_title TEXT DEFAULT 'Director of Academics',
  leader3_bio TEXT DEFAULT 'Amina leads our curriculum development, focusing on holistic growth and 21st-century skills for every student.',
  certification_title TEXT DEFAULT 'Certified Excellence',
  certification_description TEXT DEFAULT 'Tumaini Comprehensive is fully accredited by the Ministry of Education, Science, and Technology. Our residential home is licensed and inspected regularly to ensure the highest safety and care standards.',
  cert_badge1 TEXT DEFAULT 'KICD APPROVED',
  cert_badge2 TEXT DEFAULT 'CERTIFIED SAFE HAVEN',
  cert_item1 TEXT DEFAULT 'K-12 Education Licensing',
  cert_item2 TEXT DEFAULT 'Child Safety Certification',
  cert_item3 TEXT DEFAULT 'Modern Lab Safety Cert',
  cert_item4 TEXT DEFAULT 'Nutrition & Health Award',
  cta_title TEXT DEFAULT 'Ready to join the Tumaini Family?',
  cta_description TEXT DEFAULT 'Whether you are looking to enroll your child or want to support our mission, we would love to hear from you.',
  cta_button1_text TEXT DEFAULT 'Apply Now',
  cta_button2_text TEXT DEFAULT 'Visit Our Campus'
);

-- Enable Row Level Security
ALTER TABLE about ENABLE ROW LEVEL SECURITY;

-- Table: contact
CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  phone_primary TEXT,
  phone_secondary TEXT,
  email_primary TEXT,
  email_secondary TEXT,
  physical_address TEXT,
  office_hours TEXT,
  social_media TEXT,
  google_maps_link TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- Table: gallery_categories
CREATE TABLE IF NOT EXISTS gallery_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;

-- Table: gallery_images
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category_id INTEGER,
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Table: get_involved
CREATE TABLE IF NOT EXISTS get_involved (
  id SERIAL PRIMARY KEY,
  donation_info TEXT,
  volunteer_info TEXT,
  partnership_info TEXT,
  sponsorship_info TEXT,
  support_ways TEXT,
  donation_instructions TEXT,
  contact_info TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE get_involved ENABLE ROW LEVEL SECURITY;

-- Table: homepage
CREATE TABLE IF NOT EXISTS homepage (
  id SERIAL PRIMARY KEY,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  hero_social_proof_text TEXT DEFAULT 'Join 450+ students on their journey to excellence',
  stat_students_label TEXT DEFAULT 'Empowered Students',
  stat_pass_rate_label TEXT DEFAULT 'Examination Pass Rate',
  stat_children_label TEXT DEFAULT 'Children in Residence',
  stat_awards_label TEXT DEFAULT 'Co-Curricular Awards',
  holistic_badge TEXT DEFAULT 'Our Foundation',
  holistic_title TEXT DEFAULT 'A Holistic Approach to Learning and Living',
  holistic_description TEXT DEFAULT 'At Tumaini, we believe that education is more than just textbooks. It is about providing a safe, nurturing environment where every child feels valued, supported, and inspired to reach their full potential.',
  holistic_feature_1 TEXT DEFAULT 'Nationally recognized academic curriculum',
  holistic_feature_2 TEXT DEFAULT 'Safe and modern residential housing facilities',
  holistic_feature_3 TEXT DEFAULT 'Holistic character development and mentorship',
  holistic_feature_4 TEXT DEFAULT 'Thriving sports and arts programs',
  holistic_button_text TEXT DEFAULT 'Explore Our Programs',
  holistic_button_link TEXT DEFAULT '/about.html',
  holistic_image TEXT DEFAULT 'assets/images/in-class.png',
  holistic_badge_top TEXT DEFAULT 'Quality Education',
  holistic_badge_bottom TEXT DEFAULT 'Since 2010',
  pillars_title TEXT DEFAULT 'Pillars of Our Excellence',
  pillars_subtitle TEXT DEFAULT 'We provide a comprehensive ecosystem designed to support the growth of our students academically, physically, and emotionally.',
  pillar_1_title TEXT DEFAULT 'Academic Rigor',
  pillar_1_description TEXT DEFAULT 'Our curriculum is designed to challenge students while providing the support they need to succeed in national examinations and beyond.',
  pillar_2_title TEXT DEFAULT 'Residential Care',
  pillar_2_description TEXT DEFAULT 'A home away from home. Our residential facilities provide a safe, clean, and nurturing environment for children to live and grow.',
  pillar_3_title TEXT DEFAULT 'Community Impact',
  pillar_3_description TEXT DEFAULT 'We believe in the power of community. Our students are encouraged to engage with and give back to the local society.',
  news_section_title TEXT DEFAULT 'Latest from Our School',
  news_section_subtitle TEXT DEFAULT 'Stay updated with the vibrant life at Tumaini—from academic milestones to exciting sports events and community projects.',
  news_section_button_text TEXT DEFAULT 'View All News',
  testimonial_quote TEXT DEFAULT 'Tumaini didn''t just give my daughter an education; they gave her a future she never thought possible. The teachers truly care about the soul of the child, not just their grades.',
  testimonial_author TEXT DEFAULT 'Sarah Mwikali',
  testimonial_author_title TEXT DEFAULT 'Parent of Class 8 Graduate',
  testimonial_author_image TEXT DEFAULT 'assets/images/testimonial-sarah.jpg',
  cta_title TEXT DEFAULT 'Invest in the Leaders of Tomorrow',
  cta_description TEXT DEFAULT 'Whether you are a prospective parent, a community partner, or a donor, there are many ways to be part of the Tumaini story. Join us today.',
  cta_button_1_text TEXT DEFAULT 'Apply for Admission',
  cta_button_1_link TEXT DEFAULT '/admissions.html',
  cta_button_2_text TEXT DEFAULT 'Partner with Us',
  cta_button_2_link TEXT DEFAULT '/contact.html'
);

-- Enable Row Level Security
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;

-- Table: news
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  featured_image TEXT,
  category TEXT,
  author TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  publication_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  page_badge TEXT DEFAULT 'Campus Chronicles & Announcements',
  page_title TEXT DEFAULT 'Stories of Growth, Joy & Community at Tumaini',
  page_description TEXT DEFAULT 'Follow the latest milestones from our classrooms, residential care community, co-curricular tournaments, and community outreach programmes.',
  stat1_value TEXT DEFAULT '100%',
  stat1_label TEXT DEFAULT 'CBC & KPSEA Pass Rate',
  stat2_value TEXT DEFAULT '70+',
  stat2_label TEXT DEFAULT 'Children in Residential Care',
  stat3_value TEXT DEFAULT '15+',
  stat3_label TEXT DEFAULT 'Co-Curricular Clubs & Sports',
  stat4_value TEXT DEFAULT '2026',
  stat4_label TEXT DEFAULT 'Term 2 Admissions Open'
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Table: news_page_settings
CREATE TABLE IF NOT EXISTS news_page_settings (
  id SERIAL PRIMARY KEY,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  content_json TEXT DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE news_page_settings ENABLE ROW LEVEL SECURITY;

-- Table: settings
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  setting_key TEXT NOT NULL,
  setting_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Table: users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'admin',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Table: admissions
CREATE TABLE IF NOT EXISTS admissions (
  id SERIAL PRIMARY KEY,
  description TEXT,
  requirements TEXT,
  available_classes TEXT,
  instructions TEXT,
  important_dates TEXT,
  documents TEXT,
  application_links TEXT,
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  hero_badge TEXT DEFAULT 'Admissions 2024/2025',
  hero_title_line1 TEXT DEFAULT 'Your Child''s Future',
  hero_title_line2 TEXT DEFAULT 'Starts Here',
  hero_description TEXT DEFAULT 'Join a community where academic excellence meets nurturing care. We are now accepting applications for all grades. Empower your child with a holistic education rooted in values.',
  hero_button1_text TEXT DEFAULT 'Apply Now',
  hero_button2_text TEXT DEFAULT 'Download Prospectus',
  hero_image TEXT DEFAULT 'assets/images/admissions-hero.jpg',
  process_section_title TEXT DEFAULT 'Simple 4-Step Process',
  process_section_subtitle TEXT DEFAULT 'We''ve streamlined our admission process to make it as smooth and welcoming as possible for your family.',
  step1_title TEXT DEFAULT 'Initial Inquiry',
  step1_description TEXT DEFAULT 'Submit an online inquiry form or visit our school to learn more about our programs and facilities.',
  step2_title TEXT DEFAULT 'Application Submission',
  step2_description TEXT DEFAULT 'Complete the formal application form and provide necessary documents including birth certificates and previous transcripts.',
  step3_title TEXT DEFAULT 'Assessment & Interview',
  step3_description TEXT DEFAULT 'Prospective students participate in a friendly placement assessment, followed by a family interview with our heads of department.',
  step4_title TEXT DEFAULT 'Enrollment & Orientation',
  step4_description TEXT DEFAULT 'Upon acceptance, secure the spot by paying the enrollment fee and attending our comprehensive new student orientation.',
  fee_section_badge TEXT DEFAULT 'Investment in Excellence',
  fee_section_title TEXT DEFAULT 'Transparent Fee Schedule',
  fee_section_description TEXT DEFAULT 'We believe in providing world-class education at accessible rates. Our fee structure is comprehensive and includes tuition, essential learning materials, and co-curricular activities.',
  fee_value_prop1 TEXT DEFAULT 'All-inclusive Tuition',
  fee_value_prop2 TEXT DEFAULT 'Flexible Payment Plans',
  fee_value_prop3 TEXT DEFAULT 'Sibling Discounts Available',
  fee_table_year TEXT DEFAULT '2024',
  fee_early_years_enrollment TEXT DEFAULT 'KES 15,000',
  fee_early_years_tuition TEXT DEFAULT 'KES 45,000',
  fee_lower_primary_enrollment TEXT DEFAULT 'KES 20,000',
  fee_lower_primary_tuition TEXT DEFAULT 'KES 55,000',
  fee_upper_primary_enrollment TEXT DEFAULT 'KES 20,000',
  fee_upper_primary_tuition TEXT DEFAULT 'KES 65,000',
  fee_junior_secondary_enrollment TEXT DEFAULT 'KES 25,000',
  fee_junior_secondary_tuition TEXT DEFAULT 'KES 85,000',
  fee_boarding_enrollment TEXT DEFAULT 'N/A',
  fee_boarding_tuition TEXT DEFAULT 'KES 35,000',
  fee_note_text TEXT DEFAULT 'Enrollment fees are one-time and non-refundable. Boarding fees are inclusive of meals, laundry, and 24/7 care. Fees are subject to review annually.',
  faq_section_title TEXT DEFAULT 'Frequently Asked Questions',
  faq_section_subtitle TEXT DEFAULT 'Find quick answers to common questions regarding admissions, documents, and student life.',
  faq1_question TEXT DEFAULT 'When does the academic year begin at Tumaini?',
  faq1_answer TEXT DEFAULT 'Our academic year follows the Kenyan Ministry of Education calendar, starting in January with Term 1, May for Term 2, and September for Term 3. We accept rolling admissions where vacancies exist.',
  faq2_question TEXT DEFAULT 'What documents are required for the application?',
  faq2_answer TEXT DEFAULT 'Required documents include a copy of the child''s birth certificate, recent passport-sized photos, academic transcripts or report cards from the previous school, and health/immunization records.',
  faq3_question TEXT DEFAULT 'Do you offer scholarships or financial aid?',
  faq3_answer TEXT DEFAULT 'Yes, we provide need-based and merit-based financial aid for deserving learners, as well as full residential sponsorships through our Children''s Home initiative.',
  faq4_question TEXT DEFAULT 'What is the teacher-to-student ratio?',
  faq4_answer TEXT DEFAULT 'We maintain an optimal ratio of approximately 1:20 to ensure personalized attention, individual mentorship, and holistic development for every learner.',
  faq5_question TEXT DEFAULT 'Are there transport services available?',
  faq5_answer TEXT DEFAULT 'Yes, we operate safe and monitored school vans routes across Soy and surrounding areas with designated pick-up and drop-off points.',
  cta_title TEXT DEFAULT 'Ready to Join the Tumaini Family?',
  cta_description TEXT DEFAULT 'Application for the next academic term is currently open. Secure your child''s place today.',
  cta_button1_text TEXT DEFAULT 'Start Online Application',
  cta_button2_text TEXT DEFAULT 'Book a School Tour',
  fee_structure_json TEXT DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Table: children_home
CREATE TABLE IF NOT EXISTS children_home (
  id SERIAL PRIMARY KEY,
  description TEXT,
  programmes TEXT,
  activities TEXT,
  impact_info TEXT,
  statistics TEXT,
  support_ways TEXT,
  images TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE children_home ENABLE ROW LEVEL SECURITY;

-- Table: childrens_home
CREATE TABLE IF NOT EXISTS childrens_home (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  hero_image TEXT DEFAULT 'assets/images/enviroment.jpg',
  hero_badge_title TEXT DEFAULT 'Safe Family Environment',
  hero_badge_subtitle TEXT DEFAULT 'Loving caregivers & 24/7 dedicated supervision',
  hero_badge_tag TEXT DEFAULT '100% Safe',
  hero_card_badge TEXT DEFAULT 'Residential Care',
  hero_heading_line1 TEXT DEFAULT 'A Nurturing Home for',
  hero_heading_line2 TEXT DEFAULT 'Every Child',
  hero_description TEXT DEFAULT '',
  hero_button1_text TEXT DEFAULT 'Apply for Residency',
  hero_button2_text TEXT DEFAULT 'Sponsor a Child',
  hero_social_number TEXT DEFAULT '70+',
  hero_social_text TEXT DEFAULT '',
  stat1_number TEXT DEFAULT '70+',
  stat1_title TEXT DEFAULT 'Resident Children',
  stat1_description TEXT DEFAULT 'Safe housing and family-style dormitories',
  stat2_number TEXT DEFAULT '1,500+',
  stat2_title TEXT DEFAULT 'Daily Meals Served',
  stat2_description TEXT DEFAULT 'Nutritious, chef-prepared balanced diet',
  stat3_number TEXT DEFAULT '100%',
  stat3_title TEXT DEFAULT 'School Enrollment',
  stat3_description TEXT DEFAULT 'Full CBC primary & junior school access',
  stat4_number TEXT DEFAULT '24/7',
  stat4_title TEXT DEFAULT 'Professional Care',
  stat4_description TEXT DEFAULT 'Resident parents, nurses & counselors',
  care_section_badge TEXT DEFAULT 'Our Holistic Model',
  care_section_title TEXT DEFAULT 'Comprehensive Care & Development',
  care_section_description TEXT DEFAULT '',
  care1_image TEXT DEFAULT 'assets/images/care-academic.jpg',
  care1_badge TEXT DEFAULT 'Education',
  care1_title TEXT DEFAULT 'Academic & Skills Training',
  care1_description TEXT DEFAULT '',
  care2_image TEXT DEFAULT 'assets/images/food.jfif',
  care2_badge TEXT DEFAULT 'Nutrition',
  care2_title TEXT DEFAULT 'Nutritious Dining & Wellness',
  care2_description TEXT DEFAULT '',
  care3_image TEXT DEFAULT 'assets/images/care-health.jpg',
  care3_badge TEXT DEFAULT 'Health & Therapy',
  care3_title TEXT DEFAULT 'Healthcare & Counseling',
  care3_description TEXT DEFAULT '',
  safeguarding_image TEXT DEFAULT 'assets/images/safeguarding-art.jpg',
  safeguarding_badge TEXT DEFAULT 'Child Protection Standards',
  safeguarding_title TEXT DEFAULT 'Our Zero-Tolerance Safeguarding Policy',
  safeguarding_description TEXT DEFAULT '',
  safeguarding_point1 TEXT DEFAULT '',
  safeguarding_point2 TEXT DEFAULT '',
  safeguarding_point3 TEXT DEFAULT '',
  safeguarding_point4 TEXT DEFAULT '',
  sponsor_badge TEXT DEFAULT 'Sponsorship & Giving',
  sponsor_title TEXT DEFAULT 'Make a Lasting Impact Today',
  sponsor_description TEXT DEFAULT '',
  tier1_name TEXT DEFAULT 'Supporter',
  tier1_price TEXT DEFAULT 'KES 2,500',
  tier1_period TEXT DEFAULT '/ month',
  tier1_description TEXT DEFAULT '',
  tier1_button_text TEXT DEFAULT 'Sponsor as Supporter',
  tier2_name TEXT DEFAULT 'Guardian',
  tier2_price TEXT DEFAULT 'KES 7,500',
  tier2_period TEXT DEFAULT '/ month',
  tier2_description TEXT DEFAULT '',
  tier2_button_text TEXT DEFAULT 'Sponsor as Guardian',
  tier3_name TEXT DEFAULT 'Champion',
  tier3_price TEXT DEFAULT 'KES 15,000',
  tier3_period TEXT DEFAULT '/ month',
  tier3_description TEXT DEFAULT '',
  tier3_button_text TEXT DEFAULT 'Sponsor as Champion'
);

-- Enable Row Level Security
ALTER TABLE childrens_home ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- ROW LEVEL SECURITY POLICIES
-- ==============================================

-- Public read access for content tables
CREATE POLICY "Allow public read access" ON homepage
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON about
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON admissions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON childrens_home
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON news
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON gallery_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON contact
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON get_involved
  FOR SELECT USING (true);

-- Admin write access (requires authentication)
CREATE POLICY "Allow authenticated updates" ON homepage
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON about
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON admissions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON childrens_home
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON news
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON gallery_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON contact
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON get_involved
  FOR UPDATE USING (auth.role() = 'authenticated');

