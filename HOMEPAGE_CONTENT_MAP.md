# Homepage Content Mapping - Complete Analysis

## All Editable Content Sections in index.html

### ✅ Section 1: HERO SECTION (Already in CMS)
**Location:** Top of page, dark green card

| Field Name | Current Value | Database Column | Status |
|------------|---------------|-----------------|---------|
| Hero Badge | "Excellence in Education & Care" | `hero_badge` | ✅ Implemented |
| Hero Title | "Nurturing Potential, Building Futures." | `hero_title` | ✅ Implemented |
| Hero Description | "Tumaini Comprehensive School and..." | `hero_description` | ✅ Implemented |
| Primary Button Text | "Apply Now" | `hero_button_primary` | ✅ Implemented |
| Primary Button Link | "/admissions.html" | `hero_button_primary_link` | ✅ Implemented |
| Secondary Button Text | "Our Mission" | `hero_button_secondary` | ✅ Implemented |
| Secondary Button Link | "/about.html" | `hero_button_secondary_link` | ✅ Implemented |
| Social Proof Text | "Join 450+ students on their journey..." | `hero_social_proof_text` | ❌ NOT in CMS |

---

### ✅ Section 2: STATISTICS CARDS (Already in CMS)
**Location:** Below hero section, 4 cards

| Field Name | Current Value | Database Column | Status |
|------------|---------------|-----------------|---------|
| Stat 1 Number | "450+" | `stat_students` | ✅ Implemented |
| Stat 1 Label | "Empowered Students" | `stat_students_label` | ❌ NOT in CMS |
| Stat 2 Number | "98%" | `stat_pass_rate` | ✅ Implemented |
| Stat 2 Label | "Examination Pass Rate" | `stat_pass_rate_label` | ❌ NOT in CMS |
| Stat 3 Number | "70+" | `stat_children_residence` | ✅ Implemented |
| Stat 3 Label | "Children in Residence" | `stat_children_label` | ❌ NOT in CMS |
| Stat 4 Number | "5+" | `stat_awards` | ✅ Implemented |
| Stat 4 Label | "Co-Curricular Awards" | `stat_awards_label` | ❌ NOT in CMS |

---

### ❌ Section 3: HOLISTIC APPROACH (NOT in CMS)
**Location:** After statistics, two-column section with image and content

| Field Name | Current Value | Database Column | Status |
|------------|---------------|-----------------|---------|
| Section Badge | "Our Foundation" | `holistic_badge` | ❌ NOT in CMS |
| Section Title | "A Holistic Approach to Learning and Living" | `holistic_title` | ❌ NOT in CMS |
| Section Description | "At Tumaini, we believe that education is..." | `holistic_description` | ❌ NOT in CMS |
| Feature 1 | "Nationally recognized academic curriculum" | `holistic_feature_1` | ❌ NOT in CMS |
| Feature 2 | "Safe and modern residential housing facilities" | `holistic_feature_2` | ❌ NOT in CMS |
| Feature 3 | "Holistic character development and mentorship" | `holistic_feature_3` | ❌ NOT in CMS |
| Feature 4 | "Thriving sports and arts programs" | `holistic_feature_4` | ❌ NOT in CMS |
| Button Text | "Explore Our Programs" | `holistic_button_text` | ❌ NOT in CMS |
| Button Link | "/about.html" | `holistic_button_link` | ❌ NOT in CMS |
| Image URL | "assets/images/in-class.png" | `holistic_image` | ❌ NOT in CMS |
| Floating Badge Top Text | "Quality Education" | `holistic_badge_top` | ❌ NOT in CMS |
| Floating Badge Bottom Text | "Since 2010" | `holistic_badge_bottom` | ❌ NOT in CMS |

---

### ❌ Section 4: PILLARS OF EXCELLENCE (NOT in CMS)
**Location:** Gray background section with 3 cards

| Field Name | Current Value | Database Column | Status |
|------------|---------------|-----------------|---------|
| Section Title | "Pillars of Our Excellence" | `pillars_title` | ❌ NOT in CMS |
| Section Subtitle | "We provide a comprehensive ecosystem designed..." | `pillars_subtitle` | ❌ NOT in CMS |
| **Pillar 1** | | | |
| Pillar 1 Title | "Academic Rigor" | `pillar_1_title` | ❌ NOT in CMS |
| Pillar 1 Description | "Our curriculum is designed to challenge students..." | `pillar_1_description` | ❌ NOT in CMS |
| **Pillar 2** | | | |
| Pillar 2 Title | "Residential Care" | `pillar_2_title` | ❌ NOT in CMS |
| Pillar 2 Description | "A home away from home..." | `pillar_2_description` | ❌ NOT in CMS |
| **Pillar 3** | | | |
| Pillar 3 Title | "Community Impact" | `pillar_3_title` | ❌ NOT in CMS |
| Pillar 3 Description | "We believe in the power of community..." | `pillar_3_description` | ❌ NOT in CMS |

---

### ❌ Section 5: LATEST NEWS (NOT in CMS - Dynamic)
**Location:** News cards section

**Note:** This section displays actual news articles from the database, so it should pull from `/api/news/all` endpoint, not from homepage table.

| Field Name | Current Value | Database Column | Status |
|------------|---------------|-----------------|---------|
| Section Title | "Latest from Our School" | `news_section_title` | ❌ NOT in CMS |
| Section Subtitle | "Stay updated with the vibrant life at Tumaini..." | `news_section_subtitle` | ❌ NOT in CMS |
| Button Text | "View All News" | `news_section_button_text` | ❌ NOT in CMS |

**News Cards:** These are hardcoded currently but should load from `/api/news/all?limit=3&status=published`

---

### ❌ Section 6: TESTIMONIAL BANNER (NOT in CMS)
**Location:** Dark green banner with quote

| Field Name | Current Value | Database Column | Status |
|------------|---------------|-----------------|---------|
| Quote Text | "Tumaini didn't just give my daughter an education..." | `testimonial_quote` | ❌ NOT in CMS |
| Author Name | "Sarah Mwikali" | `testimonial_author` | ❌ NOT in CMS |
| Author Title | "Parent of Class 8 Graduate" | `testimonial_author_title` | ❌ NOT in CMS |
| Author Image | "assets/images/testimonial-sarah.jpg" | `testimonial_author_image` | ❌ NOT in CMS |

---

### ❌ Section 7: BOTTOM CTA (NOT in CMS)
**Location:** Gold banner with call-to-action

| Field Name | Current Value | Database Column | Status |
|------------|---------------|-----------------|---------|
| CTA Title | "Invest in the Leaders of Tomorrow" | `cta_title` | ❌ NOT in CMS |
| CTA Description | "Whether you are a prospective parent..." | `cta_description` | ❌ NOT in CMS |
| CTA Button 1 Text | "Apply for Admission" | `cta_button_1_text` | ❌ NOT in CMS |
| CTA Button 1 Link | "/admissions.html" | `cta_button_1_link` | ❌ NOT in CMS |
| CTA Button 2 Text | "Partner with Us" | `cta_button_2_text` | ❌ NOT in CMS |
| CTA Button 2 Link | "/contact.html" | `cta_button_2_link` | ❌ NOT in CMS |

---

## Summary

### Currently Implemented (11 fields):
✅ Hero: Badge, Title, Description, 2 Buttons (text + links)  
✅ Statistics: 4 numbers

### Missing from CMS (40+ fields):
❌ Holistic Approach Section (11 fields)  
❌ Pillars of Excellence Section (8 fields)  
❌ News Section Headers (3 fields)  
❌ Testimonial Section (4 fields)  
❌ Bottom CTA Section (6 fields)  
❌ Stat Labels (4 fields)  
❌ Social Proof Text (1 field)  

**Total Editable Fields: ~51 fields**

---

## Recommended Implementation Strategy

### Phase 1: Essential Content (Priority 1)
- ✅ Hero Section (already done)
- ✅ Statistics Numbers (already done)
- ❌ Holistic Approach Section
- ❌ Pillars of Excellence Section
- ❌ Bottom CTA Section

### Phase 2: Enhanced Content (Priority 2)
- ❌ Testimonial Section
- ❌ News Section Headers
- ❌ Statistics Labels

### Phase 3: Polish (Priority 3)
- ❌ Social Proof Text
- ❌ Floating badges and decorative text

---

## Database Schema Updates Needed

```sql
ALTER TABLE homepage ADD COLUMN hero_social_proof_text TEXT;

-- Statistics Labels
ALTER TABLE homepage ADD COLUMN stat_students_label TEXT DEFAULT 'Empowered Students';
ALTER TABLE homepage ADD COLUMN stat_pass_rate_label TEXT DEFAULT 'Examination Pass Rate';
ALTER TABLE homepage ADD COLUMN stat_children_label TEXT DEFAULT 'Children in Residence';
ALTER TABLE homepage ADD COLUMN stat_awards_label TEXT DEFAULT 'Co-Curricular Awards';

-- Holistic Approach Section
ALTER TABLE homepage ADD COLUMN holistic_badge TEXT DEFAULT 'Our Foundation';
ALTER TABLE homepage ADD COLUMN holistic_title TEXT;
ALTER TABLE homepage ADD COLUMN holistic_description TEXT;
ALTER TABLE homepage ADD COLUMN holistic_feature_1 TEXT;
ALTER TABLE homepage ADD COLUMN holistic_feature_2 TEXT;
ALTER TABLE homepage ADD COLUMN holistic_feature_3 TEXT;
ALTER TABLE homepage ADD COLUMN holistic_feature_4 TEXT;
ALTER TABLE homepage ADD COLUMN holistic_button_text TEXT DEFAULT 'Explore Our Programs';
ALTER TABLE homepage ADD COLUMN holistic_button_link TEXT DEFAULT '/about.html';
ALTER TABLE homepage ADD COLUMN holistic_image TEXT DEFAULT 'assets/images/in-class.png';
ALTER TABLE homepage ADD COLUMN holistic_badge_top TEXT DEFAULT 'Quality Education';
ALTER TABLE homepage ADD COLUMN holistic_badge_bottom TEXT DEFAULT 'Since 2010';

-- Pillars Section
ALTER TABLE homepage ADD COLUMN pillars_title TEXT DEFAULT 'Pillars of Our Excellence';
ALTER TABLE homepage ADD COLUMN pillars_subtitle TEXT;
ALTER TABLE homepage ADD COLUMN pillar_1_title TEXT DEFAULT 'Academic Rigor';
ALTER TABLE homepage ADD COLUMN pillar_1_description TEXT;
ALTER TABLE homepage ADD COLUMN pillar_2_title TEXT DEFAULT 'Residential Care';
ALTER TABLE homepage ADD COLUMN pillar_2_description TEXT;
ALTER TABLE homepage ADD COLUMN pillar_3_title TEXT DEFAULT 'Community Impact';
ALTER TABLE homepage ADD COLUMN pillar_3_description TEXT;

-- News Section
ALTER TABLE homepage ADD COLUMN news_section_title TEXT DEFAULT 'Latest from Our School';
ALTER TABLE homepage ADD COLUMN news_section_subtitle TEXT;
ALTER TABLE homepage ADD COLUMN news_section_button_text TEXT DEFAULT 'View All News';

-- Testimonial Section
ALTER TABLE homepage ADD COLUMN testimonial_quote TEXT;
ALTER TABLE homepage ADD COLUMN testimonial_author TEXT;
ALTER TABLE homepage ADD COLUMN testimonial_author_title TEXT;
ALTER TABLE homepage ADD COLUMN testimonial_author_image TEXT DEFAULT 'assets/images/testimonial-sarah.jpg';

-- Bottom CTA Section
ALTER TABLE homepage ADD COLUMN cta_title TEXT DEFAULT 'Invest in the Leaders of Tomorrow';
ALTER TABLE homepage ADD COLUMN cta_description TEXT;
ALTER TABLE homepage ADD COLUMN cta_button_1_text TEXT DEFAULT 'Apply for Admission';
ALTER TABLE homepage ADD COLUMN cta_button_1_link TEXT DEFAULT '/admissions.html';
ALTER TABLE homepage ADD COLUMN cta_button_2_text TEXT DEFAULT 'Partner with Us';
ALTER TABLE homepage ADD COLUMN cta_button_2_link TEXT DEFAULT '/contact.html';
```

---

## Next Steps

1. ✅ Create this content map (DONE)
2. Update database schema with new columns
3. Update backend API to handle new fields
4. Create tabbed admin interface for easier editing
5. Update frontend CMS integration script
6. Test each section
