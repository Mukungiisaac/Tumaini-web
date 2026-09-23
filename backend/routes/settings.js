const express = require('express');
const { allQuery, getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const settings = await allQuery('SELECT setting_key, setting_value FROM settings');
    const settingsObj = {};
    settings?.forEach(s => {
      settingsObj[s.setting_key] = s.setting_value;
    });
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const settings = req.body;
    
    for (const [key, value] of Object.entries(settings)) {
      const existing = await getQuery('SELECT id FROM settings WHERE setting_key = ?', [key]);
      
      if (existing) {
        await runQuery('UPDATE settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?', [value, key]);
      } else {
        await runQuery('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)', [key, value]);
      }
    }
    
    res.json({ success: true, message: 'Settings updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
