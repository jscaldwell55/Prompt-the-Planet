import React from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #05d9e8, #ff2a6d);
  border-radius: 8px;
  padding: 12px 24px;
  margin: 8px 0;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(5, 217, 232, 0.3);
  }
`;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = '/api/auth/github';
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0d0221, #1a1a2e)',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(5, 217, 232, 0.2)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            NeonPrompt
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Login to continue
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={handleGoogleLogin}
              startIcon={<img src="/google-logo.svg" alt="Google" style={{ width: 20, height: 20 }} />}
            >
              Continue with Google
            </StyledButton>
            
            <StyledButton
              variant="contained"
              fullWidth
              onClick={handleGitHubLogin}
              startIcon={<img src="/github-logo.svg" alt="GitHub" style={{ width: 20, height: 20 }} />}
            >
              Continue with GitHub
            </StyledButton>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
