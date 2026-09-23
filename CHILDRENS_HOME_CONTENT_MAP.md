# Children's Home Page - CMS Content Mapping

## Overview
This document maps all editable content fields on the Children's Home page (`childrens-home.html`) to database columns.

**Total Fields: 65**
**Sections: 7**
**Images Required: 4**

---

## Section 1: Hero (Split Layout) - 12 Fields + 1 Image

### Left Image Card (4 fields + 1 image)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 1 | Hero image | `hero_image` | TEXT | `assets/images/enviroment.jpg` |
| 2 | Floating badge title | `hero_badge_title` | TEXT | "Safe Family Environment" |
| 3 | Floating badge subtitle | `hero_badge_subtitle` | TEXT | "Loving caregivers & 24/7 dedicated supervision" |
| 4 | Floating badge tag | `hero_badge_tag` | TEXT | "100% Safe" |

### Right Emerald Card (8 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 5 | Badge text | `hero_card_badge` | TEXT | "Residential Care" |
| 6 | Main heading line 1 | `hero_heading_line1` | TEXT | "A Nurturing Home for" |
| 7 | Main heading line 2 (gold) | `hero_heading_line2` | TEXT | "Every Child" |
| 8 | Lead description | `hero_description` | TEXT | "Providing a safe, loving, and supportive..." |
| 9 | Button 1 text | `hero_button1_text` | TEXT | "Apply for Residency" |
| 10 | Button 2 text | `hero_button2_text` | TEXT | "Sponsor a Child" |
| 11 | Social proof number | `hero_social_number` | TEXT | "70+" |
| 12 | Social proof text | `hero_social_text` | TEXT | "Joined by 70+ happy children under our holistic residential care program." |

---

## Section 2: Key Stats (4 Grid Cards) - 16 Fields

### Stat Card 1: Resident Children
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 13 | Stat number | `stat1_number` | TEXT | "70+" |
| 14 | Stat title | `stat1_title` | TEXT | "Resident Children" |
| 15 | Stat description | `stat1_description` | TEXT | "Safe housing and family-style dormitories" |

### Stat Card 2: Daily Meals
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 16 | Stat number | `stat2_number` | TEXT | "1,500+" |
| 17 | Stat title | `stat2_title` | TEXT | "Daily Meals Served" |
| 18 | Stat description | `stat2_description` | TEXT | "Nutritious, chef-prepared balanced diet" |

### Stat Card 3: School Enrollment
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 19 | Stat number | `stat3_number` | TEXT | "100%" |
| 20 | Stat title | `stat3_title` | TEXT | "School Enrollment" |
| 21 | Stat description | `stat3_description` | TEXT | "Full CBC primary & junior school access" |

### Stat Card 4: Professional Care
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 22 | Stat number | `stat4_number` | TEXT | "24/7" |
| 23 | Stat title | `stat4_title` | TEXT | "Professional Care" |
| 24 | Stat description | `stat4_description` | TEXT | "Resident parents, nurses & counselors" |

---

## Section 3: Holistic Support & Care (3 Card Grid) - 15 Fields + 3 Images

### Section Header (3 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 25 | Section badge | `care_section_badge` | TEXT | "Our Holistic Model" |
| 26 | Section title | `care_section_title` | TEXT | "Comprehensive Care & Development" |
| 27 | Section description | `care_section_description` | TEXT | "We believe every child deserves comprehensive care..." |

### Care Pillar 1: Academic (4 fields + 1 image)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 28 | Card image | `care1_image` | TEXT | `assets/images/care-academic.jpg` |
| 29 | Card badge | `care1_badge` | TEXT | "Education" |
| 30 | Card title | `care1_title` | TEXT | "Academic & Skills Training" |
| 31 | Card description | `care1_description` | TEXT | "Full integration into our on-school CBC school..." |

### Care Pillar 2: Nutrition (4 fields + 1 image)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 32 | Card image | `care2_image` | TEXT | `assets/images/food.jfif` |
| 33 | Card badge | `care2_badge` | TEXT | "Nutrition" |
| 34 | Card title | `care2_title` | TEXT | "Nutritious Dining & Wellness" |
| 35 | Card description | `care2_description` | TEXT | "Fresh, balanced meals prepared daily..." |

### Care Pillar 3: Healthcare (4 fields + 1 image)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 36 | Card image | `care3_image` | TEXT | `assets/images/care-health.jpg` |
| 37 | Card badge | `care3_badge` | TEXT | "Health & Therapy" |
| 38 | Card title | `care3_title` | TEXT | "Healthcare & Counseling" |
| 39 | Card description | `care3_description` | TEXT | "On-school medical clinic, routine pediatric checkups..." |

---

## Section 4: Safeguarding Commitment - 9 Fields + 1 Image

### Section Header (4 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 40 | Safeguarding image | `safeguarding_image` | TEXT | `assets/images/safeguarding-art.jpg` |
| 41 | Section badge | `safeguarding_badge` | TEXT | "Child Protection Standards" |
| 42 | Section title | `safeguarding_title` | TEXT | "Our Zero-Tolerance Safeguarding Policy" |
| 43 | Section description | `safeguarding_description` | TEXT | "At Tumaini Children's Home, the safety, dignity..." |

### Safeguarding Points (4 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 44 | Point 1 | `safeguarding_point1` | TEXT | "Strict Staff Vetting: Comprehensive police clearance..." |
| 45 | Point 2 | `safeguarding_point2` | TEXT | "Secure Gated Facility: 24-hour perimeter security..." |
| 46 | Point 3 | `safeguarding_point3` | TEXT | "Individual Care Plans: Customized psycho-social support..." |
| 47 | Point 4 | `safeguarding_point4` | TEXT | "Whistleblowing & Advocacy: Direct reporting mechanisms..." |

---

## Section 5: Sponsorship Tiers - 18 Fields

### Section Header (3 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 48 | Section badge | `sponsor_badge` | TEXT | "Sponsorship & Giving" |
| 49 | Section title | `sponsor_title` | TEXT | "Make a Lasting Impact Today" |
| 50 | Section description | `sponsor_description` | TEXT | "Your direct contribution funds essential meals..." |

### Tier 1: Supporter (5 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 51 | Tier name | `tier1_name` | TEXT | "Supporter" |
| 52 | Tier price | `tier1_price` | TEXT | "KES 2,500" |
| 53 | Tier period | `tier1_period` | TEXT | "/ month" |
| 54 | Tier description | `tier1_description` | TEXT | "Provides daily nutritious meals, essential hygiene supplies..." |
| 55 | Tier button text | `tier1_button_text` | TEXT | "Sponsor as Supporter" |

### Tier 2: Guardian (5 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 56 | Tier name | `tier2_name` | TEXT | "Guardian" |
| 57 | Tier price | `tier2_price` | TEXT | "KES 7,500" |
| 58 | Tier period | `tier2_period` | TEXT | "/ month" |
| 59 | Tier description | `tier2_description` | TEXT | "Covers full school tuition, learning materials..." |
| 60 | Tier button text | `tier2_button_text` | TEXT | "Sponsor as Guardian" |

### Tier 3: Champion (5 fields)
| Field ID | HTML Location | Database Column | Type | Default Content |
|----------|---------------|-----------------|------|-----------------|
| 61 | Tier name | `tier3_name` | TEXT | "Champion" |
| 62 | Tier price | `tier3_price` | TEXT | "KES 15,000" |
| 63 | Tier period | `tier3_period` | TEXT | "/ month" |
| 64 | Tier description | `tier3_description` | TEXT | "Comprehensive support for two children plus contributions..." |
| 65 | Tier button text | `tier3_button_text` | TEXT | "Sponsor as Champion" |

---

## Section 6: Residency Referral - NOT INCLUDED (Static Content)

This section contains administrative/procedural information that should remain static.

---

## Section 7: Bottom CTA Banner - NOT INCLUDED (Static Content)

This section can remain static with generic call-to-action text.

---

## Summary

**Total Editable Fields: 65**

### By Section:
- Hero (Split Layout): 12 fields + 1 image
- Key Stats: 16 fields
- Holistic Care: 15 fields + 3 images
- Safeguarding: 9 fields + 1 image
- Sponsorship Tiers: 18 fields

### Images to Upload: 5
1. `hero_image` - Hero left side image
2. `care1_image` - Academic care card
3. `care2_image` - Nutrition care card
4. `care3_image` - Healthcare care card
5. `safeguarding_image` - Safeguarding section image

---

## Recommended Admin Tab Structure

### Tab 1: Hero & Welcome (12 fields)
- Hero image upload
- Floating badge (3 fields)
- Main hero card (8 fields)

### Tab 2: Key Statistics (16 fields)
- 4 stat cards with 4 fields each

### Tab 3: Care Pillars (15 fields + 3 images)
- Section header (3 fields)
- 3 care cards with image uploads

### Tab 4: Safeguarding (9 fields + 1 image)
- Image upload
- Section header (3 fields)
- 4 safeguarding points

### Tab 5: Sponsorship (18 fields)
- Section header (3 fields)
- 3 sponsorship tiers (5 fields each)

---

## Database Table: `childrens_home`

All 65 fields will be TEXT columns with id=1 as the primary record.

**Created:** 2026-09-22
**Status:** Ready for Implementation
