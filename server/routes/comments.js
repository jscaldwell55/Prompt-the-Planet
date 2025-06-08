const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Get comments for a prompt
router.get('/prompt/:promptId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { promptId: req.params.promptId },
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          author: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
          _count: {
            select: {
              upvotes: true,
              downvotes: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.comment.count({
        where: { promptId: req.params.promptId },
      }),
    ]);

    res.json({
      comments,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Create a comment
router.post('/', auth, async (req, res) => {
  try {
    const { promptId, content } = req.body;
    const userId = req.user.id;

    const comment = await prisma.comment.create({
      data: {
        content,
        prompt: { connect: { id: promptId } },
        author: { connect: { id: userId } },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        _count: {
          select: {
            upvotes: true,
            downvotes: true,
          },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Update a comment
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.id;
    const userId = req.user.id;

    // Check if user is the author
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this comment' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        _count: {
          select: {
            upvotes: true,
            downvotes: true,
          },
        },
      },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Delete a comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    // Check if user is the author
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Vote on a comment
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const { voteType } = req.body;
    const commentId = req.params.id;
    const userId = req.user.id;

    // Remove existing votes
    await prisma.commentUpvote.deleteMany({
      where: {
        commentId,
        userId,
      },
    });

    await prisma.commentDownvote.deleteMany({
      where: {
        commentId,
        userId,
      },
    });

    // Add new vote
    if (voteType === 'up') {
      await prisma.commentUpvote.create({
        data: {
          comment: { connect: { id: commentId } },
          user: { connect: { id: userId } },
        },
      });
    } else if (voteType === 'down') {
      await prisma.commentDownvote.create({
        data: {
          comment: { connect: { id: commentId } },
          user: { connect: { id: userId } },
        },
      });
    }

    // Get updated vote counts
    const [upvotes, downvotes] = await Promise.all([
      prisma.commentUpvote.count({ where: { commentId } }),
      prisma.commentDownvote.count({ where: { commentId } }),
    ]);

    res.json({ upvotes, downvotes, karma: upvotes - downvotes });
  } catch (error) {
    console.error('Error voting on comment:', error);
    res.status(500).json({ error: 'Failed to vote on comment' });
  }
});

module.exports = router;
