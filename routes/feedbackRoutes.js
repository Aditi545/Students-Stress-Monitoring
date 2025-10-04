const express = require('express');
const router = express.Router();
const { 
  createFeedback, 
  getUserFeedback, 
  getFeedbackStats, 
  updateFeedbackStatus 
} = require('../controllers/feedbackController');
const { authMiddleware } = require('../middleware/authMiddleware');

console.log('✅ feedbackRoutes.js was loaded');

// 🎨 Feedback Routes with Beautiful Styling

// 📝 Submit New Feedback
router.post('/', authMiddleware, createFeedback);

// 📋 Get User's Feedback History
router.get('/', authMiddleware, getUserFeedback);

// 📊 Get Feedback Statistics
router.get('/stats', authMiddleware, getFeedbackStats);

// 🔄 Update Feedback Status
router.put('/:id', authMiddleware, updateFeedbackStatus);

// 🎯 Health Check for Feedback System
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: "🎨 Feedback API is running beautifully!",
    timestamp: new Date().toISOString(),
    endpoints: {
      'POST /': 'Submit new feedback',
      'GET /': 'Get user feedback history',
      'GET /stats': 'Get feedback statistics',
      'PUT /:id': 'Update feedback status',
      'GET /health': 'Health check'
    }
  });
});

module.exports = router;
