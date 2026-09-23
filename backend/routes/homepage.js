const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/homepage - Get homepage content (public)
router.get('/', async (req, res) => {
  try {
    const homepage = await getQuery('SELECT * FROM homepage WHERE id = 1');
    
    if (!homepage) {
      // Return default values if no data exists
      return res.json({
        id: 1,
        // Hero Section
        hero_image: null,
        hero_badge: 'Tumaini Comprehensive School',
        hero_title: 'Empowering Young Minds',
        hero_description: 'Education and residential care for vulnerable children',
        hero_button_primary: 'Learn More',
        hero_button_primary_link: '/about',
        hero_button_secondary: 'Get Involved',
        hero_button_secondary_link: '/get-involved',
        hero_social_proof_text: 'Join 450+ students on their journey to excellence',
        
        // Statistics
        stat_students: '450+',
        stat_students_label: 'Empowered Students',
        stat_pass_rate: '98%',
        stat_pass_rate_label: 'Examination Pass Rate',
        stat_children_residence: '120+',
        stat_children_label: 'Children in Residence',
        stat_awards: '15+',
        stat_awards_label: 'Co-Curricular Awards',
        
        // Holistic Approach Section
        holistic_badge: 'Our Foundation',
        holistic_title: 'A Holistic Approach to Learning and Living',
        holistic_description: 'At Tumaini, we believe that education is more than just textbooks.',
        holistic_feature_1: 'Nationally recognized academic curriculum',
        holistic_feature_2: 'Safe and modern residential housing facilities',
        holistic_feature_3: 'Holistic character development and mentorship',
        holistic_feature_4: 'Thriving sports and arts programs',
        holistic_button_text: 'Explore Our Programs',
        holistic_button_link: '/about.html',
        holistic_image: 'assets/images/in-class.png',
        holistic_badge_top: 'Quality Education',
        holistic_badge_bottom: 'Since 2010',
        
        // Pillars Section
        pillars_title: 'Pillars of Our Excellence',
        pillars_subtitle: 'We provide a comprehensive ecosystem designed to support growth.',
        pillar_1_title: 'Academic Rigor',
        pillar_1_description: 'Our curriculum is designed to challenge students.',
        pillar_2_title: 'Residential Care',
        pillar_2_description: 'A home away from home.',
        pillar_3_title: 'Community Impact',
        pillar_3_description: 'We believe in the power of community.',
        
        // News Section
        news_section_title: 'Latest from Our School',
        news_section_subtitle: 'Stay updated with the vibrant life at Tumaini.',
        news_section_button_text: 'View All News',
        
        // Testimonial Section
        testimonial_quote: 'Tumaini gave my daughter a future she never thought possible.',
        testimonial_author: 'Sarah Mwikali',
        testimonial_author_title: 'Parent of Class 8 Graduate',
        testimonial_author_image: 'assets/images/testimonial-sarah.jpg',
        
        // Bottom CTA
        cta_title: 'Invest in the Leaders of Tomorrow',
        cta_description: 'Whether you are a prospective parent, a community partner, or a donor.',
        cta_button_1_text: 'Apply for Admission',
        cta_button_1_link: '/admissions.html',
        cta_button_2_text: 'Partner with Us',
        cta_button_2_link: '/contact.html'
      });
    }

    res.json(homepage);
  } catch (error) {
    console.error('Homepage fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch homepage' });
  }
});

// PUT /api/homepage - Update homepage content (admin only)
router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const {
      // Hero Section
      hero_image,
      hero_badge,
      hero_title,
      hero_description,
      hero_button_primary,
      hero_button_primary_link,
      hero_button_secondary,
      hero_button_secondary_link,
      hero_social_proof_text,
      
      // Statistics
      stat_students,
      stat_students_label,
      stat_pass_rate,
      stat_pass_rate_label,
      stat_children_residence,
      stat_children_label,
      stat_awards,
      stat_awards_label,
      
      // Holistic Approach Section
      holistic_badge,
      holistic_title,
      holistic_description,
      holistic_feature_1,
      holistic_feature_2,
      holistic_feature_3,
      holistic_feature_4,
      holistic_button_text,
      holistic_button_link,
      holistic_image,
      holistic_badge_top,
      holistic_badge_bottom,
      
      // Pillars Section
      pillars_title,
      pillars_subtitle,
      pillar_1_title,
      pillar_1_description,
      pillar_2_title,
      pillar_2_description,
      pillar_3_title,
      pillar_3_description,
      
      // News Section
      news_section_title,
      news_section_subtitle,
      news_section_button_text,
      
      // Testimonial Section
      testimonial_quote,
      testimonial_author,
      testimonial_author_title,
      testimonial_author_image,
      
      // Bottom CTA
      cta_title,
      cta_description,
      cta_button_1_text,
      cta_button_1_link,
      cta_button_2_text,
      cta_button_2_link
    } = req.body;

    // Check if homepage exists
    const existing = await getQuery('SELECT id FROM homepage WHERE id = 1');

    if (existing) {
      await runQuery(
        `UPDATE homepage SET 
          hero_image = ?,
          hero_badge = ?,
          hero_title = ?,
          hero_description = ?,
          hero_button_primary = ?,
          hero_button_primary_link = ?,
          hero_button_secondary = ?,
          hero_button_secondary_link = ?,
          hero_social_proof_text = ?,
          stat_students = ?,
          stat_students_label = ?,
          stat_pass_rate = ?,
          stat_pass_rate_label = ?,
          stat_children_residence = ?,
          stat_children_label = ?,
          stat_awards = ?,
          stat_awards_label = ?,
          holistic_badge = ?,
          holistic_title = ?,
          holistic_description = ?,
          holistic_feature_1 = ?,
          holistic_feature_2 = ?,
          holistic_feature_3 = ?,
          holistic_feature_4 = ?,
          holistic_button_text = ?,
          holistic_button_link = ?,
          holistic_image = ?,
          holistic_badge_top = ?,
          holistic_badge_bottom = ?,
          pillars_title = ?,
          pillars_subtitle = ?,
          pillar_1_title = ?,
          pillar_1_description = ?,
          pillar_2_title = ?,
          pillar_2_description = ?,
          pillar_3_title = ?,
          pillar_3_description = ?,
          news_section_title = ?,
          news_section_subtitle = ?,
          news_section_button_text = ?,
          testimonial_quote = ?,
          testimonial_author = ?,
          testimonial_author_title = ?,
          testimonial_author_image = ?,
          cta_title = ?,
          cta_description = ?,
          cta_button_1_text = ?,
          cta_button_1_link = ?,
          cta_button_2_text = ?,
          cta_button_2_link = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = 1`,
        [
          hero_image,
          hero_badge,
          hero_title,
          hero_description,
          hero_button_primary,
          hero_button_primary_link,
          hero_button_secondary,
          hero_button_secondary_link,
          hero_social_proof_text,
          stat_students,
          stat_students_label,
          stat_pass_rate,
          stat_pass_rate_label,
          stat_children_residence,
          stat_children_label,
          stat_awards,
          stat_awards_label,
          holistic_badge,
          holistic_title,
          holistic_description,
          holistic_feature_1,
          holistic_feature_2,
          holistic_feature_3,
          holistic_feature_4,
          holistic_button_text,
          holistic_button_link,
          holistic_image,
          holistic_badge_top,
          holistic_badge_bottom,
          pillars_title,
          pillars_subtitle,
          pillar_1_title,
          pillar_1_description,
          pillar_2_title,
          pillar_2_description,
          pillar_3_title,
          pillar_3_description,
          news_section_title,
          news_section_subtitle,
          news_section_button_text,
          testimonial_quote,
          testimonial_author,
          testimonial_author_title,
          testimonial_author_image,
          cta_title,
          cta_description,
          cta_button_1_text,
          cta_button_1_link,
          cta_button_2_text,
          cta_button_2_link
        ]
      );
    } else {
      await runQuery(
        `INSERT INTO homepage (
          hero_image,
          hero_badge,
          hero_title,
          hero_description,
          hero_button_primary,
          hero_button_primary_link,
          hero_button_secondary,
          hero_button_secondary_link,
          hero_social_proof_text,
          stat_students,
          stat_students_label,
          stat_pass_rate,
          stat_pass_rate_label,
          stat_children_residence,
          stat_children_label,
          stat_awards,
          stat_awards_label,
          holistic_badge,
          holistic_title,
          holistic_description,
          holistic_feature_1,
          holistic_feature_2,
          holistic_feature_3,
          holistic_feature_4,
          holistic_button_text,
          holistic_button_link,
          holistic_image,
          holistic_badge_top,
          holistic_badge_bottom,
          pillars_title,
          pillars_subtitle,
          pillar_1_title,
          pillar_1_description,
          pillar_2_title,
          pillar_2_description,
          pillar_3_title,
          pillar_3_description,
          news_section_title,
          news_section_subtitle,
          news_section_button_text,
          testimonial_quote,
          testimonial_author,
          testimonial_author_title,
          testimonial_author_image,
          cta_title,
          cta_description,
          cta_button_1_text,
          cta_button_1_link,
          cta_button_2_text,
          cta_button_2_link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          hero_image,
          hero_badge,
          hero_title,
          hero_description,
          hero_button_primary,
          hero_button_primary_link,
          hero_button_secondary,
          hero_button_secondary_link,
          hero_social_proof_text,
          stat_students,
          stat_students_label,
          stat_pass_rate,
          stat_pass_rate_label,
          stat_children_residence,
          stat_children_label,
          stat_awards,
          stat_awards_label,
          holistic_badge,
          holistic_title,
          holistic_description,
          holistic_feature_1,
          holistic_feature_2,
          holistic_feature_3,
          holistic_feature_4,
          holistic_button_text,
          holistic_button_link,
          holistic_image,
          holistic_badge_top,
          holistic_badge_bottom,
          pillars_title,
          pillars_subtitle,
          pillar_1_title,
          pillar_1_description,
          pillar_2_title,
          pillar_2_description,
          pillar_3_title,
          pillar_3_description,
          news_section_title,
          news_section_subtitle,
          news_section_button_text,
          testimonial_quote,
          testimonial_author,
          testimonial_author_title,
          testimonial_author_image,
          cta_title,
          cta_description,
          cta_button_1_text,
          cta_button_1_link,
          cta_button_2_text,
          cta_button_2_link
        ]
      );
    }

    res.json({ success: true, message: 'Homepage updated successfully' });
  } catch (error) {
    console.error('Homepage update error:', error);
    res.status(500).json({ error: 'Failed to update homepage' });
  }
});

module.exports = router;
