import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PromptCard from '../components/PromptCard';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  useEffect(() => {
    // TODO: Fetch prompts from API
    // This will be implemented when we set up the backend
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(45deg, #00ff87, #60efff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Discover AI Prompts
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search prompts..."
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          }}
        />
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

export default Home;