const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tags with prompt counts
router.get('/', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            prompts: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Get prompts for a specific tag
router.get('/:name/prompts', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where: {
          tags: {
            some: {
              name: req.params.name,
            },
          },
        },
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
      prisma.prompt.count({
        where: {
          tags: {
            some: {
              name: req.params.name,
            },
          },
        },
      }),
    ]);

    res.json({
      prompts,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching tag prompts:', error);
    res.status(500).json({ error: 'Failed to fetch tag prompts' });
  }
});

// Get popular tags
router.get('/popular', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            prompts: true,
          },
        },
      },
      orderBy: {
        prompts: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    res.json(tags);
  } catch (error) {
    console.error('Error fetching popular tags:', error);
    res.status(500).json({ error: 'Failed to fetch popular tags' });
  }
});

// Search tags
router.get('/search/:query', async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: req.params.query,
          mode: 'insensitive',
        },
      },
      include: {
        _count: {
          select: {
            prompts: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
      take: 10,
    });

    res.json(tags);
  } catch (error) {
    console.error('Error searching tags:', error);
    res.status(500).json({ error: 'Failed to search tags' });
  }
});

module.exports = router; 