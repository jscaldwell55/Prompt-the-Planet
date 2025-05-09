import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'linear-gradient(45deg, #0d0221, #1a1a2e)',
      paper: 'rgba(26, 26, 46, 0.95)',
    },
    primary: {
      main: '#05d9e8',
      light: '#d1f7ff',
      dark: '#00b0c0',
      contrastText: '#f7f7f7',
    },
    secondary: {
      main: '#ff2a6d',
      light: '#ff6b97',
      dark: '#d4004e',
      contrastText: '#f7f7f7',
    },
    text: {
      primary: '#f7f7f7',
      secondary: '#b3b3b3',
      disabled: '#666666',
    },
  },
  typography: {
    fontFamily: '"Fira Code", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      textShadow: '0 2px 4px rgba(5, 217, 232, 0.3)',
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      textShadow: '0 2px 4px rgba(5, 217, 232, 0.3)',
      letterSpacing: '-0.25px',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      textShadow: '0 2px 4px rgba(5, 217, 232, 0.3)',
      letterSpacing: '-0.2px',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: 'rgba(247, 247, 247, 0.9)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(45deg, #0d0221, #1a1a2e)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(5, 217, 232, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            color: '#05d9e8',
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(5, 217, 232, 0.2)',
        },
      },
    },
  },
});

export default theme;
