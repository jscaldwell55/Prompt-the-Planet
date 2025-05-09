import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b132b',
      light: '#1a2642',
      dark: '#000000',
    },
    secondary: {
      main: '#1c7293',
      light: '#3d96b9',
      dark: '#004d6b',
    },
    accent: {
      main: '#ff00ff',
    },
    highlight: {
      main: '#00ffff',
    },
    background: {
      default: '#000000',
      paper: '#0b132b',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"VCR OSD Mono", "IBM Plex Mono", monospace',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0b132b',
          border: '1px solid #1c7293',
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px',
          padding: '1rem',
        },
      },
    },
  },
});

export default theme;
