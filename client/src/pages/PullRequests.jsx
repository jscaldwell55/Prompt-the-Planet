import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';
import PullRequestCard from '../components/PullRequestCard';

const PullRequests = () => {
  const { promptId } = useParams();
  const [pullRequests, setPullRequests] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPullRequest, setNewPullRequest] = useState({
    title: '',
    description: '',
    changes: '',
  });

  useEffect(() => {
    fetchPullRequests();
  }, [promptId, activeTab]);

  const fetchPullRequests = async () => {
    try {
      const status = activeTab === 0 ? 'OPEN' : activeTab === 1 ? 'MERGED' : 'CLOSED';
      const response = await fetch(`/api/pull-requests/prompt/${promptId}?status=${status}`);
      const data = await response.json();
      setPullRequests(data.pullRequests);
    } catch (error) {
      console.error('Error fetching pull requests:', error);
    }
  };

  const handleCreatePullRequest = async () => {
    try {
      const response = await fetch('/api/pull-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptId,
          ...newPullRequest,
        }),
      });

      if (response.ok) {
        setOpenDialog(false);
        setNewPullRequest({ title: '', description: '', changes: '' });
        fetchPullRequests();
      }
    } catch (error) {
      console.error('Error creating pull request:', error);
    }
  };

  const handleVote = async (pullRequestId, voteType) => {
    try {
      const response = await fetch(`/api/pull-requests/${pullRequestId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      });

      if (response.ok) {
        fetchPullRequests();
      }
    } catch (error) {
      console.error('Error voting on pull request:', error);
    }
  };

  const handleStatusChange = async (pullRequestId, status) => {
    try {
      const response = await fetch(`/api/pull-requests/${pullRequestId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchPullRequests();
      }
    } catch (error) {
      console.error('Error updating pull request status:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            background: 'linear-gradient(45deg, #00ff87, #60efff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Pull Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<CodeIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: 'linear-gradient(45deg, #00ff87, #60efff)',
            '&:hover': {
              background: 'linear-gradient(45deg, #00cc6a, #4bc8ff)',
            },
          }}
        >
          New Pull Request
        </Button>
      </Box>

      <Paper
        sx={{
          mb: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          <Tab label="Open" />
          <Tab label="Merged" />
          <Tab label="Closed" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {pullRequests.map((pullRequest) => (
          <Grid item xs={12} key={pullRequest.id}>
            <PullRequestCard
              pullRequest={pullRequest}
              onVote={(voteType) => handleVote(pullRequest.id, voteType)}
              onStatusChange={(status) => handleStatusChange(pullRequest.id, status)}
              isAuthor={pullRequest.author.id === 'current-user-id'} // TODO: Get from auth context
            />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Pull Request</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={newPullRequest.title}
              onChange={(e) =>
                setNewPullRequest({ ...newPullRequest, title: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newPullRequest.description}
              onChange={(e) =>
                setNewPullRequest({ ...newPullRequest, description: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Changes"
              fullWidth
              multiline
              rows={6}
              value={newPullRequest.changes}
              onChange={(e) =>
                setNewPullRequest({ ...newPullRequest, changes: e.target.value })
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'monospace',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleCreatePullRequest}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #00ff87, #60efff)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00cc6a, #4bc8ff)',
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PullRequests; 