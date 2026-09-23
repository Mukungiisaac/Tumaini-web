const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const homepageRoutes = require('./routes/homepage');
const newsRoutes = require('./routes/news');
const galleryRoutes = require('./routes/gallery');
const aboutRoutes = require('./routes/about');
const admissionsRoutes = require('./routes/admissions');
const childrenHomeRoutes = require('./routes/children-home');
const getInvolvedRoutes = require('./routes/get-involved');
const contactRoutes = require('./routes/contact');
const settingsRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/upload');

// Initialize database
const { initializeDatabase } = require('./database/init');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or file://)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
      'http://localhost:8000',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:8000',
      'http://127.0.0.1:8080',
      process.env.FRONTEND_URL || 'http://localhost'
    ];
    
    // Allow any localhost origin in development
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin-assets', express.static(path.join(__dirname, '../admin/assets')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/admissions', admissionsRoutes);
app.use('/api/children-home', childrenHomeRoutes);
app.use('/api/get-involved', getInvolvedRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'Unauthorized') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (err.message === 'Forbidden') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Tumaini CMS Backend running on port ${PORT}`);
    console.log(`📊 API Documentation available at http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = app;
