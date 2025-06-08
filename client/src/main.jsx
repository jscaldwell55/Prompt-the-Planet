import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import theme from './theme'
import './index.css'

// Add loading class to prevent flash of unstyled content
document.documentElement.classList.add('js-loading');

// Remove loading class once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small timeout to ensure styles are applied
  setTimeout(() => {
    document.documentElement.classList.remove('js-loading');
  }, 50);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)