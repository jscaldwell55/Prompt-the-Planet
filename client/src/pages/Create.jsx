import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [complexity, setComplexity] = useState(1);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const theme = useTheme();

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement prompt creation API call
    console.log({
      title,
      description,
      content,
      complexity,
      tags,
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
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
          Create New Prompt
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            />

            <TextField
              label="Prompt Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth
              multiline
              rows={6}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  fontFamily: 'monospace',
                },
              }}
            />

            <Box>
              <Typography component="legend" sx={{ mb: 1 }}>
                Complexity Rating
              </Typography>
              <Rating
                value={complexity}
                onChange={(_, newValue) => setComplexity(newValue)}
                max={5}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#00ff87',
                  },
                }}
              />
            </Box>

            <Box>
              <Typography component="legend" sx={{ mb: 1 }}>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddTag}
                  sx={{
                    background: 'linear-gradient(45deg, #00ff87, #60efff)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00cc6a, #4bc8ff)',
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    sx={{
                      backgroundColor: 'rgba(0, 255, 135, 0.1)',
                      color: '#00ff87',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 255, 135, 0.2)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, #00ff87, #60efff)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc6a, #4bc8ff)',
                },
              }}
            >
              Create Prompt
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Create; 