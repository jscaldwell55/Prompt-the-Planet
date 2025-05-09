import { createTheme } from '@mui/material/styles';

// 80s Tech Minimalist Retro theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff', // Electric blue
    },
    secondary: {
      main: '#ff00ff', // Neon pink
    },
    background: {
      default: '#000000', // Black
      paper: '#0b132b', // Deep blue
    },
    text: {
      primary: '#e0e0e0', // Light gray
      secondary: '#ffffff', // White
    },
  },
  typography: {
    fontFamily: '"IBM Plex Mono", monospace',
    h1: {
      fontFamily: '"VCR OSD Mono", "Press Start 2P", monospace',
    },
    h2: {
      fontFamily: '"VCR OSD Mono", "Press Start 2P", monospace',
    },
    h3: {
      fontFamily: '"VCR OSD Mono", "Press Start 2P", monospace',
    },
    h4: {
      fontFamily: '"VCR OSD Mono", "Press Start 2P", monospace',
    },
    h5: {
      fontFamily: '"VCR OSD Mono", "Press Start 2P", monospace',
    },
    h6: {
      fontFamily: '"VCR OSD Mono", "Press Start 2P", monospace',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
