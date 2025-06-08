import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Rating,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const PromptCard = ({ prompt }) => {
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
          {prompt.title}
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
          {prompt.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Rating
            value={prompt.complexity}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#00ff87',
              },
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          {prompt.tags?.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              size="small"
              sx={{
                backgroundColor: 'rgba(0, 255, 135, 0.1)',
                color: '#00ff87',
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 135, 0.2)',
                },
              }}
            />
          ))}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <Stack direction="row" spacing={1}>
            <IconButton size="small" sx={{ color: '#00ff87' }}>
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {prompt.karma}
            </Typography>
            <IconButton size="small" sx={{ color: '#ff4081' }}>
              <ThumbDownIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <CommentIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <ShareIcon />
            </IconButton>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PromptCard;