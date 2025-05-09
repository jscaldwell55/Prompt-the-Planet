import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  History as HistoryIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Evolution = ({ evolutions }) => {
  return (
    <Card
      sx={{
        background: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(5, 217, 232, 0.2)',
        mb: 4,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <HistoryIcon sx={{ color: '#05d9e8', mr: 1 }} />
          <Typography variant="h6" color="text.primary">
            Evolution History
          </Typography>
        </Box>

        <Timeline>
          {evolutions.map((evolution) => (
            <TimelineItem key={evolution.id}>
              <TimelineOppositeContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    color: '#05d9e8',
                    fontWeight: 'bold',
                  }}
                >
                  {evolution.status}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={evolution.status === 'ACCEPTED' ? 'primary' : 'secondary'}
                  sx={{
                    '&.MuiTimelineDot-root': {
                      background: 'linear-gradient(45deg, #05d9e8, #ff2a6d)',
                    },
                  }}
                >
                  <GitHubIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card
                  sx={{
                    background: 'rgba(26, 26, 46, 0.95)',
                    border: '1px solid rgba(5, 217, 232, 0.2)',
                    mb: 2,
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CodeIcon sx={{ color: '#05d9e8', mr: 1 }} />
                      <Typography variant="subtitle2" color="text.primary">
                        {evolution.author.name || evolution.author.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        {new Date(evolution.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.primary">
                      {evolution.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" color="text.primary" gutterBottom>
                        Changes:
                      </Typography>
                      <SyntaxHighlighter
                        language="diff"
                        style={docco}
                        customStyle={{
                          background: 'transparent',
                          borderRadius: 4,
                          overflow: 'auto',
                        }}
                      >
                        {evolution.changes}
                      </SyntaxHighlighter>
                    </Box>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default Evolution;
