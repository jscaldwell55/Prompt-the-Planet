const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// @route   GET /api/search
// @desc    Search prompts
// @access  Public
router.get('/', searchController.searchPrompts);

module.exports = router;