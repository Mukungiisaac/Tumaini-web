const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/children-home - Public endpoint to fetch all children's home content
router.get('/', async (req, res) => {
  try {
    const data = await getQuery('SELECT * FROM childrens_home WHERE id = 1');
    
    if (!data) {
      return res.status(404).json({ error: 'Children home data not found' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching children home data:', error);
    res.status(500).json({ error: 'Failed to fetch children home data' });
  }
});

// PUT /api/children-home - Admin endpoint to update children's home content
router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const {
      // Hero Section (12 fields)
      hero_image,
      hero_badge_title,
      hero_badge_subtitle,
      hero_badge_tag,
      hero_card_badge,
      hero_heading_line1,
      hero_heading_line2,
      hero_description,
      hero_button1_text,
      hero_button2_text,
      hero_social_number,
      hero_social_text,
      
      // Key Stats Section (12 fields)
      stat1_number,
      stat1_title,
      stat1_description,
      stat2_number,
      stat2_title,
      stat2_description,
      stat3_number,
      stat3_title,
      stat3_description,
      stat4_number,
      stat4_title,
      stat4_description,
      
      // Holistic Care Section (15 fields)
      care_section_badge,
      care_section_title,
      care_section_description,
      care1_image,
      care1_badge,
      care1_title,
      care1_description,
      care2_image,
      care2_badge,
      care2_title,
      care2_description,
      care3_image,
      care3_badge,
      care3_title,
      care3_description,
      
      // Safeguarding Section (8 fields)
      safeguarding_image,
      safeguarding_badge,
      safeguarding_title,
      safeguarding_description,
      safeguarding_point1,
      safeguarding_point2,
      safeguarding_point3,
      safeguarding_point4,
      
      // Sponsorship Section (18 fields)
      sponsor_badge,
      sponsor_title,
      sponsor_description,
      tier1_name,
      tier1_price,
      tier1_period,
      tier1_description,
      tier1_button_text,
      tier2_name,
      tier2_price,
      tier2_period,
      tier2_description,
      tier2_button_text,
      tier3_name,
      tier3_price,
      tier3_period,
      tier3_description,
      tier3_button_text,
      
      // Legacy fields (for backward compatibility)
      description,
      programmes,
      activities,
      impact_info,
      statistics,
      support_ways
    } = req.body;

    // Check if record exists
    const existing = await getQuery('SELECT id FROM childrens_home WHERE id = 1');
    
    // Build dynamic UPDATE query
    const updates = [];
    const values = [];
    
    // Hero Section
    if (hero_image !== undefined) { updates.push('hero_image = ?'); values.push(hero_image); }
    if (hero_badge_title !== undefined) { updates.push('hero_badge_title = ?'); values.push(hero_badge_title); }
    if (hero_badge_subtitle !== undefined) { updates.push('hero_badge_subtitle = ?'); values.push(hero_badge_subtitle); }
    if (hero_badge_tag !== undefined) { updates.push('hero_badge_tag = ?'); values.push(hero_badge_tag); }
    if (hero_card_badge !== undefined) { updates.push('hero_card_badge = ?'); values.push(hero_card_badge); }
    if (hero_heading_line1 !== undefined) { updates.push('hero_heading_line1 = ?'); values.push(hero_heading_line1); }
    if (hero_heading_line2 !== undefined) { updates.push('hero_heading_line2 = ?'); values.push(hero_heading_line2); }
    if (hero_description !== undefined) { updates.push('hero_description = ?'); values.push(hero_description); }
    if (hero_button1_text !== undefined) { updates.push('hero_button1_text = ?'); values.push(hero_button1_text); }
    if (hero_button2_text !== undefined) { updates.push('hero_button2_text = ?'); values.push(hero_button2_text); }
    if (hero_social_number !== undefined) { updates.push('hero_social_number = ?'); values.push(hero_social_number); }
    if (hero_social_text !== undefined) { updates.push('hero_social_text = ?'); values.push(hero_social_text); }
    
    // Key Stats Section
    if (stat1_number !== undefined) { updates.push('stat1_number = ?'); values.push(stat1_number); }
    if (stat1_title !== undefined) { updates.push('stat1_title = ?'); values.push(stat1_title); }
    if (stat1_description !== undefined) { updates.push('stat1_description = ?'); values.push(stat1_description); }
    if (stat2_number !== undefined) { updates.push('stat2_number = ?'); values.push(stat2_number); }
    if (stat2_title !== undefined) { updates.push('stat2_title = ?'); values.push(stat2_title); }
    if (stat2_description !== undefined) { updates.push('stat2_description = ?'); values.push(stat2_description); }
    if (stat3_number !== undefined) { updates.push('stat3_number = ?'); values.push(stat3_number); }
    if (stat3_title !== undefined) { updates.push('stat3_title = ?'); values.push(stat3_title); }
    if (stat3_description !== undefined) { updates.push('stat3_description = ?'); values.push(stat3_description); }
    if (stat4_number !== undefined) { updates.push('stat4_number = ?'); values.push(stat4_number); }
    if (stat4_title !== undefined) { updates.push('stat4_title = ?'); values.push(stat4_title); }
    if (stat4_description !== undefined) { updates.push('stat4_description = ?'); values.push(stat4_description); }
    
    // Holistic Care Section
    if (care_section_badge !== undefined) { updates.push('care_section_badge = ?'); values.push(care_section_badge); }
    if (care_section_title !== undefined) { updates.push('care_section_title = ?'); values.push(care_section_title); }
    if (care_section_description !== undefined) { updates.push('care_section_description = ?'); values.push(care_section_description); }
    if (care1_image !== undefined) { updates.push('care1_image = ?'); values.push(care1_image); }
    if (care1_badge !== undefined) { updates.push('care1_badge = ?'); values.push(care1_badge); }
    if (care1_title !== undefined) { updates.push('care1_title = ?'); values.push(care1_title); }
    if (care1_description !== undefined) { updates.push('care1_description = ?'); values.push(care1_description); }
    if (care2_image !== undefined) { updates.push('care2_image = ?'); values.push(care2_image); }
    if (care2_badge !== undefined) { updates.push('care2_badge = ?'); values.push(care2_badge); }
    if (care2_title !== undefined) { updates.push('care2_title = ?'); values.push(care2_title); }
    if (care2_description !== undefined) { updates.push('care2_description = ?'); values.push(care2_description); }
    if (care3_image !== undefined) { updates.push('care3_image = ?'); values.push(care3_image); }
    if (care3_badge !== undefined) { updates.push('care3_badge = ?'); values.push(care3_badge); }
    if (care3_title !== undefined) { updates.push('care3_title = ?'); values.push(care3_title); }
    if (care3_description !== undefined) { updates.push('care3_description = ?'); values.push(care3_description); }
    
    // Safeguarding Section
    if (safeguarding_image !== undefined) { updates.push('safeguarding_image = ?'); values.push(safeguarding_image); }
    if (safeguarding_badge !== undefined) { updates.push('safeguarding_badge = ?'); values.push(safeguarding_badge); }
    if (safeguarding_title !== undefined) { updates.push('safeguarding_title = ?'); values.push(safeguarding_title); }
    if (safeguarding_description !== undefined) { updates.push('safeguarding_description = ?'); values.push(safeguarding_description); }
    if (safeguarding_point1 !== undefined) { updates.push('safeguarding_point1 = ?'); values.push(safeguarding_point1); }
    if (safeguarding_point2 !== undefined) { updates.push('safeguarding_point2 = ?'); values.push(safeguarding_point2); }
    if (safeguarding_point3 !== undefined) { updates.push('safeguarding_point3 = ?'); values.push(safeguarding_point3); }
    if (safeguarding_point4 !== undefined) { updates.push('safeguarding_point4 = ?'); values.push(safeguarding_point4); }
    
    // Sponsorship Section
    if (sponsor_badge !== undefined) { updates.push('sponsor_badge = ?'); values.push(sponsor_badge); }
    if (sponsor_title !== undefined) { updates.push('sponsor_title = ?'); values.push(sponsor_title); }
    if (sponsor_description !== undefined) { updates.push('sponsor_description = ?'); values.push(sponsor_description); }
    if (tier1_name !== undefined) { updates.push('tier1_name = ?'); values.push(tier1_name); }
    if (tier1_price !== undefined) { updates.push('tier1_price = ?'); values.push(tier1_price); }
    if (tier1_period !== undefined) { updates.push('tier1_period = ?'); values.push(tier1_period); }
    if (tier1_description !== undefined) { updates.push('tier1_description = ?'); values.push(tier1_description); }
    if (tier1_button_text !== undefined) { updates.push('tier1_button_text = ?'); values.push(tier1_button_text); }
    if (tier2_name !== undefined) { updates.push('tier2_name = ?'); values.push(tier2_name); }
    if (tier2_price !== undefined) { updates.push('tier2_price = ?'); values.push(tier2_price); }
    if (tier2_period !== undefined) { updates.push('tier2_period = ?'); values.push(tier2_period); }
    if (tier2_description !== undefined) { updates.push('tier2_description = ?'); values.push(tier2_description); }
    if (tier2_button_text !== undefined) { updates.push('tier2_button_text = ?'); values.push(tier2_button_text); }
    if (tier3_name !== undefined) { updates.push('tier3_name = ?'); values.push(tier3_name); }
    if (tier3_price !== undefined) { updates.push('tier3_price = ?'); values.push(tier3_price); }
    if (tier3_period !== undefined) { updates.push('tier3_period = ?'); values.push(tier3_period); }
    if (tier3_description !== undefined) { updates.push('tier3_description = ?'); values.push(tier3_description); }
    if (tier3_button_text !== undefined) { updates.push('tier3_button_text = ?'); values.push(tier3_button_text); }
    
    // Legacy fields
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (programmes !== undefined) { updates.push('programmes = ?'); values.push(programmes); }
    if (activities !== undefined) { updates.push('activities = ?'); values.push(activities); }
    if (impact_info !== undefined) { updates.push('impact_info = ?'); values.push(impact_info); }
    if (statistics !== undefined) { updates.push('statistics = ?'); values.push(statistics); }
    if (support_ways !== undefined) { updates.push('support_ways = ?'); values.push(support_ways); }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    // Always update timestamp
    updates.push('updated_at = CURRENT_TIMESTAMP');
    
    if (existing) {
      const sql = `UPDATE childrens_home SET ${updates.join(', ')} WHERE id = 1`;
      await runQuery(sql, values);
    } else {
      // If no record exists, create one with provided fields
      return res.status(404).json({ error: 'Record not found. Please run migration first.' });
    }
    
    // Fetch updated data
    const updatedData = await getQuery('SELECT * FROM childrens_home WHERE id = 1');
    
    res.json({ 
      success: true, 
      message: 'Children\'s Home content updated successfully',
      data: updatedData
    });
    
  } catch (error) {
    console.error('Error updating children home:', error);
    res.status(500).json({ error: 'Failed to update children home content' });
  }
});

module.exports = router;
