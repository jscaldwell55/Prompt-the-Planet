import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  styled,
} from '@mui/material';
import {
  ArrowUpward as UpvoteIcon,
  ArrowDownward as DownvoteIcon,
  Comment as CommentIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { useAuth } from './auth/AuthProvider';
import PromptCard from './PromptCard';
import PromptForm from './PromptForm';
import Evolution from './Evolution';
import Suggestion from './Suggestion';
import Variation from './Variation';

const SORT_OPTIONS = [
  { value: 'hot', label: 'Hot' },
  { value: 'new', label: 'New' },
  { value: 'top', label: 'Top' },
];

const StyledContainer = styled(Container)`
  background: linear-gradient(45deg, #000000, #1a1a1a);
  min-height: 100vh;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Home = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [sort, setSort] = useState('hot');
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showEvolution, setShowEvolution] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showVariations, setShowVariations] = useState(false);

  useEffect(() => {
    fetchPrompts();
  }, [sort, search]);

  const fetchPrompts = async () => {
    try {
      const response = await fetch(`/api/prompts?sort=${sort}&search=${search}`);
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };

  const handleSortChange = (event, newValue) => {
    setSort(newValue);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    await fetchPrompts();
  };

  const handleCreatePrompt = async (promptData) => {
    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promptData),
      });
      const newPrompt = await response.json();
      setPrompts([newPrompt, ...prompts]);
      setOpenForm(false);
    } catch (error) {
      console.error('Error creating prompt:', error);
    }
  };

  const handleVote = async (promptId, vote) => {
    try {
      const response = await fetch(`/api/prompts/${promptId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote }),
      });
      await response.json();
      fetchPrompts();
    } catch (error) {
      console.error('Error voting on prompt:', error);
    }
  };

  const handleComment = async (promptId, comment) => {
    try {
      const response = await fetch(`/api/prompts/${promptId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });
      await response.json();
      fetchPrompts();
    } catch (error) {
      console.error('Error commenting on prompt:', error);
    }
  };

  const handleFork = async (promptId) => {
    try {
      const response = await fetch(`/api/prompts/${promptId}/fork`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      fetchPrompts();
    } catch (error) {
      console.error('Error forking prompt:', error);
    }
  };

  return (
    <StyledContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          NeonPrompt - AI Prompt Collaboration
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Collaborate, evolve, and create powerful AI prompts
        </Typography>
      </Box>

      <StyledPaper>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            placeholder="Filter by tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            sx={{ maxWidth: '200px' }}
          />
        </Box>
      </StyledPaper>

      <StyledPaper>
        <Tabs
          value={sort}
          onChange={(e, newValue) => setSort(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          {SORT_OPTIONS.map((option) => (
            <Tab key={option.value} label={option.label} value={option.value} />
          ))}
        </Tabs>
      </StyledPaper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
      >
        Create New Prompt
      </Button>

      {showEvolution && selectedPrompt && (
        <Evolution
          promptId={selectedPrompt._id}
          onClose={() => setShowEvolution(false)}
        />
      )}

      {showSuggestions && selectedPrompt && (
        <Suggestion
          promptId={selectedPrompt._id}
          onClose={() => setShowSuggestions(false)}
        />
      )}

      {showVariations && selectedPrompt && (
        <Variation
          promptId={selectedPrompt._id}
          onClose={() => setShowVariations(false)}
        />
      )}

      <Grid container spacing={3}>
        {prompts.map((prompt) => (
          <Grid item xs={12} sm={6} md={4} key={prompt._id}>
            <PromptCard
              prompt={prompt}
              onVote={handleVote}
              onComment={handleComment}
              onFork={handleFork}
              onShowEvolution={() => {
                setSelectedPrompt(prompt);
                setShowEvolution(true);
              }}
              onShowSuggestions={() => {
                setSelectedPrompt(prompt);
                setShowSuggestions(true);
              }}
              onShowVariations={() => {
                setSelectedPrompt(prompt);
                setShowVariations(true);
              }}
            />
          </Grid>
        ))}
      </Grid>

      <PromptForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={fetchPrompts}
      />
    </StyledContainer>
  );
};

export default Home;
