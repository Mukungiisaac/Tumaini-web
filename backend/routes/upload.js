const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save to assets/images folder (one level up from backend)
    const uploadPath = path.join(__dirname, '../../assets/images');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    // Sanitize filename
    const sanitizedName = nameWithoutExt.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    cb(null, sanitizedName + '-' + uniqueSuffix + ext);
  }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|jfif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, jfif)'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  fileFilter: fileFilter
});

// POST /api/upload - Upload image (admin only)
router.post('/', authenticateToken, authorizeAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the relative path that can be used in src attributes
    const imagePath = `assets/images/${req.file.filename}`;

    // Remove the replaced local image after the new upload succeeds.
    const oldImage = req.body.oldImage;
    if (oldImage) {
      const oldFilename = path.basename(oldImage);
      const oldFilePath = path.join(__dirname, '../../assets/images', oldFilename);
      if (oldImage.startsWith('assets/images/') && oldFilename !== req.file.filename && fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      filename: req.file.filename,
      path: imagePath,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// GET /api/upload/images - List all uploaded images (admin only)
router.get('/images', authenticateToken, authorizeAdmin, (req, res) => {
  try {
    const imagesPath = path.join(__dirname, '../../assets/images');
    
    if (!fs.existsSync(imagesPath)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(imagesPath);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        path: `assets/images/${file}`,
        url: `/assets/images/${file}`
      }));

    res.json({ images });
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({ error: 'Failed to list images' });
  }
});

// DELETE /api/upload/:filename - Delete image (admin only)
router.delete('/:filename', authenticateToken, authorizeAdmin, (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../assets/images', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filePath);
    
    res.json({
      success: true,
      message: 'Image deleted successfully',
      filename: filename
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
