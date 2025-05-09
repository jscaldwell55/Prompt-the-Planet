const { Comment, Upvote, Downvote } = require('../models');

// Get comments for a prompt
exports.getComments = async (req, res) => {
  try {
    const { promptId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ promptId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name picture')
      .populate('upvotes', 'user')
      .populate('downvotes', 'user')
      .populate('replies', 'author content');

    const total = await Comment.countDocuments({ promptId });
    
    res.json({
      comments,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create comment
exports.createComment = async (req, res) => {
  try {
    const { promptId, parentId, content } = req.body;
    const userId = req.user.id;

    const newComment = new Comment({
      content,
      authorId: userId,
      promptId,
      parentId,
    });

    const comment = await newComment.save();

    // Update parent comment's reply count if it exists
    if (parentId) {
      const parent = await Comment.findById(parentId);
      if (parent) {
        parent.replies.push(comment._id);
        await parent.save();
      }
    }

    // Update user karma
    const user = await User.findById(userId);
    user.karma += 5; // Initial karma for creating a comment
    await user.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Vote on comment
exports.voteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body; // 'up' or 'down'
    const userId = req.user.id;

    const comment = await Comment.findById(id);
    const user = await User.findById(userId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user has already voted
    const existingUpvote = await Upvote.findOne({
      userId,
      commentId: id,
    });

    const existingDownvote = await Downvote.findOne({
      userId,
      commentId: id,
    });

    // Remove existing vote if present
    if (voteType === 'up' && existingUpvote) {
      await existingUpvote.deleteOne();
      comment.karma -= 1;
    } else if (voteType === 'down' && existingDownvote) {
      await existingDownvote.deleteOne();
      comment.karma += 1;
    }

    // Create new vote
    if (voteType === 'up' && !existingUpvote) {
      const upvote = new Upvote({
        userId,
        commentId: id,
      });
      await upvote.save();
      comment.karma += 1;
      user.karma += 1;
    } else if (voteType === 'down' && !existingDownvote) {
      const downvote = new Downvote({
        userId,
        commentId: id,
      });
      await downvote.save();
      comment.karma -= 1;
      user.karma -= 1;
    }

    await Promise.all([comment.save(), user.save()]);

    res.json({
      karma: comment.karma,
      userKarma: user.karma,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
