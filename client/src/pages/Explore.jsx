import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PromptCard from '../components/PromptCard';

const categories = [
  { id: 'coding', name: 'Coding', color: '#00ff87' },
  { id: 'writing', name: 'Writing', color: '#60efff' },
  { id: 'design', name: 'Design', color: '#ff4081' },
  { id: 'business', name: 'Business', color: '#ffd700' },
  { id: 'education', name: 'Education', color: '#9c27b0' },
  { id: 'creative', name: 'Creative', color: '#ff9800' },
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API call
  const prompts = [
    {
      id: '1',
      title: 'Code Review Assistant',
      description: 'An AI prompt to help review and improve code quality',
      complexity: 3,
      tags: ['coding', 'review', 'quality'],
      karma: 42,
    },
    // Add more mock prompts here
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
        Explore Prompts
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
        />

        <Paper
          sx={{
            p: 2,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  backgroundColor: selectedCategory === category.id
                    ? `${category.color}33`
                    : 'rgba(255, 255, 255, 0.1)',
                  color: selectedCategory === category.id
                    ? category.color
                    : 'text.primary',
                  '&:hover': {
                    backgroundColor: `${category.color}33`,
                  },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        {prompts.map((prompt) => (
          <Grid item xs={12} sm={6} md={4} key={prompt.id}>
            <PromptCard prompt={prompt} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Explore;
