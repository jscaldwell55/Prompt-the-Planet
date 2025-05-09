const { Notification } = require('../models');

// Get notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('prompt', 'title')
      .populate('comment', 'content')
      .populate('pullRequest', 'title');

    const total = await Notification.countDocuments({ userId });
    
    res.json({
      notifications,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      _id: id,
      userId,
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany(
      { userId, read: false },
      { read: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const { type, content, userId, promptId, commentId, pullRequestId } = req.body;

    const notification = new Notification({
      type,
      content,
      userId,
      promptId,
      commentId,
      pullRequestId,
    });

    await notification.save();

    // Update user's unread notification count
    const user = await User.findById(userId);
    if (user) {
      user.unreadNotifications = await Notification.countDocuments({
        userId,
        read: false,
      });
      await user.save();
    }

    res.status(201).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
