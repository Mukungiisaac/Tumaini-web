const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await getQuery('SELECT * FROM contact WHERE id = 1');
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { phone_primary, phone_secondary, email_primary, email_secondary, physical_address, office_hours, social_media, google_maps_link } = req.body;
    const existing = await getQuery('SELECT id FROM contact WHERE id = 1');
    
    if (existing) {
      await runQuery(
        `UPDATE contact SET phone_primary = ?, phone_secondary = ?, email_primary = ?, email_secondary = ?, physical_address = ?, office_hours = ?, social_media = ?, google_maps_link = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1`,
        [phone_primary, phone_secondary, email_primary, email_secondary, physical_address, office_hours, social_media, google_maps_link]
      );
    } else {
      await runQuery(
        `INSERT INTO contact (phone_primary, phone_secondary, email_primary, email_secondary, physical_address, office_hours, social_media, google_maps_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [phone_primary, phone_secondary, email_primary, email_secondary, physical_address, office_hours, social_media, google_maps_link]
      );
    }
    
    res.json({ success: true, message: 'Updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
