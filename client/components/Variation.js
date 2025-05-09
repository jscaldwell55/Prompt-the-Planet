import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  ArrowUpward as UpvoteIcon,
  ArrowDownward as DownvoteIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Variation = ({ variation, onVote, onReply }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleUpvote = async () => {
    try {
      const response = await fetch(`/api/variations/${variation.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'upvote' }),
      });
      const updatedVariation = await response.json();
      setUpvoted(true);
      setDownvoted(false);
      onVote();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(`/api/variations/${variation.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'downvote' }),
      });
      const updatedVariation = await response.json();
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
          promptId: variation.promptId,
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
          <CodeIcon sx={{ color: '#05d9e8', mr: 1 }} />
          <Typography variant="subtitle2" color="text.primary">
            {variation.author.name || variation.author.email}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {new Date(variation.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          {variation.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {variation.description}
        </Typography>
        <SyntaxHighlighter
          language={variation.language}
          style={docco}
          customStyle={{
            background: 'transparent',
            borderRadius: 4,
            overflow: 'auto',
          }}
        >
          {variation.code}
        </SyntaxHighlighter>
      </CardContent>
      <CardActions>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton onClick={handleUpvote}>
            <UpvoteIcon sx={{ color: upvoted ? '#05d9e8' : '#f7f7f7' }} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {variation.karma}
          </Typography>
          <IconButton onClick={handleDownvote}>
            <DownvoteIcon sx={{ color: downvoted ? '#ff2a6d' : '#f7f7f7' }} />
          </IconButton>
        </Box>
        <Button
          startIcon={<GitHubIcon />}
          onClick={() => setShowReply(!showReply)}
          sx={{
            color: '#f7f7f7',
            '&:hover': {
              background: 'rgba(5, 217, 232, 0.1)',
            },
          }}
        >
          Comment
        </Button>
      </CardActions>
      {showReply && (
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your comment..."
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
            Submit Comment
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default Variation;
