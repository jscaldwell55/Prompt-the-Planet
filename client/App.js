import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './components/auth/AuthProvider';
import Login from './components/auth/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import PromptDetail from './components/PromptDetail';
import PromptCard from './components/PromptCard';
import Evolution from './components/Evolution';
import Suggestion from './components/Suggestion';
import Variation from './components/Variation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prompt/:id"
                element={
                  <ProtectedRoute>
                    <PromptDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prompt/:id/evolution"
                element={
                  <ProtectedRoute>
                    <Evolution />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prompt/:id/suggestions"
                element={
                  <ProtectedRoute>
                    <Suggestion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prompt/:id/variations"
                element={
                  <ProtectedRoute>
                    <Variation />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
