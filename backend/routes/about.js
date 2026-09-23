const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/about (public)
router.get('/', async (req, res) => {
  try {
    const about = await getQuery('SELECT * FROM about WHERE id = 1');
    res.json(about || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about' });
  }
});

// PUT /api/about (admin only)
router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const {
      // Legacy fields (keep for backwards compatibility)
      history, description, mission, vision, core_values, leadership_info,
      
      // Hero Section (6 fields)
      hero_badge_text1, hero_badge_text2, hero_title_line1, hero_title_line2, 
      hero_description, hero_image,
      
      // Mission, Vision, Values Section (9 fields)
      mission_title, mission_description, vision_title, vision_description,
      values_title, values_motto, values_item1, values_item2, values_item3, values_item4,
      
      // Timeline Section (11 fields)
      timeline_section_title, timeline_intro,
      timeline_year1, timeline_title1, timeline_desc1,
      timeline_year2, timeline_title2, timeline_desc2,
      timeline_year3, timeline_title3, timeline_desc3,
      timeline_year4, timeline_title4, timeline_desc4,
      campus_image, campus_badge_number, campus_badge_text,
      
      // Leadership Section (11 fields)
      leadership_section_title, leadership_intro,
      leader1_image, leader1_name, leader1_title, leader1_bio,
      leader2_image, leader2_name, leader2_title, leader2_bio,
      leader3_image, leader3_name, leader3_title, leader3_bio,
      
      // Certification Section (6 fields)
      certification_title, certification_description,
      cert_badge1, cert_badge2,
      cert_item1, cert_item2, cert_item3, cert_item4,
      
      // CTA Section (3 fields)
      cta_title, cta_description, cta_button1_text, cta_button2_text
    } = req.body;
    
    const existing = await getQuery('SELECT id FROM about WHERE id = 1');
    
    if (existing) {
      await runQuery(
        `UPDATE about SET 
          history = ?, description = ?, mission = ?, vision = ?, core_values = ?, leadership_info = ?,
          hero_badge_text1 = ?, hero_badge_text2 = ?, hero_title_line1 = ?, hero_title_line2 = ?, 
          hero_description = ?, hero_image = ?,
          mission_title = ?, mission_description = ?, vision_title = ?, vision_description = ?,
          values_title = ?, values_motto = ?, values_item1 = ?, values_item2 = ?, values_item3 = ?, values_item4 = ?,
          timeline_section_title = ?, timeline_intro = ?,
          timeline_year1 = ?, timeline_title1 = ?, timeline_desc1 = ?,
          timeline_year2 = ?, timeline_title2 = ?, timeline_desc2 = ?,
          timeline_year3 = ?, timeline_title3 = ?, timeline_desc3 = ?,
          timeline_year4 = ?, timeline_title4 = ?, timeline_desc4 = ?,
          campus_image = ?, campus_badge_number = ?, campus_badge_text = ?,
          leadership_section_title = ?, leadership_intro = ?,
          leader1_image = ?, leader1_name = ?, leader1_title = ?, leader1_bio = ?,
          leader2_image = ?, leader2_name = ?, leader2_title = ?, leader2_bio = ?,
          leader3_image = ?, leader3_name = ?, leader3_title = ?, leader3_bio = ?,
          certification_title = ?, certification_description = ?,
          cert_badge1 = ?, cert_badge2 = ?,
          cert_item1 = ?, cert_item2 = ?, cert_item3 = ?, cert_item4 = ?,
          cta_title = ?, cta_description = ?, cta_button1_text = ?, cta_button2_text = ?,
          updated_at = CURRENT_TIMESTAMP 
        WHERE id = 1`,
        [
          history, description, mission, vision, core_values, leadership_info,
          hero_badge_text1, hero_badge_text2, hero_title_line1, hero_title_line2, 
          hero_description, hero_image,
          mission_title, mission_description, vision_title, vision_description,
          values_title, values_motto, values_item1, values_item2, values_item3, values_item4,
          timeline_section_title, timeline_intro,
          timeline_year1, timeline_title1, timeline_desc1,
          timeline_year2, timeline_title2, timeline_desc2,
          timeline_year3, timeline_title3, timeline_desc3,
          timeline_year4, timeline_title4, timeline_desc4,
          campus_image, campus_badge_number, campus_badge_text,
          leadership_section_title, leadership_intro,
          leader1_image, leader1_name, leader1_title, leader1_bio,
          leader2_image, leader2_name, leader2_title, leader2_bio,
          leader3_image, leader3_name, leader3_title, leader3_bio,
          certification_title, certification_description,
          cert_badge1, cert_badge2,
          cert_item1, cert_item2, cert_item3, cert_item4,
          cta_title, cta_description, cta_button1_text, cta_button2_text
        ]
      );
    } else {
      await runQuery(
        `INSERT INTO about (
          history, description, mission, vision, core_values, leadership_info,
          hero_badge_text1, hero_badge_text2, hero_title_line1, hero_title_line2, 
          hero_description, hero_image,
          mission_title, mission_description, vision_title, vision_description,
          values_title, values_motto, values_item1, values_item2, values_item3, values_item4,
          timeline_section_title, timeline_intro,
          timeline_year1, timeline_title1, timeline_desc1,
          timeline_year2, timeline_title2, timeline_desc2,
          timeline_year3, timeline_title3, timeline_desc3,
          timeline_year4, timeline_title4, timeline_desc4,
          campus_image, campus_badge_number, campus_badge_text,
          leadership_section_title, leadership_intro,
          leader1_image, leader1_name, leader1_title, leader1_bio,
          leader2_image, leader2_name, leader2_title, leader2_bio,
          leader3_image, leader3_name, leader3_title, leader3_bio,
          certification_title, certification_description,
          cert_badge1, cert_badge2,
          cert_item1, cert_item2, cert_item3, cert_item4,
          cta_title, cta_description, cta_button1_text, cta_button2_text
        ) VALUES (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?,
          ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?
        )`,
        [
          history, description, mission, vision, core_values, leadership_info,
          hero_badge_text1, hero_badge_text2, hero_title_line1, hero_title_line2, 
          hero_description, hero_image,
          mission_title, mission_description, vision_title, vision_description,
          values_title, values_motto, values_item1, values_item2, values_item3, values_item4,
          timeline_section_title, timeline_intro,
          timeline_year1, timeline_title1, timeline_desc1,
          timeline_year2, timeline_title2, timeline_desc2,
          timeline_year3, timeline_title3, timeline_desc3,
          timeline_year4, timeline_title4, timeline_desc4,
          campus_image, campus_badge_number, campus_badge_text,
          leadership_section_title, leadership_intro,
          leader1_image, leader1_name, leader1_title, leader1_bio,
          leader2_image, leader2_name, leader2_title, leader2_bio,
          leader3_image, leader3_name, leader3_title, leader3_bio,
          certification_title, certification_description,
          cert_badge1, cert_badge2,
          cert_item1, cert_item2, cert_item3, cert_item4,
          cta_title, cta_description, cta_button1_text, cta_button2_text
        ]
      );
    }
    
    res.json({ success: true, message: 'About page updated successfully' });
  } catch (error) {
    console.error('Error updating about:', error);
    res.status(500).json({ error: 'Failed to update about page', details: error.message });
  }
});

module.exports = router;
