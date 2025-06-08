import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Code as CodeIcon,
  Create as CreateIcon,
  Share as ShareIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const Help = () => {
  const faqs = [
    {
      question: 'What is NeonPrompt?',
      answer: 'NeonPrompt is a platform for creating, sharing, and collaborating on AI prompts. It helps users discover effective prompts, learn from others, and improve their AI interactions.',
    },
    {
      question: 'How do I create a prompt?',
      answer: 'To create a prompt, click the "Create" button in the navigation bar. Fill in the title, description, and content of your prompt. Add relevant tags and set the complexity level. Click "Create Prompt" to publish.',
    },
    {
      question: 'How does voting work?',
      answer: 'Users can upvote or downvote prompts to help the community identify the most effective ones. Your voting history is tracked, and you can change your vote at any time.',
    },
    {
      question: 'What are prompt variations?',
      answer: 'Prompt variations are different versions of the same prompt, created to explore different approaches or improvements. You can fork any prompt to create your own variation.',
    },
  ];

  const features = [
    {
      icon: <CreateIcon />,
      title: 'Create Prompts',
      description: 'Create and share your AI prompts with the community',
    },
    {
      icon: <CodeIcon />,
      title: 'Code Integration',
      description: 'Easily integrate prompts into your code and applications',
    },
    {
      icon: <ShareIcon />,
      title: 'Collaboration',
      description: 'Work with others to improve and evolve prompts',
    },
    {
      icon: <SecurityIcon />,
      title: 'Security',
      description: 'Secure authentication and data protection',
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
        Help & Documentation
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  background: 'transparent',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Key Features
            </Typography>
            <List>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ py: 2 }}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={feature.title}
                    secondary={feature.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Need more help? Contact us at support@neonprompt.com
        </Typography>
      </Box>
    </Container>
  );
};

export default Help;
