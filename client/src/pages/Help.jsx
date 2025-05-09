import React from 'react';
import { Grid, Paper, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Help() {
  return (
    <div className='scanline-background min-h-screen flex flex-col'>
      <header className='flex items-center justify-between py-4'>
        <Typography variant='h1' className='text-4xl font-bold neon-glow'>Help Center</Typography>
        <nav className='flex space-x-4'>
          <Link to='/create' className='neon-button'>Create Prompt</Link>
          <Link to='/login' className='neon-button'>Login</Link>
        </nav>
      </header>

      <main className='flex-grow container mx-auto px-4 py-4'>
        <Grid container spacing={4} className='grid-layout'>
          <Grid item xs={12}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h2' className='neon-glow'>Prompt Engineering Help</Typography>
              <div className='mt-4 space-y-4'>
                <List>
                  <ListItem>
                    <ListItemText
                      primary='Getting Started with Prompts'
                      secondary='Learn the basics of prompt engineering'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='Advanced Techniques'
                      secondary='Master complex prompt patterns'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='Common Issues'
                      secondary='Troubleshooting guide'
                    />
                  </ListItem>
                </List>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h3' className='neon-glow'>Technical Documentation</Typography>
              <div className='mt-4 space-y-4'>
                <Button variant='outlined' className='neon-button w-full'>API Reference</Button>
                <Button variant='outlined' className='neon-button w-full'>Parameter Guide</Button>
                <Button variant='outlined' className='neon-button w-full'>Best Practices</Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h3' className='neon-glow'>Community Support</Typography>
              <div className='mt-4 space-y-4'>
                <Button variant='outlined' className='neon-button w-full'>Ask a Question</Button>
                <Button variant='outlined' className='neon-button w-full'>Browse Solutions</Button>
                <Button variant='outlined' className='neon-button w-full'>View FAQs</Button>
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

export default Help;
