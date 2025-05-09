const { Suggestion, User, Upvote, Downvote, Evolution, Notification } = require('../models');

// Create a new suggestion
exports.createSuggestion = async (req, res) => {
  try {
    const { title, description, code, promptId } = req.body;
    const userId = req.user.id;

    const prompt = await Prompt.findByPk(promptId);
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    const suggestion = await Suggestion.create({
      title,
      description,
      code,
      status: 'OPEN',
      promptId,
      authorId: userId,
    });

    // Create evolution record
    await Evolution.create({
      promptId,
      suggestionId: suggestion.id,
      changes: {
        type: 'suggestion',
        from: prompt.code,
        to: code,
        description: `Suggestion: ${title}`,
      },
      authorId: userId,
    });

    // Create notification for prompt author
    await Notification.create({
      type: 'SUGGESTION',
      content: `New suggestion for your prompt: ${title}`,
      userId: prompt.authorId,
      relatedId: suggestion.id,
    });

    // Update user karma for creating a suggestion
    await User.update(
      { karma: user.karma + 2 },
      { where: { id: userId } }
    );

    res.status(201).json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all suggestions for a prompt
exports.getSuggestions = async (req, res) => {
  try {
    const { promptId } = req.params;
    const suggestions = await Suggestion.findAll({
      where: { promptId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email', 'karma'],
        },
        {
          model: Upvote,
          as: 'upvotes',
        },
        {
          model: Downvote,
          as: 'downvotes',
        },
      ],
    });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update suggestion status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const suggestion = await Suggestion.findByPk(id);
    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }

    // Only the prompt author can update the status
    if (suggestion.prompt.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    suggestion.status = status;
    await suggestion.save();

    // If suggestion is accepted, update the prompt and create evolution
    if (status === 'ACCEPTED') {
      const prompt = await Prompt.findByPk(suggestion.promptId);
      prompt.code = suggestion.code;
      prompt.version = prompt.version + 1;
      await prompt.save();

      // Create evolution record
      await Evolution.create({
        promptId: suggestion.promptId,
        suggestionId: suggestion.id,
        changes: {
          type: 'accept',
          from: prompt.code,
          to: suggestion.code,
          description: `Accepted suggestion: ${suggestion.title}`,
        },
        authorId: userId,
      });

      // Update suggestion author's karma
      await User.update(
        { karma: suggestion.author.karma + 10 },
        { where: { id: suggestion.authorId } }
      );
    }

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Vote on a suggestion
exports.vote = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const userId = req.user.id;

    const suggestion = await Suggestion.findByPk(id);
    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }

    // Check if user has already voted
    const existingVote = await Upvote.findOne({
      where: { suggestionId: id, userId },
    });

    if (existingVote) {
      await existingVote.destroy();
      suggestion.karma = suggestion.karma - 1;
    } else {
      await Upvote.create({
        suggestionId: id,
        userId,
      });
      suggestion.karma = suggestion.karma + 1;
    }

    await suggestion.save();
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
