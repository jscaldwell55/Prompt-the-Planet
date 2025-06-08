import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Explore from './pages/Explore';
import Help from './pages/Help';
import Collaborate from './pages/Collaborate';
import Profile from './pages/Profile';
import PullRequests from './pages/PullRequests';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff87',
    },
    secondary: {
      main: '#60efff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          minHeight: '100vh',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/help" element={<Help />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prompts/:promptId/pull-requests" element={<PullRequests />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;