const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Get pull requests for a prompt
router.get('/prompt/:promptId', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    const where = { promptId: req.params.promptId };
    if (status) {
      where.status = status;
    }

    const [pullRequests, total] = await Promise.all([
      prisma.pullRequest.findMany({
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
      prisma.pullRequest.count({ where }),
    ]);

    res.json({
      pullRequests,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    res.status(500).json({ error: 'Failed to fetch pull requests' });
  }
});

// Create a pull request
router.post('/', auth, async (req, res) => {
  try {
    const { promptId, title, description, changes } = req.body;
    const userId = req.user.id;

    const pullRequest = await prisma.pullRequest.create({
      data: {
        title,
        description,
        changes,
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
            comments: true,
          },
        },
      },
    });

    // Create notification for prompt author
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
      select: { authorId: true },
    });

    if (prompt && prompt.authorId !== userId) {
      await prisma.notification.create({
        data: {
          type: 'PULL_REQUEST',
          content: `New pull request for your prompt: ${title}`,
          user: { connect: { id: prompt.authorId } },
          pullRequest: { connect: { id: pullRequest.id } },
        },
      });
    }

    res.status(201).json(pullRequest);
  } catch (error) {
    console.error('Error creating pull request:', error);
    res.status(500).json({ error: 'Failed to create pull request' });
  }
});

// Update pull request status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const pullRequestId = req.params.id;
    const userId = req.user.id;

    // Check if user is the prompt author
    const pullRequest = await prisma.pullRequest.findUnique({
      where: { id: pullRequestId },
      include: {
        prompt: {
          select: { authorId: true },
        },
      },
    });

    if (!pullRequest) {
      return res.status(404).json({ error: 'Pull request not found' });
    }

    if (pullRequest.prompt.authorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this pull request' });
    }

    const updatedPullRequest = await prisma.pullRequest.update({
      where: { id: pullRequestId },
      data: { status },
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
            comments: true,
          },
        },
      },
    });

    // Create notification for pull request author
    if (status === 'MERGED' && pullRequest.authorId !== userId) {
      await prisma.notification.create({
        data: {
          type: 'PULL_REQUEST_MERGED',
          content: `Your pull request "${pullRequest.title}" was merged`,
          user: { connect: { id: pullRequest.authorId } },
          pullRequest: { connect: { id: pullRequestId } },
        },
      });
    }

    res.json(updatedPullRequest);
  } catch (error) {
    console.error('Error updating pull request:', error);
    res.status(500).json({ error: 'Failed to update pull request' });
  }
});

// Vote on a pull request
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const { voteType } = req.body;
    const pullRequestId = req.params.id;
    const userId = req.user.id;

    // Remove existing votes
    await prisma.upvote.deleteMany({
      where: {
        pullRequestId,
        userId,
      },
    });

    await prisma.downvote.deleteMany({
      where: {
        pullRequestId,
        userId,
      },
    });

    // Add new vote
    if (voteType === 'up') {
      await prisma.upvote.create({
        data: {
          pullRequest: { connect: { id: pullRequestId } },
          user: { connect: { id: userId } },
        },
      });
    } else if (voteType === 'down') {
      await prisma.downvote.create({
        data: {
          pullRequest: { connect: { id: pullRequestId } },
          user: { connect: { id: userId } },
        },
      });
    }

    // Get updated vote counts
    const [upvotes, downvotes] = await Promise.all([
      prisma.upvote.count({ where: { pullRequestId } }),
      prisma.downvote.count({ where: { pullRequestId } }),
    ]);

    res.json({ upvotes, downvotes, karma: upvotes - downvotes });
  } catch (error) {
    console.error('Error voting on pull request:', error);
    res.status(500).json({ error: 'Failed to vote on pull request' });
  }
});

module.exports = router;
