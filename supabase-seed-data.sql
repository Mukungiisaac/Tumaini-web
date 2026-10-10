-- Tumaini CMS - Seed Data Script
-- Run this in Supabase SQL Editor to populate tables with initial data
-- This will allow editors to load and modify content

-- ==============================================
-- INSERT INITIAL DATA
-- ==============================================

-- Homepage Data
INSERT INTO homepage (id, hero_image, hero_badge, hero_title, hero_description) VALUES
(1, 
 'assets/images/home-hero.jpg',
 'Established 2010',
 'Empowering Young Minds in Kenya',
 'Tumaini Comprehensive School provides quality education and residential care in a nurturing Christian environment.'
)
ON CONFLICT (id) DO NOTHING;

-- About Page Data
INSERT INTO about (id, history, mission, vision, core_values) VALUES
(1,
 'Tumaini Comprehensive School was founded in 2010 to provide quality education to children in our community.',
 'To provide and advance holistic quality education which develops everyone to be earnest seekers of truth.',
 'To be a leading Centre of excellence in learning and produce world class individuals equipped with moral virtues.',
 'Moral Virtues, Truth, Excellence, Service to God and Humanity'
)
ON CONFLICT (id) DO NOTHING;

-- Admissions Data
INSERT INTO admissions (id, description, requirements, available_classes, instructions) VALUES
(1,
 'We welcome applications for all grades from Early Years to Junior Secondary.',
 'Birth certificate, previous school reports, passport photos, immunization records.',
 'Pre-Primary, Grade 1-6, Grade 7-9',
 'Submit online application form or visit our admissions office. Applications are reviewed within 2 weeks.'
)
ON CONFLICT (id) DO NOTHING;

-- Children's Home Data
INSERT INTO childrens_home (id, hero_description, hero_social_text, care_section_description, 
                            care1_description, care2_description, care3_description,
                            safeguarding_description, safeguarding_point1, safeguarding_point2,
                            safeguarding_point3, safeguarding_point4,
                            sponsor_description, tier1_description, tier2_description, tier3_description) VALUES
(1,
 'Our residential children''s home provides a safe, loving environment for vulnerable children. With professional caregivers, nutritious meals, and access to quality education, we create a family atmosphere where every child can thrive.',
 'children currently under our care with access to education, healthcare, and a loving community',
 'We provide comprehensive support addressing every aspect of child development - from education and nutrition to healthcare and emotional wellbeing.',
 'All resident children are enrolled in our on-campus school and receive tutoring support, learning materials, and skills training to prepare them for their future.',
 'Three balanced meals daily prepared by professional chefs, focusing on nutrition and growth. Special dietary needs are accommodated with care.',
 'Regular health checkups, access to medical care, counseling services, and psychosocial support to ensure holistic wellbeing.',
 'We maintain the highest standards of child protection with trained staff, secure facilities, and strict protocols to ensure every child is safe and protected.',
 'Background checks for all staff and volunteers',
 'Ratio of 1 caregiver to every 10 children',
 'Regular training on child protection policies',
 'Zero tolerance for any form of abuse or neglect',
 'Your sponsorship directly transforms lives. Choose a giving level that works for you and become part of a child''s success story.',
 'Provides meals, clothing, and basic supplies for one child',
 'Covers education, healthcare, and personal care for one child',
 'Full sponsorship including education, healthcare, meals, clothing, and enrichment activities'
)
ON CONFLICT (id) DO NOTHING;

-- Contact Information
INSERT INTO contact (id, phone_primary, email_primary, physical_address, office_hours) VALUES
(1,
 '+254 700 000 000',
 'info@tumainischool.ac.ke',
 'Tumaini Comprehensive School, Soy, Uasin Gishu County, Kenya',
 'Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM'
)
ON CONFLICT (id) DO NOTHING;

-- Get Involved Information
INSERT INTO get_involved (id, donation_info, volunteer_info, partnership_info, sponsorship_info) VALUES
(1,
 'Your donations help us provide quality education and care to vulnerable children. Every contribution makes a difference.',
 'We welcome volunteers with skills in education, healthcare, counseling, and administration. Contact us to learn about opportunities.',
 'Partner with us through corporate sponsorships, in-kind donations, or skills-based volunteering.',
 'Sponsor a child''s education and change their life. Sponsorships start from KES 2,500 per month.'
)
ON CONFLICT (id) DO NOTHING;

-- Gallery Categories
INSERT INTO gallery_categories (id, name, description) VALUES
(1, 'Campus Life', 'Daily life and activities on our campus'),
(2, 'Academic Excellence', 'Classroom learning and achievements'),
(3, 'Sports & Arts', 'Co-curricular activities and competitions'),
(4, 'Community Events', 'Special events and celebrations'),
(5, 'Children''s Home', 'Life in our residential care facility')
ON CONFLICT (id) DO NOTHING;

-- Sample Gallery Images (you'll need to add real images through the CMS)
INSERT INTO gallery_images (title, description, image_url, category_id, is_published) VALUES
('Welcome to Tumaini', 'Our school entrance and main building', 'assets/images/about-campus.jpg', 1, 1),
('Classroom Learning', 'Students engaged in interactive learning', 'assets/images/in-class.png', 2, 1),
('Sports Day 2024', 'Annual sports competition', 'assets/images/home-hero.jpg', 3, 1)
ON CONFLICT DO NOTHING;

-- Sample News Articles
INSERT INTO news (title, slug, featured_image, category, author, content, status, publication_date) VALUES
('Welcome to Term 1, 2026', 
 'welcome-term-1-2026',
 'assets/images/home-hero.jpg',
 'Announcements',
 'Admin',
 '<p>We are excited to welcome all students back for Term 1, 2026! This term promises exciting learning opportunities and new programs.</p><p>Our focus this term includes enhanced STEM education, sports programs, and character development initiatives.</p>',
 'published',
 CURRENT_TIMESTAMP),
 
('New Computer Lab Opening',
 'new-computer-lab-opening',
 'assets/images/about-campus.jpg',
 'Campus News',
 'Admin',
 '<p>We are proud to announce the opening of our new state-of-the-art computer laboratory with 30 modern workstations.</p><p>This facility will enhance our ICT curriculum and prepare students for the digital age.</p>',
 'published',
 CURRENT_TIMESTAMP - INTERVAL '7 days')
ON CONFLICT DO NOTHING;

-- Settings (key-value pairs for site-wide configuration)
INSERT INTO settings (setting_key, setting_value) VALUES
('site_name', 'Tumaini Comprehensive School'),
('site_tagline', 'Nurturing Minds, Transforming Futures'),
('enrollment_open', 'true'),
('current_term', 'Term 1, 2026'),
('student_count', '500'),
('residential_children', '70')
ON CONFLICT DO NOTHING;

-- ==============================================
-- VERIFICATION QUERIES
-- ==============================================

-- Run these to verify data was inserted:
SELECT 'Homepage records:' as table_name, COUNT(*) as count FROM homepage
UNION ALL
SELECT 'About records:', COUNT(*) FROM about
UNION ALL
SELECT 'Admissions records:', COUNT(*) FROM admissions
UNION ALL
SELECT 'Childrens Home records:', COUNT(*) FROM childrens_home
UNION ALL
SELECT 'Contact records:', COUNT(*) FROM contact
UNION ALL
SELECT 'Get Involved records:', COUNT(*) FROM get_involved
UNION ALL
SELECT 'Gallery Categories:', COUNT(*) FROM gallery_categories
UNION ALL
SELECT 'Gallery Images:', COUNT(*) FROM gallery_images
UNION ALL
SELECT 'News Articles:', COUNT(*) FROM news
UNION ALL
SELECT 'Settings:', COUNT(*) FROM settings;
