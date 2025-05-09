import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@mui/material';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const handleSearch = (query, tags) => {
    console.log('Searching for:', query, 'with tags:', tags);
    // This will be connected to the API later
  };

  return (
    <div className='scanline-background min-h-screen flex flex-col'>
      <main className='flex-grow container mx-auto px-4 py-8'>
        <Grid className='flex-grow container mx-auto px-4 py-8'>
          <div className='flex-grow flex items-center justify-center'>
            <Paper className='prompt-card p-6'>
              <Typography variant='h1' className='text-4xl font-bold neon-glow-cyan mb-4'>Welcome</Typography>
              <Typography variant='body1' className='mt-4 text-lg'>
                Discover, create, and collaborate on AI prompts.
              </Typography>
              <div className='flex flex-wrap gap-4 mt-6'>
                <Link to='/explore' className='neon-button'>Explore Prompts</Link>
                <Link to='/help' className='neon-button'>Get Help</Link>
                <Link to='/collaborate' className='neon-button'>Collaborate</Link>
              </div>
              <div className='mt-8'>
                <SearchBar onSearch={handleSearch} />
              </div>
            </Paper>
          </div>

          {/* Simple stack of centered text with consistent styling */}
          <div className='flex flex-col items-center justify-center mt-24 mb-16 space-y-8'>
            {/* Force each title to be on a single line with nowrap */}
            <Typography variant='h2' className='text-3xl font-bold neon-glow-cyan whitespace-nowrap'>
              For Content Creators
            </Typography>
            
            <Typography variant='h2' className='text-3xl font-bold neon-glow-cyan whitespace-nowrap'>
              For Engineers
            </Typography>
            
            <Typography variant='h2' className='text-3xl font-bold neon-glow-cyan whitespace-nowrap'>
              For Vibe Coders
            </Typography>
          </div>
        </Grid>
      </main>

      <footer className='py-4 text-center text-gray-500'>
        <Typography variant='body2'>
          {new Date().getFullYear()} NeonPrompt. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}