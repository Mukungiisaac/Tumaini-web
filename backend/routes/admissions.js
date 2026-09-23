const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/admissions/admin (admin only, includes drafts)
router.get('/admin', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const admissions = await getQuery('SELECT * FROM admissions WHERE id = 1');
    res.json(admissions || {});
  } catch (error) {
    console.error('Error fetching admissions:', error);
    res.status(500).json({ error: 'Failed to fetch admissions' });
  }
});

// GET /api/admissions (public)
router.get('/', async (req, res) => {
  try {
    const admissions = await getQuery('SELECT * FROM admissions WHERE id = 1');
    res.json(admissions || {});
  } catch (error) {
    console.error('Error fetching admissions:', error);
    res.status(500).json({ error: 'Failed to fetch admissions' });
  }
});

// PUT /api/admissions (admin only)
router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const {
      // Legacy fields (keep for backwards compatibility)
      description, requirements, available_classes, instructions, important_dates, documents, application_links, is_published,
      
      // Hero Section (7 fields)
      hero_badge, hero_title_line1, hero_title_line2, hero_description,
      hero_button1_text, hero_button2_text, hero_image,
      
      // Process Steps Section (10 fields)
      process_section_title, process_section_subtitle,
      step1_title, step1_description,
      step2_title, step2_description,
      step3_title, step3_description,
      step4_title, step4_description,
      
      // Fee Schedule Section (22 fields)
      fee_section_badge, fee_section_title, fee_section_description,
      fee_value_prop1, fee_value_prop2, fee_value_prop3,
      fee_table_year,
      fee_early_years_enrollment, fee_early_years_tuition,
      fee_lower_primary_enrollment, fee_lower_primary_tuition,
      fee_upper_primary_enrollment, fee_upper_primary_tuition,
      fee_junior_secondary_enrollment, fee_junior_secondary_tuition,
      fee_boarding_enrollment, fee_boarding_tuition,
      fee_structure_json,
      fee_note_text,
      
      // FAQ Section (11 fields)
      faq_section_title, faq_section_subtitle,
      faq1_question, faq1_answer,
      faq2_question, faq2_answer,
      faq3_question, faq3_answer,
      faq4_question, faq4_answer,
      faq5_question, faq5_answer,
      
      // CTA Section (3 fields)
      cta_title, cta_description, cta_button1_text, cta_button2_text
    } = req.body;
    
    const existing = await getQuery('SELECT id FROM admissions WHERE id = 1');
    
    if (existing) {
      await runQuery(
        `UPDATE admissions SET 
          description = ?, requirements = ?, available_classes = ?, instructions = ?, 
          important_dates = ?, documents = ?, application_links = ?, is_published = ?,
          hero_badge = ?, hero_title_line1 = ?, hero_title_line2 = ?, hero_description = ?,
          hero_button1_text = ?, hero_button2_text = ?, hero_image = ?,
          process_section_title = ?, process_section_subtitle = ?,
          step1_title = ?, step1_description = ?,
          step2_title = ?, step2_description = ?,
          step3_title = ?, step3_description = ?,
          step4_title = ?, step4_description = ?,
          fee_section_badge = ?, fee_section_title = ?, fee_section_description = ?,
          fee_value_prop1 = ?, fee_value_prop2 = ?, fee_value_prop3 = ?,
          fee_table_year = ?,
          fee_early_years_enrollment = ?, fee_early_years_tuition = ?,
          fee_lower_primary_enrollment = ?, fee_lower_primary_tuition = ?,
          fee_upper_primary_enrollment = ?, fee_upper_primary_tuition = ?,
          fee_junior_secondary_enrollment = ?, fee_junior_secondary_tuition = ?,
          fee_boarding_enrollment = ?, fee_boarding_tuition = ?,
          fee_structure_json = ?,
          fee_note_text = ?,
          faq_section_title = ?, faq_section_subtitle = ?,
          faq1_question = ?, faq1_answer = ?,
          faq2_question = ?, faq2_answer = ?,
          faq3_question = ?, faq3_answer = ?,
          faq4_question = ?, faq4_answer = ?,
          faq5_question = ?, faq5_answer = ?,
          cta_title = ?, cta_description = ?, cta_button1_text = ?, cta_button2_text = ?,
          updated_at = CURRENT_TIMESTAMP 
        WHERE id = 1`,
        [
          description, requirements, available_classes, instructions, important_dates, documents, application_links, is_published ? 1 : 0,
          hero_badge, hero_title_line1, hero_title_line2, hero_description,
          hero_button1_text, hero_button2_text, hero_image,
          process_section_title, process_section_subtitle,
          step1_title, step1_description,
          step2_title, step2_description,
          step3_title, step3_description,
          step4_title, step4_description,
          fee_section_badge, fee_section_title, fee_section_description,
          fee_value_prop1, fee_value_prop2, fee_value_prop3,
          fee_table_year,
          fee_early_years_enrollment, fee_early_years_tuition,
          fee_lower_primary_enrollment, fee_lower_primary_tuition,
          fee_upper_primary_enrollment, fee_upper_primary_tuition,
          fee_junior_secondary_enrollment, fee_junior_secondary_tuition,
          fee_boarding_enrollment, fee_boarding_tuition,
          fee_structure_json,
          fee_note_text,
          faq_section_title, faq_section_subtitle,
          faq1_question, faq1_answer,
          faq2_question, faq2_answer,
          faq3_question, faq3_answer,
          faq4_question, faq4_answer,
          faq5_question, faq5_answer,
          cta_title, cta_description, cta_button1_text, cta_button2_text
        ]
      );
    } else {
      await runQuery(
        `INSERT INTO admissions (
          description, requirements, available_classes, instructions, important_dates, documents, application_links, is_published,
          hero_badge, hero_title_line1, hero_title_line2, hero_description,
          hero_button1_text, hero_button2_text, hero_image,
          process_section_title, process_section_subtitle,
          step1_title, step1_description,
          step2_title, step2_description,
          step3_title, step3_description,
          step4_title, step4_description,
          fee_section_badge, fee_section_title, fee_section_description,
          fee_value_prop1, fee_value_prop2, fee_value_prop3,
          fee_table_year,
          fee_early_years_enrollment, fee_early_years_tuition,
          fee_lower_primary_enrollment, fee_lower_primary_tuition,
          fee_upper_primary_enrollment, fee_upper_primary_tuition,
          fee_junior_secondary_enrollment, fee_junior_secondary_tuition,
          fee_boarding_enrollment, fee_boarding_tuition,
          fee_structure_json,
          fee_note_text,
          faq_section_title, faq_section_subtitle,
          faq1_question, faq1_answer,
          faq2_question, faq2_answer,
          faq3_question, faq3_answer,
          faq4_question, faq4_answer,
          faq5_question, faq5_answer,
          cta_title, cta_description, cta_button1_text, cta_button2_text
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?,
          ?, ?, ?, ?
        )`,
        [
          description, requirements, available_classes, instructions, important_dates, documents, application_links, is_published ? 1 : 0,
          hero_badge, hero_title_line1, hero_title_line2, hero_description,
          hero_button1_text, hero_button2_text, hero_image,
          process_section_title, process_section_subtitle,
          step1_title, step1_description,
          step2_title, step2_description,
          step3_title, step3_description,
          step4_title, step4_description,
          fee_section_badge, fee_section_title, fee_section_description,
          fee_value_prop1, fee_value_prop2, fee_value_prop3,
          fee_table_year,
          fee_early_years_enrollment, fee_early_years_tuition,
          fee_lower_primary_enrollment, fee_lower_primary_tuition,
          fee_upper_primary_enrollment, fee_upper_primary_tuition,
          fee_junior_secondary_enrollment, fee_junior_secondary_tuition,
          fee_boarding_enrollment, fee_boarding_tuition,
          fee_note_text,
          faq_section_title, faq_section_subtitle,
          faq1_question, faq1_answer,
          faq2_question, faq2_answer,
          faq3_question, faq3_answer,
          faq4_question, faq4_answer,
          faq5_question, faq5_answer,
          cta_title, cta_description, cta_button1_text, cta_button2_text
        ]
      );
    }
    
    res.json({ success: true, message: 'Admissions page updated successfully' });
  } catch (error) {
    console.error('Error updating admissions:', error);
    res.status(500).json({ error: 'Failed to update admissions page', details: error.message });
  }
});

module.exports = router;
