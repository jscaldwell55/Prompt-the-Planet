import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <div className='scanline-background min-h-screen flex flex-col'>
      <header className='flex items-center justify-between py-4'>
        <Typography variant='h1' className='text-4xl font-bold neon-glow'>Explore</Typography>
        <nav className='flex space-x-4'>
          <Link to='/create' className='neon-button'>Create Prompt</Link>
          <Link to='/login' className='neon-button'>Login</Link>
        </nav>
      </header>

      <main className='flex-grow container mx-auto px-4 py-4'>
        <Grid container spacing={4} className='grid-layout'>
          <Grid item xs={12}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h2' className='neon-glow'>Discover Prompts</Typography>
              <div className='flex justify-between items-center mt-4'>
                <div className='flex space-x-4'>
                  <Button variant='outlined' className='neon-button'>Hot</Button>
                  <Button variant='outlined' className='neon-button'>New</Button>
                  <Button variant='outlined' className='neon-button'>Top</Button>
                </div>
                <Button variant='contained' className='neon-button'>View All</Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h3' className='neon-glow'>Channels</Typography>
              <div className='mt-4 space-y-2'>
                <Button variant='outlined' className='neon-button w-full'>Writing</Button>
                <Button variant='outlined' className='neon-button w-full'>Image</Button>
                <Button variant='outlined' className='neon-button w-full'>Code</Button>
                <Button variant='outlined' className='neon-button w-full'>Chat</Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h3' className='neon-glow'>Trending</Typography>
              <div className='mt-4 space-y-4'>
                <div className='flex justify-between items-center'>
                  <Typography variant='body1'>AI Storytelling</Typography>
                  <Typography variant='body2' className='text-accent-main'>+250%</Typography>
                </div>
                <div className='flex justify-between items-center'>
                  <Typography variant='body1'>Code Generation</Typography>
                  <Typography variant='body2' className='text-accent-main'>+180%</Typography>
                </div>
                <div className='flex justify-between items-center'>
                  <Typography variant='body1'>Image Prompting</Typography>
                  <Typography variant='body2' className='text-accent-main'>+150%</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
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

export default Explore;
