const { Evolution, Prompt, Suggestion, User } = require('../models');

// Get evolution history for a prompt
exports.getEvolution = async (req, res) => {
  try {
    const { promptId } = req.params;
    const evolutions = await Evolution.findAll({
      where: { promptId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email', 'karma'],
        },
        {
          model: Suggestion,
          as: 'suggestion',
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name', 'email', 'karma'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(evolutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific evolution
exports.getEvolutionById = async (req, res) => {
  try {
    const { id } = req.params;
    const evolution = await Evolution.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email', 'karma'],
        },
        {
          model: Suggestion,
          as: 'suggestion',
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name', 'email', 'karma'],
            },
          ],
        },
      ],
    });
    if (!evolution) {
      return res.status(404).json({ error: 'Evolution not found' });
    }
    res.json(evolution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new evolution record
exports.createEvolution = async (req, res) => {
  try {
    const { promptId, suggestionId, changes, description } = req.body;
    const userId = req.user.id;

    const evolution = await Evolution.create({
      promptId,
      suggestionId,
      changes,
      description,
      authorId: userId,
    });

    // Create notification for prompt author
    const prompt = await Prompt.findByPk(promptId);
    await Notification.create({
      type: 'EVOLUTION',
      content: `New evolution for your prompt: ${description}`,
      userId: prompt.authorId,
      relatedId: evolution.id,
    });

    res.status(201).json(evolution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
