const { PullRequest, Comment, Upvote, Downvote } = require('../models');

// Create pull request
exports.createPullRequest = async (req, res) => {
  try {
    const { promptId, title, description, code } = req.body;
    const userId = req.user.id;

    const newPullRequest = new PullRequest({
      title,
      description,
      code,
      status: 'OPEN',
      authorId: userId,
      promptId,
    });

    const pullRequest = await newPullRequest.save();

    // Update prompt's pull request count
    const prompt = await Prompt.findById(promptId);
    if (prompt) {
      prompt.pullRequests.push(pullRequest._id);
      await prompt.save();
    }

    // Update user karma
    const user = await User.findById(userId);
    user.karma += 15; // Initial karma for creating a pull request
    await user.save();

    res.status(201).json(pullRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get pull requests for a prompt
exports.getPullRequests = async (req, res) => {
  try {
    const { promptId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const pullRequests = await PullRequest.find({ promptId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name picture')
      .populate('upvotes', 'user')
      .populate('downvotes', 'user')
      .populate('comments', 'author content');

    const total = await PullRequest.countDocuments({ promptId });
    
    res.json({
      pullRequests,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update pull request status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const pullRequest = await PullRequest.findById(id);
    const prompt = await Prompt.findById(pullRequest.promptId);

    if (!pullRequest) {
      return res.status(404).json({ message: 'Pull request not found' });
    }

    if (prompt.authorId !== userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    pullRequest.status = status;
    await pullRequest.save();

    // If accepted, update prompt code
    if (status === 'ACCEPTED') {
      prompt.code = pullRequest.code;
      prompt.version += 1;
      await prompt.save();

      // Update karma for both author and pull request creator
      const author = await User.findById(prompt.authorId);
      const prCreator = await User.findById(pullRequest.authorId);
      
      author.karma += 20;
      prCreator.karma += 20;
      
      await Promise.all([author.save(), prCreator.save()]);
    }

    res.json(pullRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create comment on pull request
exports.createComment = async (req, res) => {
  try {
    const { pullRequestId, content } = req.body;
    const userId = req.user.id;

    const newComment = new Comment({
      content,
      authorId: userId,
      pullRequestId,
    });

    const comment = await newComment.save();

    // Update pull request's comment count
    const pullRequest = await PullRequest.findById(pullRequestId);
    if (pullRequest) {
      pullRequest.comments.push(comment._id);
      await pullRequest.save();
    }

    // Update user karma
    const user = await User.findById(userId);
    user.karma += 3; // Initial karma for creating a pull request comment
    await user.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
