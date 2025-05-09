const { Prompt, User, Comment, Upvote, Downvote, Follow, Suggestion, Evolution, Notification } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { SyntaxHighlighter } = require('react-syntax-highlighter');
const { docco } = require('react-syntax-highlighter/dist/esm/styles/hljs');

// Get all prompts with sorting and search
exports.getPrompts = async (req, res) => {
  try {
    const { sort = 'hot', search = '', page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOptions = {};
    switch (sort) {
      case 'hot':
        sortOptions = { karma: -1, createdAt: -1 };
        break;
      case 'new':
        sortOptions = { createdAt: -1 };
        break;
      case 'top':
        sortOptions = { karma: -1 };
        break;
    }

    const prompts = await Prompt.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate('author', 'name picture')
      .populate('upvotes', 'user')
      .populate('downvotes', 'user')
      .populate('comments', 'author content')
      .populate('forks', 'author title')
      .populate('pullRequests', 'author title');

    const total = await Prompt.countDocuments(query);
    
    res.json({
      prompts,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
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
    const { title, description, code, language } = req.body;
    const userId = req.user.id;

    const prompt = await Prompt.create({
      title,
      description,
      code,
      language,
      authorId: userId,
    });

    // Update user karma for creating a prompt
    await User.update(
      { karma: user.karma + 5 },
      { where: { id: userId } }
    );
    
    // Update user karma
    const user = await User.findById(userId);
    user.karma += 10; // Initial karma for creating a prompt
    await user.save();

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
    const userId = req.user.id;

    const prompt = await Prompt.findById(id);
    const user = await User.findById(userId);

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    // Check if user has already voted
    const existingUpvote = await Upvote.findOne({
      userId,
      promptId: id,
    });

    const existingDownvote = await Downvote.findOne({
      userId,
      promptId: id,
    });

    // Remove existing vote if present
    if (voteType === 'up' && existingUpvote) {
      await existingUpvote.deleteOne();
      prompt.karma -= 1;
    } else if (voteType === 'down' && existingDownvote) {
      await existingDownvote.deleteOne();
      prompt.karma += 1;
    }

    // Create new vote
    if (voteType === 'up' && !existingUpvote) {
      const upvote = new Upvote({
        userId,
        promptId: id,
      });
      await upvote.save();
      prompt.karma += 1;
      user.karma += 1;
    } else if (voteType === 'down' && !existingDownvote) {
      const downvote = new Downvote({
        userId,
        promptId: id,
      });
      await downvote.save();
      prompt.karma -= 1;
      user.karma -= 1;
    }

    await Promise.all([prompt.save(), user.save()]);

    res.json({
      karma: prompt.karma,
      userKarma: user.karma,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
