import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
} from '@mui/material';
import {
  Code as CodeIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Star as StarIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Mock user data - replace with actual API call
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
    karma: 150,
    joinDate: '2024-01-01',
    prompts: [
      {
        id: '1',
        title: 'Code Review Assistant',
        description: 'An AI prompt to help review and improve code quality',
        karma: 42,
        createdAt: '2024-02-15',
      },
      {
        id: '2',
        title: 'Creative Writing Helper',
        description: 'A prompt for generating creative writing ideas',
        karma: 28,
        createdAt: '2024-02-10',
      },
    ],
    upvotes: [
      {
        id: '1',
        title: 'AI Image Generation',
        author: 'Jane Smith',
        karma: 75,
      },
      {
        id: '2',
        title: 'Code Optimization',
        author: 'Bob Wilson',
        karma: 63,
      },
    ],
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(45deg, #00ff87, #60efff)',
                fontSize: '2.5rem',
              }}
            >
              {user.avatar}
            </Avatar>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {user.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {user.email}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                icon={<StarIcon />}
                label={`${user.karma} Karma`}
                sx={{
                  backgroundColor: 'rgba(0, 255, 135, 0.1)',
                  color: '#00ff87',
                }}
              />
            </Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  backgroundColor: 'rgba(0, 255, 135, 0.1)',
                },
              }}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
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
              <Tab label="My Prompts" />
              <Tab label="Upvotes" />
              <Tab label="Comments" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <List>
                  {user.prompts.map((prompt) => (
                    <ListItem
                      key={prompt.id}
                      sx={{
                        mb: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 1,
                      }}
                    >
                      <ListItemIcon>
                        <CodeIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={prompt.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {prompt.description}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Chip
                                size="small"
                                icon={<ThumbUpIcon />}
                                label={`${prompt.karma} Karma`}
                                sx={{
                                  backgroundColor: 'rgba(0, 255, 135, 0.1)',
                                  color: '#00ff87',
                                }}
                              />
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {activeTab === 1 && (
                <List>
                  {user.upvotes.map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        mb: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 1,
                      }}
                    >
                      <ListItemIcon>
                        <ThumbUpIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              by {item.author}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Chip
                                size="small"
                                icon={<StarIcon />}
                                label={`${item.karma} Karma`}
                                sx={{
                                  backgroundColor: 'rgba(0, 255, 135, 0.1)',
                                  color: '#00ff87',
                                }}
                              />
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {activeTab === 2 && (
                <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                  No comments yet
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;