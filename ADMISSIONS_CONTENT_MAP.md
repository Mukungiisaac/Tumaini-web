# Admissions Page - Complete Content Mapping

## Overview
Total Editable Fields: **50 fields** across **5 major sections**

---

## 1. HERO SECTION (7 fields)

| Field Name | Type | Current Content | Description |
|-----------|------|-----------------|-------------|
| `hero_badge` | TEXT | "Admissions 2024/2025" | Badge text |
| `hero_title_line1` | TEXT | "Your Child's Future" | First line of heading |
| `hero_title_line2` | TEXT | "Starts Here" | Second line (gold highlight) |
| `hero_description` | TEXT | "Join a community where academic excellence meets nurturing care..." | Lead paragraph |
| `hero_button1_text` | TEXT | "Apply Now" | Primary button text |
| `hero_button2_text` | TEXT | "Download Prospectus" | Secondary button text |
| `hero_image` | TEXT | "assets/images/admissions-hero.jpg" | Hero background image path |

---

## 2. PROCESS STEPS SECTION (10 fields)

| Field Name | Type | Current Content | Description |
|-----------|------|-----------------|-------------|
| `process_section_title` | TEXT | "Simple 4-Step Process" | Section heading |
| `process_section_subtitle` | TEXT | "We've streamlined our admission process..." | Section description |
| `step1_title` | TEXT | "Initial Inquiry" | Step 1 heading |
| `step1_description` | TEXT | "Submit an online inquiry form or visit our school..." | Step 1 description |
| `step2_title` | TEXT | "Application Submission" | Step 2 heading |
| `step2_description` | TEXT | "Complete the formal application form..." | Step 2 description |
| `step3_title` | TEXT | "Assessment & Interview" | Step 3 heading |
| `step3_description` | TEXT | "Prospective students participate in a friendly placement assessment..." | Step 3 description |
| `step4_title` | TEXT | "Enrollment & Orientation" | Step 4 heading |
| `step4_description` | TEXT | "Upon acceptance, secure the spot..." | Step 4 description |

---

## 3. FEE SCHEDULE SECTION (22 fields)

### Section Headers (3 fields)
| Field Name | Type | Current Content |
|-----------|------|-----------------|
| `fee_section_badge` | TEXT | "Investment in Excellence" |
| `fee_section_title` | TEXT | "Transparent Fee Schedule" |
| `fee_section_description` | TEXT | "We believe in providing world-class education at accessible rates..." |

### Value Props (3 fields)
| Field Name | Type | Current Content |
|-----------|------|-----------------|
| `fee_value_prop1` | TEXT | "All-inclusive Tuition" |
| `fee_value_prop2` | TEXT | "Flexible Payment Plans" |
| `fee_value_prop3` | TEXT | "Sibling Discounts Available" |

### Fee Table (15 fields)
| Field Name | Type | Current Content | Description |
|-----------|------|-----------------|-------------|
| `fee_table_year` | TEXT | "2024" | Academic year |
| `fee_early_years_enrollment` | TEXT | "KES 15,000" | Early Years enrollment fee |
| `fee_early_years_tuition` | TEXT | "KES 45,000" | Early Years termly tuition |
| `fee_lower_primary_enrollment` | TEXT | "KES 20,000" | Lower Primary enrollment |
| `fee_lower_primary_tuition` | TEXT | "KES 55,000" | Lower Primary tuition |
| `fee_upper_primary_enrollment` | TEXT | "KES 20,000" | Upper Primary enrollment |
| `fee_upper_primary_tuition` | TEXT | "KES 65,000" | Upper Primary tuition |
| `fee_junior_secondary_enrollment` | TEXT | "KES 25,000" | Junior Secondary enrollment |
| `fee_junior_secondary_tuition` | TEXT | "KES 85,000" | Junior Secondary tuition |
| `fee_boarding_enrollment` | TEXT | "N/A" | Boarding enrollment (optional) |
| `fee_boarding_tuition` | TEXT | "KES 35,000" | Boarding termly fee |
| `fee_note_text` | TEXT | "Enrollment fees are one-time and non-refundable..." | Footer note |

---

## 4. FAQ SECTION (11 fields)

| Field Name | Type | Current Content | Description |
|-----------|------|-----------------|-------------|
| `faq_section_title` | TEXT | "Frequently Asked Questions" | Section heading |
| `faq_section_subtitle` | TEXT | "Find quick answers to common questions..." | Section description |
| `faq1_question` | TEXT | "When does the academic year begin at Tumaini?" | FAQ 1 question |
| `faq1_answer` | TEXT | "Our academic year follows the Kenyan Ministry..." | FAQ 1 answer |
| `faq2_question` | TEXT | "What documents are required for the application?" | FAQ 2 question |
| `faq2_answer` | TEXT | "Required documents include a copy of the child's birth certificate..." | FAQ 2 answer |
| `faq3_question` | TEXT | "Do you offer scholarships or financial aid?" | FAQ 3 question |
| `faq3_answer` | TEXT | "Yes, we provide need-based and merit-based financial aid..." | FAQ 3 answer |
| `faq4_question` | TEXT | "What is the teacher-to-student ratio?" | FAQ 4 question |
| `faq4_answer` | TEXT | "We maintain an optimal ratio of approximately 1:20..." | FAQ 4 answer |
| `faq5_question` | TEXT | "Are there transport services available?" | FAQ 5 question |
| `faq5_answer` | TEXT | "Yes, we operate safe and monitored school vans routes..." | FAQ 5 answer |

---

## 5. CTA SECTION (3 fields)

| Field Name | Type | Current Content | Description |
|-----------|------|-----------------|-------------|
| `cta_title` | TEXT | "Ready to Join the Tumaini Family?" | CTA heading |
| `cta_description` | TEXT | "Application for the next academic term is currently open..." | CTA description |
| `cta_button1_text` | TEXT | "Start Online Application" | Primary button text |
| `cta_button2_text` | TEXT | "Book a School Tour" | Secondary button text |

---

## Summary

**Total Fields: 50**

### Fields by Section:
- Hero Section: 7 fields
- Process Steps: 10 fields (section intro + 4 steps)
- Fee Schedule: 22 fields (intro + value props + table + note)
- FAQ Section: 11 fields (intro + 5 Q&A pairs)
- CTA Section: 3 fields

### Images Requiring Upload Support:
1. `hero_image` - Hero background image

**Total: 1 image upload field**

---

## Admin Interface Structure (5 Tabs)

1. **Tab 1: Hero Section** - Badge, title, description, buttons, image upload
2. **Tab 2: Process Steps** - Section intro + 4 process steps
3. **Tab 3: Fee Schedule** - Section intro, value props, fee table (5 levels x 2 columns)
4. **Tab 4: FAQs** - Section intro + 5 FAQ pairs (question + answer)
5. **Tab 5: Call to Action** - CTA heading, description, button texts

---

## Database Considerations

- All fields are TEXT type for flexibility
- Fee fields stored as text (not numbers) to allow "N/A" and formatting
- Existing fields from current schema: `description`, `requirements`, `available_classes`, `instructions`, `important_dates`, `documents`, `application_links`
- New fields: 50 additional columns for comprehensive CMS control

---

## Notes

- Form section (inquiry form) is functional, not CMS-managed
- Contact information in FAQ callout box could be linked to contact table if needed
- Fee table could be enhanced with additional rows/columns in future
- FAQ accordion functionality handled by JavaScript, content managed via CMS
