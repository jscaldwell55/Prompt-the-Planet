import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePrompt from './pages/CreatePrompt';
import Explore from './pages/Explore';
import Help from './pages/Help';
import Collaborate from './pages/Collaborate';
import NotFound from './pages/NotFound';
import theme from './theme';
import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className='min-h-screen flex flex-col bg-background-default'>
          <Nav />
          <main className='flex-grow container mx-auto px-4 py-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create' element={<CreatePrompt />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/help' element={<Help />} />
              <Route path='/collaborate' element={<Collaborate />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;