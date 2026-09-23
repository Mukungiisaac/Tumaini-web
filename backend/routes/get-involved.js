const express = require('express');
const { getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await getQuery('SELECT * FROM get_involved WHERE id = 1');
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { donation_info, volunteer_info, partnership_info, sponsorship_info, support_ways, donation_instructions, contact_info } = req.body;
    const existing = await getQuery('SELECT id FROM get_involved WHERE id = 1');
    
    if (existing) {
      await runQuery(
        `UPDATE get_involved SET donation_info = ?, volunteer_info = ?, partnership_info = ?, sponsorship_info = ?, support_ways = ?, donation_instructions = ?, contact_info = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1`,
        [donation_info, volunteer_info, partnership_info, sponsorship_info, support_ways, donation_instructions, contact_info]
      );
    } else {
      await runQuery(
        `INSERT INTO get_involved (donation_info, volunteer_info, partnership_info, sponsorship_info, support_ways, donation_instructions, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [donation_info, volunteer_info, partnership_info, sponsorship_info, support_ways, donation_instructions, contact_info]
      );
    }
    
    res.json({ success: true, message: 'Updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
