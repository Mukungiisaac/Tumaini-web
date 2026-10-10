const { supabase } = require('../../lib/supabase');
const { createHandler, parseBody } = require('../../lib/api-helper');
const { withAuth } = require('../../lib/supabase-auth-middleware');

// GET - Fetch all settings (admin only)
const handleGet = withAuth(async (req, res) => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .order('setting_key', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Convert array to key-value object
  const settingsObject = {};
  data.forEach(setting => {
    settingsObject[setting.setting_key] = setting.setting_value;
  });

  res.json(settingsObject);
});

// PUT - Update settings (admin only)
const handlePut = withAuth(async (req, res) => {
  await parseBody(req);
  const settings = req.body;

  try {
    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
      const { error } = await supabase
        .from('settings')
        .upsert({ 
          setting_key: key, 
          setting_value: value 
        }, { 
          onConflict: 'setting_key' 
        });

      if (error) throw error;
    }

    res.json({ success: true, message: 'Settings updated successfully', updatedBy: req.user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = createHandler({
  get: handleGet,
  put: handlePut
});
