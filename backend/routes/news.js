const express = require('express');
const { getQuery, runQuery, allQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

const pageSettingFields = [
  'page_badge', 'page_title', 'page_description',
  'stat1_value', 'stat1_label', 'stat2_value', 'stat2_label',
  'stat3_value', 'stat3_label', 'stat4_value', 'stat4_label'
];

// GET /api/news/settings - Get public News page settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await getQuery('SELECT page_badge, page_title, page_description, stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label, stat4_value, stat4_label, content_json FROM news_page_settings WHERE id = 1');
    res.json(settings || {});
  } catch (error) {
    console.error('News settings fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch News page settings' });
  }
});

// PUT /api/news/settings - Update public News page settings
router.put('/settings', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const values = pageSettingFields.map(field => req.body[field] || '');
    values.push(JSON.stringify(req.body.content || {}));
    const assignments = pageSettingFields.map(field => `${field} = ?`).join(', ');
    await runQuery(`UPDATE news_page_settings SET ${assignments}, content_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1`, values);
    res.json({ success: true, message: 'News page settings updated' });
  } catch (error) {
    console.error('News settings update error:', error);
    res.status(500).json({ error: 'Failed to update News page settings' });
  }
});

// Helper to generate slug
const generateSlug = (title) => {
  return title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
};

// GET /api/news - Get all published news (public)
router.get('/', async (req, res) => {
  try {
    const news = await allQuery(
      'SELECT * FROM news WHERE status = ? ORDER BY publication_date DESC',
      ['published']
    );
    res.json(news || []);
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// GET /api/news/all - Get all news including drafts (admin only)
router.get('/all', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const news = await allQuery(
      'SELECT * FROM news ORDER BY created_at DESC'
    );
    res.json(news || []);
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// GET /api/news/admin/:id - Get single news by ID (admin only)
router.get('/admin/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const article = await getQuery(
      'SELECT * FROM news WHERE id = ?',
      [req.params.id]
    );

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Article fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// GET /api/news/:slug - Get single news article (public)
router.get('/:slug', async (req, res) => {
  try {
    const article = await getQuery(
      'SELECT * FROM news WHERE slug = ? AND status = ?',
      [req.params.slug, 'published']
    );

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Article fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST /api/news - Create news article (admin only)
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, category, content, featured_image, status = 'draft' } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const slug = generateSlug(title);

    await runQuery(
      `INSERT INTO news (title, slug, category, author, content, featured_image, status, publication_date, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        title,
        slug,
        category || 'General',
        req.user.first_name + ' ' + req.user.last_name,
        content,
        featured_image || null,
        status,
        status === 'published' ? new Date().toISOString() : null
      ]
    );

    res.status(201).json({ success: true, message: 'News article created', slug });
  } catch (error) {
    console.error('News creation error:', error);
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// PUT /api/news/:id - Update news article (admin only)
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, category, content, featured_image, status } = req.body;

    const article = await getQuery('SELECT * FROM news WHERE id = ?', [req.params.id]);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const slug = title ? generateSlug(title) : article.slug;

    await runQuery(
      `UPDATE news SET 
        title = ?,
        slug = ?,
        category = ?,
        content = ?,
        featured_image = ?,
        status = ?,
        publication_date = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        title || article.title,
        slug,
        category || article.category,
        content || article.content,
        featured_image !== undefined ? featured_image : article.featured_image,
        status || article.status,
        status === 'published' && article.status !== 'published' ? new Date().toISOString() : article.publication_date,
        req.params.id
      ]
    );

    res.json({ success: true, message: 'News article updated' });
  } catch (error) {
    console.error('News update error:', error);
    res.status(500).json({ error: 'Failed to update news article' });
  }
});

// DELETE /api/news/:id - Delete news article (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const article = await getQuery('SELECT * FROM news WHERE id = ?', [req.params.id]);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await runQuery('DELETE FROM news WHERE id = ?', [req.params.id]);

    res.json({ success: true, message: 'News article deleted' });
  } catch (error) {
    console.error('News deletion error:', error);
    res.status(500).json({ error: 'Failed to delete news article' });
  }
});

module.exports = router;
