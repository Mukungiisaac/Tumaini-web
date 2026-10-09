# Current Database Schema Analysis

**Database:** SQLite → PostgreSQL (Supabase)
**Analysis Date:** 2026-10-09T12:38:11.485Z

---

## Tables Found: 14

### Table: `about`

**Columns:** 68

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| history | TEXT | NO | NULL | NO |
| description | TEXT | NO | NULL | NO |
| mission | TEXT | NO | NULL | NO |
| vision | TEXT | NO | NULL | NO |
| core_values | TEXT | NO | NULL | NO |
| leadership_info | TEXT | NO | NULL | NO |
| images | TEXT | NO | NULL | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| hero_badge_text1 | TEXT | NO | 'Established 2010' | NO |
| hero_badge_text2 | TEXT | NO | 'Motto: Knowledge is Power' | NO |
| hero_title_line1 | TEXT | NO | 'Nurturing Minds,' | NO |
| hero_title_line2 | TEXT | NO | 'Transforming Futures' | NO |
| hero_description | TEXT | NO | 'Tumaini Comprehensive School is more than just an educational institution. We are a community dedicated to academic excellence, moral integrity, and the compassionate care of our residential children.' | NO |
| hero_image | TEXT | NO | 'assets/images/about-hero.jpg' | NO |
| mission_title | TEXT | NO | 'Our Mission' | NO |
| mission_description | TEXT | NO | 'To provide and advance holistic quality education which develops everyone to be earnest seekers of truth and be adequately equipped with appropriate knowledge and attitudes for service to God and humanity.' | NO |
| vision_title | TEXT | NO | 'Our Vision' | NO |
| vision_description | TEXT | NO | 'To be a leading Centre of excellence in learning and produce world class individuals equipped with moral virtues.' | NO |
| values_title | TEXT | NO | 'Our Motto & Values' | NO |
| values_motto | TEXT | NO | 'Knowledge is power' | NO |
| values_item1 | TEXT | NO | 'Moral Virtues & Truth' | NO |
| values_item2 | TEXT | NO | 'Holistic Excellence' | NO |
| values_item3 | TEXT | NO | 'Service to God & Humanity' | NO |
| values_item4 | TEXT | NO | 'Compassion & Community' | NO |
| timeline_section_title | TEXT | NO | 'A Legacy of Growth' | NO |
| timeline_intro | TEXT | NO | 'Our journey began with a simple belief: that every child in Kenya deserves an education that challenges the mind and nurtures the soul. Over the years, our campus has grown from a single classroom into a comprehensive environment that includes residential facilities, modern labs, and vast green spaces.' | NO |
| timeline_year1 | TEXT | NO | '2010' | NO |
| timeline_title1 | TEXT | NO | 'The Beginning' | NO |
| timeline_desc1 | TEXT | NO | 'Tumaini was founded as a small community center with 15 students.' | NO |
| timeline_year2 | TEXT | NO | '2012' | NO |
| timeline_title2 | TEXT | NO | 'Residential Wing' | NO |
| timeline_desc2 | TEXT | NO | 'The Children''s Home was established to provide a safe haven for vulnerable youth.' | NO |
| timeline_year3 | TEXT | NO | '2016' | NO |
| timeline_title3 | TEXT | NO | 'School Expansion' | NO |
| timeline_desc3 | TEXT | NO | 'Completion of the junior secondary wing and modern computer laboratories.' | NO |
| timeline_year4 | TEXT | NO | '2021' | NO |
| timeline_title4 | TEXT | NO | 'National Recognition' | NO |
| timeline_desc4 | TEXT | NO | 'Awarded ''Most Improved Educational Institution'' in the Sub County.' | NO |
| campus_image | TEXT | NO | 'assets/images/about-campus.jpg' | NO |
| campus_badge_number | TEXT | NO | '500+' | NO |
| campus_badge_text | TEXT | NO | 'Happy students currently enrolled and thriving in our community.' | NO |
| leadership_section_title | TEXT | NO | 'Our Dedicated Leadership' | NO |
| leadership_intro | TEXT | NO | 'Meet the passionate educators and administrators who steer our vision and ensure the highest standards of care and learning.' | NO |
| leader1_image | TEXT | NO | 'assets/images/leader-sarah.jpg' | NO |
| leader1_name | TEXT | NO | 'Dr. Sarah Mbeki' | NO |
| leader1_title | TEXT | NO | 'Principal & Founder' | NO |
| leader1_bio | TEXT | NO | 'With over 20 years in education, Dr. Sarah founded Tumaini to bridge the gap in quality learning for the community.' | NO |
| leader2_image | TEXT | NO | 'assets/images/leader-james.jpg' | NO |
| leader2_name | TEXT | NO | 'Mr. James Ochieng' | NO |
| leader2_title | TEXT | NO | 'Head Administrator' | NO |
| leader2_bio | TEXT | NO | 'James oversees operations, ensuring that both the school and children''s home function with excellence and care.' | NO |
| leader3_image | TEXT | NO | 'assets/images/leader-amina.jpg' | NO |
| leader3_name | TEXT | NO | 'Ms. Amina Yusuf' | NO |
| leader3_title | TEXT | NO | 'Director of Academics' | NO |
| leader3_bio | TEXT | NO | 'Amina leads our curriculum development, focusing on holistic growth and 21st-century skills for every student.' | NO |
| certification_title | TEXT | NO | 'Certified Excellence' | NO |
| certification_description | TEXT | NO | 'Tumaini Comprehensive is fully accredited by the Ministry of Education, Science, and Technology. Our residential home is licensed and inspected regularly to ensure the highest safety and care standards.' | NO |
| cert_badge1 | TEXT | NO | 'KICD APPROVED' | NO |
| cert_badge2 | TEXT | NO | 'CERTIFIED SAFE HAVEN' | NO |
| cert_item1 | TEXT | NO | 'K-12 Education Licensing' | NO |
| cert_item2 | TEXT | NO | 'Child Safety Certification' | NO |
| cert_item3 | TEXT | NO | 'Modern Lab Safety Cert' | NO |
| cert_item4 | TEXT | NO | 'Nutrition & Health Award' | NO |
| cta_title | TEXT | NO | 'Ready to join the Tumaini Family?' | NO |
| cta_description | TEXT | NO | 'Whether you are looking to enroll your child or want to support our mission, we would love to hear from you.' | NO |
| cta_button1_text | TEXT | NO | 'Apply Now' | NO |
| cta_button2_text | TEXT | NO | 'Visit Our Campus' | NO |

### Table: `contact`

**Columns:** 10

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| phone_primary | TEXT | NO | NULL | NO |
| phone_secondary | TEXT | NO | NULL | NO |
| email_primary | TEXT | NO | NULL | NO |
| email_secondary | TEXT | NO | NULL | NO |
| physical_address | TEXT | NO | NULL | NO |
| office_hours | TEXT | NO | NULL | NO |
| social_media | TEXT | NO | NULL | NO |
| google_maps_link | TEXT | NO | NULL | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |

### Table: `gallery_categories`

**Columns:** 4

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| name | TEXT | YES | NULL | NO |
| description | TEXT | NO | NULL | NO |
| created_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |

### Table: `gallery_images`

**Columns:** 8

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| title | TEXT | YES | NULL | NO |
| description | TEXT | NO | NULL | NO |
| image_url | TEXT | YES | NULL | NO |
| category_id | INTEGER | NO | NULL | NO |
| is_published | INTEGER | NO | 1 | NO |
| created_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |

### Table: `get_involved`

**Columns:** 9

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| donation_info | TEXT | NO | NULL | NO |
| volunteer_info | TEXT | NO | NULL | NO |
| partnership_info | TEXT | NO | NULL | NO |
| sponsorship_info | TEXT | NO | NULL | NO |
| support_ways | TEXT | NO | NULL | NO |
| donation_instructions | TEXT | NO | NULL | NO |
| contact_info | TEXT | NO | NULL | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |

### Table: `homepage`

**Columns:** 52

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| hero_image | TEXT | NO | NULL | NO |
| hero_badge | TEXT | NO | NULL | NO |
| hero_title | TEXT | NO | NULL | NO |
| hero_description | TEXT | NO | NULL | NO |
| hero_button_primary | TEXT | NO | NULL | NO |
| hero_button_primary_link | TEXT | NO | NULL | NO |
| hero_button_secondary | TEXT | NO | NULL | NO |
| hero_button_secondary_link | TEXT | NO | NULL | NO |
| stat_students | TEXT | NO | NULL | NO |
| stat_pass_rate | TEXT | NO | NULL | NO |
| stat_children_residence | TEXT | NO | NULL | NO |
| stat_awards | TEXT | NO | NULL | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| hero_social_proof_text | TEXT | NO | 'Join 450+ students on their journey to excellence' | NO |
| stat_students_label | TEXT | NO | 'Empowered Students' | NO |
| stat_pass_rate_label | TEXT | NO | 'Examination Pass Rate' | NO |
| stat_children_label | TEXT | NO | 'Children in Residence' | NO |
| stat_awards_label | TEXT | NO | 'Co-Curricular Awards' | NO |
| holistic_badge | TEXT | NO | 'Our Foundation' | NO |
| holistic_title | TEXT | NO | 'A Holistic Approach to Learning and Living' | NO |
| holistic_description | TEXT | NO | 'At Tumaini, we believe that education is more than just textbooks. It is about providing a safe, nurturing environment where every child feels valued, supported, and inspired to reach their full potential.' | NO |
| holistic_feature_1 | TEXT | NO | 'Nationally recognized academic curriculum' | NO |
| holistic_feature_2 | TEXT | NO | 'Safe and modern residential housing facilities' | NO |
| holistic_feature_3 | TEXT | NO | 'Holistic character development and mentorship' | NO |
| holistic_feature_4 | TEXT | NO | 'Thriving sports and arts programs' | NO |
| holistic_button_text | TEXT | NO | 'Explore Our Programs' | NO |
| holistic_button_link | TEXT | NO | '/about.html' | NO |
| holistic_image | TEXT | NO | 'assets/images/in-class.png' | NO |
| holistic_badge_top | TEXT | NO | 'Quality Education' | NO |
| holistic_badge_bottom | TEXT | NO | 'Since 2010' | NO |
| pillars_title | TEXT | NO | 'Pillars of Our Excellence' | NO |
| pillars_subtitle | TEXT | NO | 'We provide a comprehensive ecosystem designed to support the growth of our students academically, physically, and emotionally.' | NO |
| pillar_1_title | TEXT | NO | 'Academic Rigor' | NO |
| pillar_1_description | TEXT | NO | 'Our curriculum is designed to challenge students while providing the support they need to succeed in national examinations and beyond.' | NO |
| pillar_2_title | TEXT | NO | 'Residential Care' | NO |
| pillar_2_description | TEXT | NO | 'A home away from home. Our residential facilities provide a safe, clean, and nurturing environment for children to live and grow.' | NO |
| pillar_3_title | TEXT | NO | 'Community Impact' | NO |
| pillar_3_description | TEXT | NO | 'We believe in the power of community. Our students are encouraged to engage with and give back to the local society.' | NO |
| news_section_title | TEXT | NO | 'Latest from Our School' | NO |
| news_section_subtitle | TEXT | NO | 'Stay updated with the vibrant life at Tumaini—from academic milestones to exciting sports events and community projects.' | NO |
| news_section_button_text | TEXT | NO | 'View All News' | NO |
| testimonial_quote | TEXT | NO | 'Tumaini didn''t just give my daughter an education; they gave her a future she never thought possible. The teachers truly care about the soul of the child, not just their grades.' | NO |
| testimonial_author | TEXT | NO | 'Sarah Mwikali' | NO |
| testimonial_author_title | TEXT | NO | 'Parent of Class 8 Graduate' | NO |
| testimonial_author_image | TEXT | NO | 'assets/images/testimonial-sarah.jpg' | NO |
| cta_title | TEXT | NO | 'Invest in the Leaders of Tomorrow' | NO |
| cta_description | TEXT | NO | 'Whether you are a prospective parent, a community partner, or a donor, there are many ways to be part of the Tumaini story. Join us today.' | NO |
| cta_button_1_text | TEXT | NO | 'Apply for Admission' | NO |
| cta_button_1_link | TEXT | NO | '/admissions.html' | NO |
| cta_button_2_text | TEXT | NO | 'Partner with Us' | NO |
| cta_button_2_link | TEXT | NO | '/contact.html' | NO |

### Table: `news`

**Columns:** 22

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| title | TEXT | YES | NULL | NO |
| slug | TEXT | YES | NULL | NO |
| featured_image | TEXT | NO | NULL | NO |
| category | TEXT | NO | NULL | NO |
| author | TEXT | NO | NULL | NO |
| content | TEXT | YES | NULL | NO |
| status | TEXT | NO | 'draft' | NO |
| publication_date | DATETIME | NO | NULL | NO |
| created_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| page_badge | TEXT | NO | 'Campus Chronicles & Announcements' | NO |
| page_title | TEXT | NO | 'Stories of Growth, Joy & Community at Tumaini' | NO |
| page_description | TEXT | NO | 'Follow the latest milestones from our classrooms, residential care community, co-curricular tournaments, and community outreach programmes.' | NO |
| stat1_value | TEXT | NO | '100%' | NO |
| stat1_label | TEXT | NO | 'CBC & KPSEA Pass Rate' | NO |
| stat2_value | TEXT | NO | '70+' | NO |
| stat2_label | TEXT | NO | 'Children in Residential Care' | NO |
| stat3_value | TEXT | NO | '15+' | NO |
| stat3_label | TEXT | NO | 'Co-Curricular Clubs & Sports' | NO |
| stat4_value | TEXT | NO | '2026' | NO |
| stat4_label | TEXT | NO | 'Term 2 Admissions Open' | NO |

### Table: `news_page_settings`

**Columns:** 14

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| page_badge | TEXT | NO | NULL | NO |
| page_title | TEXT | NO | NULL | NO |
| page_description | TEXT | NO | NULL | NO |
| stat1_value | TEXT | NO | NULL | NO |
| stat1_label | TEXT | NO | NULL | NO |
| stat2_value | TEXT | NO | NULL | NO |
| stat2_label | TEXT | NO | NULL | NO |
| stat3_value | TEXT | NO | NULL | NO |
| stat3_label | TEXT | NO | NULL | NO |
| stat4_value | TEXT | NO | NULL | NO |
| stat4_label | TEXT | NO | NULL | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| content_json | TEXT | NO | '{}' | NO |

### Table: `settings`

**Columns:** 4

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| setting_key | TEXT | YES | NULL | NO |
| setting_value | TEXT | NO | NULL | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |

### Table: `users`

**Columns:** 10

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| email | TEXT | YES | NULL | NO |
| username | TEXT | YES | NULL | NO |
| password | TEXT | YES | NULL | NO |
| first_name | TEXT | NO | NULL | NO |
| last_name | TEXT | NO | NULL | NO |
| role | TEXT | NO | 'admin' | NO |
| status | TEXT | NO | 'active' | NO |
| created_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |

### Table: `admissions`

**Columns:** 63

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| description | TEXT | NO | NULL | NO |
| requirements | TEXT | NO | NULL | NO |
| available_classes | TEXT | NO | NULL | NO |
| instructions | TEXT | NO | NULL | NO |
| important_dates | TEXT | NO | NULL | NO |
| documents | TEXT | NO | NULL | NO |
| application_links | TEXT | NO | NULL | NO |
| is_published | INTEGER | NO | 1 | NO |
| created_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| hero_badge | TEXT | NO | 'Admissions 2024/2025' | NO |
| hero_title_line1 | TEXT | NO | 'Your Child''s Future' | NO |
| hero_title_line2 | TEXT | NO | 'Starts Here' | NO |
| hero_description | TEXT | NO | 'Join a community where academic excellence meets nurturing care. We are now accepting applications for all grades. Empower your child with a holistic education rooted in values.' | NO |
| hero_button1_text | TEXT | NO | 'Apply Now' | NO |
| hero_button2_text | TEXT | NO | 'Download Prospectus' | NO |
| hero_image | TEXT | NO | 'assets/images/admissions-hero.jpg' | NO |
| process_section_title | TEXT | NO | 'Simple 4-Step Process' | NO |
| process_section_subtitle | TEXT | NO | 'We''ve streamlined our admission process to make it as smooth and welcoming as possible for your family.' | NO |
| step1_title | TEXT | NO | 'Initial Inquiry' | NO |
| step1_description | TEXT | NO | 'Submit an online inquiry form or visit our school to learn more about our programs and facilities.' | NO |
| step2_title | TEXT | NO | 'Application Submission' | NO |
| step2_description | TEXT | NO | 'Complete the formal application form and provide necessary documents including birth certificates and previous transcripts.' | NO |
| step3_title | TEXT | NO | 'Assessment & Interview' | NO |
| step3_description | TEXT | NO | 'Prospective students participate in a friendly placement assessment, followed by a family interview with our heads of department.' | NO |
| step4_title | TEXT | NO | 'Enrollment & Orientation' | NO |
| step4_description | TEXT | NO | 'Upon acceptance, secure the spot by paying the enrollment fee and attending our comprehensive new student orientation.' | NO |
| fee_section_badge | TEXT | NO | 'Investment in Excellence' | NO |
| fee_section_title | TEXT | NO | 'Transparent Fee Schedule' | NO |
| fee_section_description | TEXT | NO | 'We believe in providing world-class education at accessible rates. Our fee structure is comprehensive and includes tuition, essential learning materials, and co-curricular activities.' | NO |
| fee_value_prop1 | TEXT | NO | 'All-inclusive Tuition' | NO |
| fee_value_prop2 | TEXT | NO | 'Flexible Payment Plans' | NO |
| fee_value_prop3 | TEXT | NO | 'Sibling Discounts Available' | NO |
| fee_table_year | TEXT | NO | '2024' | NO |
| fee_early_years_enrollment | TEXT | NO | 'KES 15,000' | NO |
| fee_early_years_tuition | TEXT | NO | 'KES 45,000' | NO |
| fee_lower_primary_enrollment | TEXT | NO | 'KES 20,000' | NO |
| fee_lower_primary_tuition | TEXT | NO | 'KES 55,000' | NO |
| fee_upper_primary_enrollment | TEXT | NO | 'KES 20,000' | NO |
| fee_upper_primary_tuition | TEXT | NO | 'KES 65,000' | NO |
| fee_junior_secondary_enrollment | TEXT | NO | 'KES 25,000' | NO |
| fee_junior_secondary_tuition | TEXT | NO | 'KES 85,000' | NO |
| fee_boarding_enrollment | TEXT | NO | 'N/A' | NO |
| fee_boarding_tuition | TEXT | NO | 'KES 35,000' | NO |
| fee_note_text | TEXT | NO | 'Enrollment fees are one-time and non-refundable. Boarding fees are inclusive of meals, laundry, and 24/7 care. Fees are subject to review annually.' | NO |
| faq_section_title | TEXT | NO | 'Frequently Asked Questions' | NO |
| faq_section_subtitle | TEXT | NO | 'Find quick answers to common questions regarding admissions, documents, and student life.' | NO |
| faq1_question | TEXT | NO | 'When does the academic year begin at Tumaini?' | NO |
| faq1_answer | TEXT | NO | 'Our academic year follows the Kenyan Ministry of Education calendar, starting in January with Term 1, May for Term 2, and September for Term 3. We accept rolling admissions where vacancies exist.' | NO |
| faq2_question | TEXT | NO | 'What documents are required for the application?' | NO |
| faq2_answer | TEXT | NO | 'Required documents include a copy of the child''s birth certificate, recent passport-sized photos, academic transcripts or report cards from the previous school, and health/immunization records.' | NO |
| faq3_question | TEXT | NO | 'Do you offer scholarships or financial aid?' | NO |
| faq3_answer | TEXT | NO | 'Yes, we provide need-based and merit-based financial aid for deserving learners, as well as full residential sponsorships through our Children''s Home initiative.' | NO |
| faq4_question | TEXT | NO | 'What is the teacher-to-student ratio?' | NO |
| faq4_answer | TEXT | NO | 'We maintain an optimal ratio of approximately 1:20 to ensure personalized attention, individual mentorship, and holistic development for every learner.' | NO |
| faq5_question | TEXT | NO | 'Are there transport services available?' | NO |
| faq5_answer | TEXT | NO | 'Yes, we operate safe and monitored school vans routes across Soy and surrounding areas with designated pick-up and drop-off points.' | NO |
| cta_title | TEXT | NO | 'Ready to Join the Tumaini Family?' | NO |
| cta_description | TEXT | NO | 'Application for the next academic term is currently open. Secure your child''s place today.' | NO |
| cta_button1_text | TEXT | NO | 'Start Online Application' | NO |
| cta_button2_text | TEXT | NO | 'Book a School Tour' | NO |
| fee_structure_json | TEXT | NO | '{}' | NO |

### Table: `children_home`

**Columns:** 9

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| description | TEXT | NO | NULL | NO |
| programmes | TEXT | NO | NULL | NO |
| activities | TEXT | NO | NULL | NO |
| impact_info | TEXT | NO | NULL | NO |
| statistics | TEXT | NO | NULL | NO |
| support_ways | TEXT | NO | NULL | NO |
| images | TEXT | NO | NULL | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |

### Table: `childrens_home`

**Columns:** 68

| Column | Type | Not Null | Default | Primary Key |
|--------|------|----------|---------|-------------|
| id | INTEGER | NO | NULL | YES |
| created_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| updated_at | DATETIME | NO | CURRENT_TIMESTAMP | NO |
| hero_image | TEXT | NO | 'assets/images/enviroment.jpg' | NO |
| hero_badge_title | TEXT | NO | 'Safe Family Environment' | NO |
| hero_badge_subtitle | TEXT | NO | 'Loving caregivers & 24/7 dedicated supervision' | NO |
| hero_badge_tag | TEXT | NO | '100% Safe' | NO |
| hero_card_badge | TEXT | NO | 'Residential Care' | NO |
| hero_heading_line1 | TEXT | NO | 'A Nurturing Home for' | NO |
| hero_heading_line2 | TEXT | NO | 'Every Child' | NO |
| hero_description | TEXT | NO | '' | NO |
| hero_button1_text | TEXT | NO | 'Apply for Residency' | NO |
| hero_button2_text | TEXT | NO | 'Sponsor a Child' | NO |
| hero_social_number | TEXT | NO | '70+' | NO |
| hero_social_text | TEXT | NO | '' | NO |
| stat1_number | TEXT | NO | '70+' | NO |
| stat1_title | TEXT | NO | 'Resident Children' | NO |
| stat1_description | TEXT | NO | 'Safe housing and family-style dormitories' | NO |
| stat2_number | TEXT | NO | '1,500+' | NO |
| stat2_title | TEXT | NO | 'Daily Meals Served' | NO |
| stat2_description | TEXT | NO | 'Nutritious, chef-prepared balanced diet' | NO |
| stat3_number | TEXT | NO | '100%' | NO |
| stat3_title | TEXT | NO | 'School Enrollment' | NO |
| stat3_description | TEXT | NO | 'Full CBC primary & junior school access' | NO |
| stat4_number | TEXT | NO | '24/7' | NO |
| stat4_title | TEXT | NO | 'Professional Care' | NO |
| stat4_description | TEXT | NO | 'Resident parents, nurses & counselors' | NO |
| care_section_badge | TEXT | NO | 'Our Holistic Model' | NO |
| care_section_title | TEXT | NO | 'Comprehensive Care & Development' | NO |
| care_section_description | TEXT | NO | '' | NO |
| care1_image | TEXT | NO | 'assets/images/care-academic.jpg' | NO |
| care1_badge | TEXT | NO | 'Education' | NO |
| care1_title | TEXT | NO | 'Academic & Skills Training' | NO |
| care1_description | TEXT | NO | '' | NO |
| care2_image | TEXT | NO | 'assets/images/food.jfif' | NO |
| care2_badge | TEXT | NO | 'Nutrition' | NO |
| care2_title | TEXT | NO | 'Nutritious Dining & Wellness' | NO |
| care2_description | TEXT | NO | '' | NO |
| care3_image | TEXT | NO | 'assets/images/care-health.jpg' | NO |
| care3_badge | TEXT | NO | 'Health & Therapy' | NO |
| care3_title | TEXT | NO | 'Healthcare & Counseling' | NO |
| care3_description | TEXT | NO | '' | NO |
| safeguarding_image | TEXT | NO | 'assets/images/safeguarding-art.jpg' | NO |
| safeguarding_badge | TEXT | NO | 'Child Protection Standards' | NO |
| safeguarding_title | TEXT | NO | 'Our Zero-Tolerance Safeguarding Policy' | NO |
| safeguarding_description | TEXT | NO | '' | NO |
| safeguarding_point1 | TEXT | NO | '' | NO |
| safeguarding_point2 | TEXT | NO | '' | NO |
| safeguarding_point3 | TEXT | NO | '' | NO |
| safeguarding_point4 | TEXT | NO | '' | NO |
| sponsor_badge | TEXT | NO | 'Sponsorship & Giving' | NO |
| sponsor_title | TEXT | NO | 'Make a Lasting Impact Today' | NO |
| sponsor_description | TEXT | NO | '' | NO |
| tier1_name | TEXT | NO | 'Supporter' | NO |
| tier1_price | TEXT | NO | 'KES 2,500' | NO |
| tier1_period | TEXT | NO | '/ month' | NO |
| tier1_description | TEXT | NO | '' | NO |
| tier1_button_text | TEXT | NO | 'Sponsor as Supporter' | NO |
| tier2_name | TEXT | NO | 'Guardian' | NO |
| tier2_price | TEXT | NO | 'KES 7,500' | NO |
| tier2_period | TEXT | NO | '/ month' | NO |
| tier2_description | TEXT | NO | '' | NO |
| tier2_button_text | TEXT | NO | 'Sponsor as Guardian' | NO |
| tier3_name | TEXT | NO | 'Champion' | NO |
| tier3_price | TEXT | NO | 'KES 15,000' | NO |
| tier3_period | TEXT | NO | '/ month' | NO |
| tier3_description | TEXT | NO | '' | NO |
| tier3_button_text | TEXT | NO | 'Sponsor as Champion' | NO |

**Row Count:** 1

---

**Row Count:** 0

---

**Row Count:** 1

---

**Row Count:** 0

---

**Row Count:** 1

---

**Row Count:** 0

---

**Row Count:** 1

---

**Row Count:** 1

---

**Row Count:** 0

---

**Row Count:** 1

---

**Row Count:** 9

---

**Row Count:** 0

---

**Row Count:** 0

---

