const express = require('express');
const router = express.Router();
const { getAnalysis } = require('../controllers/analysisController');
const { authMiddleware } = require('../middleware/authMiddleware');

// This route is protected. You must have a valid token to access it.
router.get('/', authMiddleware, getAnalysis);

module.exports = router;
