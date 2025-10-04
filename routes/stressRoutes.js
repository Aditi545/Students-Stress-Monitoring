const express = require('express');
const router = express.Router();
const { createStressEntry, getStressEntries } = require('../controllers/stressController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Apply the middleware to both routes
router.route('/').post(authMiddleware, createStressEntry).get(authMiddleware, getStressEntries);

module.exports = router;
