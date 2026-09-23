const express = require('express');
const { allQuery, getQuery, runQuery } = require('../database/init');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/gallery - Get all published gallery images (public)
router.get('/', async (req, res) => {
  try {
    const images = await allQuery(
      `SELECT gi.*, gc.name as category_name FROM gallery_images gi
       LEFT JOIN gallery_categories gc ON gi.category_id = gc.id
       WHERE gi.is_published = 1 ORDER BY gi.created_at DESC`
    );
    res.json(images || []);
  } catch (error) {
    console.error('Gallery fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// GET /api/gallery/categories - Get all categories (public)
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await allQuery('SELECT * FROM gallery_categories ORDER BY name');
    res.json(categories || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/gallery/all - Get all images including unpublished (admin only)
router.get('/all', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const images = await allQuery(
      `SELECT gi.*, gc.name as category_name FROM gallery_images gi
       LEFT JOIN gallery_categories gc ON gi.category_id = gc.id
       ORDER BY gi.created_at DESC`
    );
    res.json(images || []);
  } catch (error) {
    console.error('Gallery fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// GET /api/gallery/:id - Get single image (admin only)
router.get('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const image = await getQuery('SELECT * FROM gallery_images WHERE id = ?', [req.params.id]);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// POST /api/gallery - Add new gallery image (admin only)
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, description, image_url, category_id, location, is_published = 1 } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ error: 'Title and image URL are required' });
    }

    await runQuery(
      `INSERT INTO gallery_images (title, description, image_url, category_id, location, is_published, created_at)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [title, description, image_url, category_id, location, is_published ? 1 : 0]
    );

    res.status(201).json({ success: true, message: 'Image added to gallery' });
  } catch (error) {
    console.error('Gallery creation error:', error);
    res.status(500).json({ error: 'Failed to add image' });
  }
});

// PUT /api/gallery/:id - Update gallery image (admin only)
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, description, image_url, category_id, location, is_published } = req.body;

    const image = await getQuery('SELECT * FROM gallery_images WHERE id = ?', [req.params.id]);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    await runQuery(
      `UPDATE gallery_images SET 
        title = ?,
        description = ?,
        image_url = ?,
        category_id = ?,
        location = ?,
        is_published = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        title || image.title,
        description || image.description,
        image_url || image.image_url,
        category_id !== undefined ? category_id : image.category_id,
        location || image.location,
        is_published !== undefined ? (is_published ? 1 : 0) : image.is_published,
        req.params.id
      ]
    );

    res.json({ success: true, message: 'Image updated' });
  } catch (error) {
    console.error('Gallery update error:', error);
    res.status(500).json({ error: 'Failed to update image' });
  }
});

// DELETE /api/gallery/:id - Delete gallery image (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const image = await getQuery('SELECT * FROM gallery_images WHERE id = ?', [req.params.id]);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    await runQuery('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);

    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('Gallery deletion error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// POST /api/gallery/categories - Create category (admin only)
router.post('/categories', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    await runQuery(
      'INSERT INTO gallery_categories (name, description) VALUES (?, ?)',
      [name, description]
    );

    res.status(201).json({ success: true, message: 'Category created' });
  } catch (error) {
    console.error('Category creation error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

module.exports = router;
