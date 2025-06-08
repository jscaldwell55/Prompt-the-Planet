import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Avatar,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  Merge as MergeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const PullRequestCard = ({ pullRequest, onVote, onStatusChange, isAuthor }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return '#00ff87';
      case 'MERGED':
        return '#60efff';
      case 'CLOSED':
        return '#ff4081';
      default:
        return '#ffffff';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 255, 135, 0.2)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={pullRequest.author.picture}
            alt={pullRequest.author.name}
            sx={{
              width: 32,
              height: 32,
              mr: 1,
              background: 'linear-gradient(45deg, #00ff87, #60efff)',
            }}
          >
            {pullRequest.author.name?.[0]}
          </Avatar>
          <Typography variant="subtitle2" color="text.secondary">
            {pullRequest.author.name}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00ff87, #60efff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {pullRequest.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {pullRequest.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={pullRequest.status}
            size="small"
            sx={{
              backgroundColor: `${getStatusColor(pullRequest.status)}33`,
              color: getStatusColor(pullRequest.status),
              '&:hover': {
                backgroundColor: `${getStatusColor(pullRequest.status)}44`,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              sx={{ color: '#00ff87' }}
              onClick={() => onVote('up')}
            >
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {pullRequest._count.upvotes - pullRequest._count.downvotes}
            </Typography>
            <IconButton
              size="small"
              sx={{ color: '#ff4081' }}
              onClick={() => onVote('down')}
            >
              <ThumbDownIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <CommentIcon />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {pullRequest._count.comments}
              </Typography>
            </IconButton>

            {isAuthor && pullRequest.status === 'OPEN' && (
              <>
                <IconButton
                  size="small"
                  sx={{ color: '#60efff' }}
                  onClick={() => onStatusChange('MERGED')}
                >
                  <MergeIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: '#ff4081' }}
                  onClick={() => onStatusChange('CLOSED')}
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PullRequestCard; 