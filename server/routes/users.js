const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
        createdAt: true,
        _count: {
          select: {
            prompts: true,
            upvotes: true,
            downvotes: true,
            comments: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get user's prompts
router.get('/:id/prompts', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where: { authorId: req.params.id },
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          tags: true,
          _count: {
            select: {
              upvotes: true,
              downvotes: true,
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.prompt.count({
        where: { authorId: req.params.id },
      }),
    ]);

    res.json({
      prompts,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching user prompts:', error);
    res.status(500).json({ error: 'Failed to fetch user prompts' });
  }
});

// Get user's upvotes
router.get('/:id/upvotes', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [upvotes, total] = await Promise.all([
      prisma.upvote.findMany({
        where: { userId: req.params.id },
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          prompt: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  picture: true,
                },
              },
              tags: true,
              _count: {
                select: {
                  upvotes: true,
                  downvotes: true,
                  comments: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.upvote.count({
        where: { userId: req.params.id },
      }),
    ]);

    res.json({
      upvotes: upvotes.map((upvote) => upvote.prompt),
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching user upvotes:', error);
    res.status(500).json({ error: 'Failed to fetch user upvotes' });
  }
});

// Get user's comments
router.get('/:id/comments', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { authorId: req.params.id },
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          prompt: {
            select: {
              id: true,
              title: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  picture: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.comment.count({
        where: { authorId: req.params.id },
      }),
    ]);

    res.json({
      comments,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ error: 'Failed to fetch user comments' });
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, picture } = req.body;
    const userId = req.params.id;

    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        picture,
      },
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
        createdAt: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user account
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;

    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this account' });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router; 