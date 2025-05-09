const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Get comments for a prompt
router.get('/:promptId', commentController.getComments);

// Create comment
router.post('/', auth, commentController.createComment);

// Vote on comment
router.post('/:id/vote', auth, commentController.voteComment);

module.exports = router;
