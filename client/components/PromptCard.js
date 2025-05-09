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
  styled,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  ArrowUpward as UpvoteIcon,
  ArrowDownward as DownvoteIcon,
  Comment as CommentIcon,
  Code as CodeIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Suggestion from './Suggestion';
import Variation from './Variation';
import Evolution from './Evolution';
import { useAuth } from './auth/AuthProvider';

const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 2rem;
`;

const StyledCardActions = styled(CardActions)`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;

  &:hover {
    color: #05d9e8;
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #05d9e8, #ff2a6d);
  color: white;
  text-transform: none;
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(45deg, #00b0c0, #d4004e);
    transform: translateY(-1px);
  }
`;

const PromptCard = ({ prompt, onVote, onComment, onFork, onShowEvolution, onShowSuggestions, onShowVariations }) => {
  const { user } = useAuth();
  const [upvoted, setUpvoted] = React.useState(false);
  const [downvoted, setDownvoted] = React.useState(false);
  const [showVariations, setShowVariations] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showEvolution, setShowEvolution] = React.useState(false);

  const handleUpvote = async () => {
    try {
      const response = await fetch(`/api/prompts/${prompt.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'upvote' }),
      });
      const updatedPrompt = await response.json();
      setUpvoted(true);
      setDownvoted(false);
      onVote();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await fetch(`/api/prompts/${prompt.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'downvote' }),
      });
      const updatedPrompt = await response.json();
      setUpvoted(false);
      setDownvoted(true);
      onVote();
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(5, 217, 232, 0.2)',
        mb: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 32px rgba(5, 217, 232, 0.3)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <GitHubIcon sx={{ color: '#05d9e8', mr: 1 }} />
          <Typography variant="subtitle2" color="text.primary">
            {prompt.author.name || prompt.author.email}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {new Date(prompt.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="h5" component="h2" gutterBottom sx={{
          textShadow: '0 2px 4px rgba(5, 217, 232, 0.3)',
          color: '#05d9e8',
        }}>
          {prompt.title}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{
          color: 'rgba(255, 255, 255, 0.9)',
        }}>
          {prompt.description}
        </Typography>
        <Box sx={{ mt: 2, background: 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: 2 }}>
          <SyntaxHighlighter language="javascript" style={docco}>
            {prompt.code}
          </SyntaxHighlighter>
        </Box>
      </StyledCardContent>
      <StyledCardActions>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <StyledIconButton onClick={handleUpvote} color={upvoted ? 'primary' : 'default'}>
            <UpvoteIcon />
          </StyledIconButton>
          <StyledIconButton onClick={handleDownvote} color={downvoted ? 'primary' : 'default'}>
            <DownvoteIcon />
          </StyledIconButton>
          <StyledIconButton onClick={onComment}>
            <CommentIcon />
          </StyledIconButton>
          <StyledIconButton onClick={onFork}>
            <CodeIcon />
          </StyledIconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <StyledButton
            startIcon={<HistoryIcon />}
            onClick={() => onShowEvolution()}
          >
            View Evolution
          </StyledButton>
          <StyledButton
            startIcon={<GitHubIcon />}
            onClick={() => onShowSuggestions()}
          >
            Suggest Improvement
          </StyledButton>
          <StyledButton
            startIcon={<CodeIcon />}
            onClick={() => onShowVariations()}
          >
            Create Variation
          </StyledButton>
        </Box>
      </StyledCardActions>
      {showEvolution && (
        <StyledCardContent>
          <Evolution evolutions={prompt.evolution} />
        </StyledCardContent>
          }}
        >
          {showEvolution ? 'Hide Evolution' : 'Show Evolution'}
        </Button>
      </CardActions>
      {showVariations && (
        <CardContent>
          {prompt.variations.map((variation) => (
            <Variation
              key={variation.id}
              variation={variation}
              onVote={handleVote}
              onReply={handleReply}
            />
          ))}
        </CardContent>
      )}
      {showSuggestions && (
        <CardContent>
          {prompt.suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              suggestion={suggestion}
              onVote={handleVote}
              onStatusChange={handleStatusChange}
            />
          ))}
        </CardContent>
      )}
      {showEvolution && (
        <CardContent>
          <Evolution evolutions={prompt.evolution} />
        </CardContent>
      )}
    </Card>
  );
};

export default PromptCard;
