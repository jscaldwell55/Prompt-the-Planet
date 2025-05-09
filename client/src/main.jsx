import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
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
    <App />
  </React.StrictMode>,
)