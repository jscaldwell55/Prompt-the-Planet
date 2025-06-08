import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Group as GroupIcon,
  Code as CodeIcon,
  Chat as ChatIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const Collaborate = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API call
  const projects = [
    {
      id: '1',
      title: 'AI Code Review System',
      description: 'Building an AI-powered code review system with advanced prompt engineering',
      members: [
        { id: '1', name: 'John Doe', avatar: 'JD' },
        { id: '2', name: 'Jane Smith', avatar: 'JS' },
      ],
      tags: ['coding', 'review', 'collaboration'],
      status: 'active',
    },
    {
      id: '2',
      title: 'Creative Writing Prompts',
      description: 'Collection of creative writing prompts for various genres',
      members: [
        { id: '3', name: 'Alice Johnson', avatar: 'AJ' },
        { id: '4', name: 'Bob Wilson', avatar: 'BW' },
      ],
      tags: ['writing', 'creative', 'community'],
      status: 'active',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #00ff87, #60efff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}
      >
        Collaborate on Prompts
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search collaboration projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GroupIcon />}
              sx={{
                height: '100%',
                background: 'linear-gradient(45deg, #00ff87, #60efff)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc6a, #4bc8ff)',
                },
              }}
            >
              New Project
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(0, 255, 135, 0.1)',
                          color: '#00ff87',
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <List>
                    {project.members.map((member) => (
                      <ListItem key={member.id}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              background: 'linear-gradient(45deg, #00ff87, #60efff)',
                            }}
                          >
                            {member.avatar}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={member.name} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  mt: 2,
                }}
              >
                <Button
                  startIcon={<CodeIcon />}
                  sx={{ color: 'text.primary' }}
                >
                  View Code
                </Button>
                <Button
                  startIcon={<ChatIcon />}
                  sx={{ color: 'text.primary' }}
                >
                  Chat
                </Button>
                <Button
                  startIcon={<ShareIcon />}
                  sx={{ color: 'text.primary' }}
                >
                  Share
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Collaborate;
