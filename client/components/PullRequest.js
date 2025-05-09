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
  ArrowUpward as UpvoteIcon,
  ArrowDownward as DownvoteIcon,
  GitHub as GitHubIcon,
  CheckCircle as AcceptIcon,
  Cancel as RejectIcon,
} from '@mui/icons-material';
import { useAuth } from './auth/AuthProvider';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const PullRequest = ({ pullRequest, onVote, onStatusChange }) => {
  const { user } = useAuth();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpvote = async () => {
    try {
      const response = await fetch(`/api/pull-requests/${pullRequest.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'upvote' }),
      });
      const updatedPullRequest = await response.json();
      setUpvoted(true);
      setDownvoted(false);
      onVote();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(`/api/pull-requests/${pullRequest.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'downvote' }),
      });
      const updatedPullRequest = await response.json();
      setUpvoted(false);
      setDownvoted(true);
      onVote();
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      const response = await fetch(`/api/pull-requests/${pullRequest.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const updatedPullRequest = await response.json();
      onStatusChange(updatedPullRequest);
      setOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
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
            {pullRequest.author.name || pullRequest.author.email}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {new Date(pullRequest.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          {pullRequest.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {pullRequest.description}
        </Typography>
        <SyntaxHighlighter
          language={pullRequest.prompt.language}
          style={docco}
          customStyle={{
            background: 'transparent',
            borderRadius: 4,
            overflow: 'auto',
          }}
        >
          {pullRequest.code}
        </SyntaxHighlighter>
      </CardContent>
      <CardActions>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton onClick={handleUpvote}>
            <UpvoteIcon sx={{ color: upvoted ? '#05d9e8' : '#f7f7f7' }} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {pullRequest.karma}
          </Typography>
          <IconButton onClick={handleDownvote}>
            <DownvoteIcon sx={{ color: downvoted ? '#ff2a6d' : '#f7f7f7' }} />
          </IconButton>
        </Box>
        {pullRequest.status === 'OPEN' && user.id === pullRequest.prompt.authorId && (
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              background: 'linear-gradient(45deg, #05d9e8, #ff2a6d)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00b0c0, #d4004e)',
              },
            }}
          >
            Review
          </Button>
        )}
      </CardActions>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Review Pull Request
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<AcceptIcon />}
              onClick={() => handleStatusChange('ACCEPTED')}
              sx={{
                background: '#05d9e8',
                mr: 2,
                '&:hover': {
                  background: '#00b0c0',
                },
              }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              startIcon={<RejectIcon />}
              onClick={() => handleStatusChange('REJECTED')}
              sx={{
                background: '#ff2a6d',
                '&:hover': {
                  background: '#d4004e',
                },
              }}
            >
              Reject
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PullRequest;
