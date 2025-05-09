const express = require('express');
const router = express.Router();
const pullRequestController = require('../controllers/pullRequestController');
const auth = require('../middleware/auth');

// Create pull request
router.post('/', auth, pullRequestController.createPullRequest);

// Get pull requests for a prompt
router.get('/:promptId', pullRequestController.getPullRequests);

// Update pull request status
router.put('/:id/status', auth, pullRequestController.updateStatus);

// Create comment on pull request
router.post('/:pullRequestId/comment', auth, pullRequestController.createComment);

module.exports = router;
