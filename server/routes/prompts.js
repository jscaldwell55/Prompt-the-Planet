const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Get all prompts with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tags, complexity } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (tags) {
      where.tags = {
        some: {
          name: {
            in: tags.split(','),
          },
        },
      };
    }
    if (complexity) {
      where.complexity = parseInt(complexity);
    }

    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where,
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
      prisma.prompt.count({ where }),
    ]);

    res.json({
      prompts,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
});

// Get a single prompt by ID
router.get('/:id', async (req, res) => {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        tags: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
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

    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    // Increment view count
    await prisma.prompt.update({
      where: { id: req.params.id },
      data: { views: { increment: 1 } },
    });

    res.json(prompt);
  } catch (error) {
    console.error('Error fetching prompt:', error);
    res.status(500).json({ error: 'Failed to fetch prompt' });
  }
});

// Create a new prompt
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, content, complexity, tags } = req.body;
    const userId = req.user.id;

    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        code: content,
        complexity: parseInt(complexity),
        author: {
          connect: { id: userId },
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        tags: true,
      },
    });

    res.status(201).json(prompt);
  } catch (error) {
    console.error('Error creating prompt:', error);
    res.status(500).json({ error: 'Failed to create prompt' });
  }
});

// Update a prompt
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, content, complexity, tags } = req.body;
    const promptId = req.params.id;
    const userId = req.user.id;

    // Check if user is the author
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
      select: { authorId: true },
    });

    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    if (prompt.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this prompt' });
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id: promptId },
      data: {
        title,
        description,
        code: content,
        complexity: parseInt(complexity),
        tags: {
          set: [],
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        tags: true,
      },
    });

    res.json(updatedPrompt);
  } catch (error) {
    console.error('Error updating prompt:', error);
    res.status(500).json({ error: 'Failed to update prompt' });
  }
});

// Delete a prompt
router.delete('/:id', auth, async (req, res) => {
  try {
    const promptId = req.params.id;
    const userId = req.user.id;

    // Check if user is the author
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
      select: { authorId: true },
    });

    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    if (prompt.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this prompt' });
    }

    await prisma.prompt.delete({
      where: { id: promptId },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting prompt:', error);
    res.status(500).json({ error: 'Failed to delete prompt' });
  }
});

// Vote on a prompt
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const { voteType } = req.body;
    const promptId = req.params.id;
    const userId = req.user.id;

    // Remove existing votes
    await prisma.upvote.deleteMany({
      where: {
        promptId,
        userId,
      },
    });

    await prisma.downvote.deleteMany({
      where: {
        promptId,
        userId,
      },
    });

    // Add new vote
    if (voteType === 'up') {
      await prisma.upvote.create({
        data: {
          prompt: { connect: { id: promptId } },
          user: { connect: { id: userId } },
        },
      });
    } else if (voteType === 'down') {
      await prisma.downvote.create({
        data: {
          prompt: { connect: { id: promptId } },
          user: { connect: { id: userId } },
        },
      });
    }

    // Get updated vote counts
    const [upvotes, downvotes] = await Promise.all([
      prisma.upvote.count({ where: { promptId } }),
      prisma.downvote.count({ where: { promptId } }),
    ]);

    res.json({ upvotes, downvotes, karma: upvotes - downvotes });
  } catch (error) {
    console.error('Error voting on prompt:', error);
    res.status(500).json({ error: 'Failed to vote on prompt' });
  }
});

// Fork a prompt
router.post('/:id/fork', auth, async (req, res) => {
  try {
    const promptId = req.params.id;
    const userId = req.user.id;

    const originalPrompt = await prisma.prompt.findUnique({
      where: { id: promptId },
      include: { tags: true },
    });

    if (!originalPrompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    const forkedPrompt = await prisma.prompt.create({
      data: {
        title: `${originalPrompt.title} (Fork)`,
        description: originalPrompt.description,
        code: originalPrompt.code,
        complexity: originalPrompt.complexity,
        author: { connect: { id: userId } },
        variationOf: { connect: { id: promptId } },
        tags: {
          connect: originalPrompt.tags.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        tags: true,
      },
    });

    res.status(201).json(forkedPrompt);
  } catch (error) {
    console.error('Error forking prompt:', error);
    res.status(500).json({ error: 'Failed to fork prompt' });
  }
});

module.exports = router;