const { Prompt } = require('../models');

// Get all prompts
// Get all prompts or by user
exports.getPrompts = async (req, res) => {
    try {
      const userId = req.query.user;
      
      let query = {};
      if (userId) {
        query.user = userId;
      }
      
      const prompts = await Prompt.find(query)
        .sort({ createdAt: -1 })
        .populate('user', 'name avatar');
      
      res.json(prompts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get prompt by ID
exports.getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id)
      .populate('user', 'name avatar');

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    res.json(prompt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get prompts by user ID
exports.getPromptsByUser = async (req, res) => {
    try {
      const userId = req.query.user;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const prompts = await Prompt.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate('user', 'name avatar');
      
      res.json(prompts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Create prompt
exports.createPrompt = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newPrompt = new Prompt({
      title,
      content,
      tags,
      user: req.user.id
    });

    const prompt = await newPrompt.save();
    res.status(201).json(prompt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update prompt
exports.updatePrompt = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    let prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    if (prompt.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    prompt.title = title || prompt.title;
    prompt.content = content || prompt.content;
    prompt.tags = tags || prompt.tags;

    await prompt.save();
    res.json(prompt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete prompt
exports.deletePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    if (prompt.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await prompt.remove();
    res.json({ message: 'Prompt removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Vote on prompt
exports.votePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body; // 'up' or 'down'

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    const upvoteIndex = prompt.upvotes.indexOf(req.user.id);
    const downvoteIndex = prompt.downvotes.indexOf(req.user.id);

    if (upvoteIndex > -1) prompt.upvotes.splice(upvoteIndex, 1);
    if (downvoteIndex > -1) prompt.downvotes.splice(downvoteIndex, 1);

    if (voteType === 'up') {
      prompt.upvotes.push(req.user.id);
    } else if (voteType === 'down') {
      prompt.downvotes.push(req.user.id);
    }

    await prompt.save();

    res.json({
      upvotes: prompt.upvotes.length,
      downvotes: prompt.downvotes.length,
      voteCount: prompt.upvotes.length - prompt.downvotes.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
