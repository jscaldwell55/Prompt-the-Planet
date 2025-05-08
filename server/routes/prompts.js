const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');
const auth = require('../middleware/auth');

// @route   GET /api/prompts
// @desc    Get all prompts
// @access  Public
router.get('/', promptController.getPrompts);

// @route   GET /api/prompts/:id
// @desc    Get prompt by ID
// @access  Public
router.get('/:id', promptController.getPromptById);

// @route   POST /api/prompts
// @desc    Create a prompt
// @access  Private
router.post('/', auth, promptController.createPrompt);

// @route   PUT /api/prompts/:id
// @desc    Update a prompt
// @access  Private
router.put('/:id', auth, promptController.updatePrompt);

// @route   DELETE /api/prompts/:id
// @desc    Delete a prompt
// @access  Private
router.delete('/:id', auth, promptController.deletePrompt);

// @route   POST /api/prompts/:id/vote
// @desc    Vote on a prompt
// @access  Private
router.post('/:id/vote', auth, promptController.votePrompt);

module.exports = router;