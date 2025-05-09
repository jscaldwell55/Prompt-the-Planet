import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import {
  ArrowUpward as UpvoteIcon,
  ArrowDownward as DownvoteIcon,
  Reply as ReplyIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { useAuth } from './auth/AuthProvider';

const Comment = ({ comment, onVote, onReply }) => {
  const { user } = useAuth();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleUpvote = async () => {
    try {
      const response = await fetch(`/api/comments/${comment.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'upvote' }),
      });
      const updatedComment = await response.json();
      setUpvoted(true);
      setDownvoted(false);
      onVote();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(`/api/comments/${comment.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'downvote' }),
      });
      const updatedComment = await response.json();
      setUpvoted(false);
      setDownvoted(true);
      onVote();
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  const handleReply = async () => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptId: comment.promptId,
          parentId: comment.id,
          content: replyContent,
        }),
      });
      const newComment = await response.json();
      onReply(newComment);
      setShowReply(false);
      setReplyContent('');
    } catch (error) {
      console.error('Error replying:', error);
    }
  };

  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(5, 217, 232, 0.2)',
        mb: 2,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <GitHubIcon sx={{ color: '#05d9e8', mr: 1 }} />
          <Typography variant="subtitle2" color="text.primary">
            {comment.author.name || comment.author.email}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.primary">
          {comment.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton onClick={handleUpvote}>
            <UpvoteIcon sx={{ color: upvoted ? '#05d9e8' : '#f7f7f7' }} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {comment.karma}
          </Typography>
          <IconButton onClick={handleDownvote}>
            <DownvoteIcon sx={{ color: downvoted ? '#ff2a6d' : '#f7f7f7' }} />
          </IconButton>
        </Box>
        <Button
          startIcon={<ReplyIcon />}
          onClick={() => setShowReply(!showReply)}
          sx={{
            color: '#f7f7f7',
            '&:hover': {
              background: 'rgba(5, 217, 232, 0.1)',
            },
          }}
        >
          Reply
        </Button>
      </CardActions>
      {showReply && (
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(26, 26, 46, 0.95)',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleReply}
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #05d9e8, #ff2a6d)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00b0c0, #d4004e)',
              },
            }}
          >
            Submit Reply
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default Comment;
