const express = require('express');
const router = express.Router();

// Import controllers
const promptController = require('../controllers/promptController');
const suggestionController = require('../controllers/suggestionController');
const evolutionController = require('../controllers/evolutionController');

// Prompt routes
router.get('/prompts', promptController.getPrompts);
router.get('/prompts/:id', promptController.getPrompt);
router.post('/prompts', promptController.createPrompt);
router.post('/prompts/:id/variations', promptController.createVariation);

// Suggestion routes
router.get('/prompts/:promptId/suggestions', suggestionController.getSuggestions);
router.post('/prompts/:promptId/suggestions', suggestionController.createSuggestion);
router.put('/suggestions/:id/status', suggestionController.updateStatus);
router.post('/suggestions/:id/vote', suggestionController.vote);

// Evolution routes
router.get('/prompts/:promptId/evolution', evolutionController.getEvolution);
router.get('/evolutions/:id', evolutionController.getEvolutionById);
router.post('/evolutions', evolutionController.createEvolution);

module.exports = router;
