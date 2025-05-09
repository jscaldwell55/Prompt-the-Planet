import React from 'react';
import { Grid, Paper, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Collaborate() {
  return (
    <div className='scanline-background min-h-screen flex flex-col'>
      <header className='flex items-center justify-between py-4'>
        <Typography variant='h1' className='text-4xl font-bold neon-glow'>Collaborate</Typography>
        <nav className='flex space-x-4'>
          <Link to='/create' className='neon-button'>Create Prompt</Link>
          <Link to='/login' className='neon-button'>Login</Link>
        </nav>
      </header>

      <main className='flex-grow container mx-auto px-4 py-4'>
        <Grid container spacing={4} className='grid-layout'>
          <Grid item xs={12}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h2' className='neon-glow'>Collaborative Workspace</Typography>
              <div className='mt-4 space-y-4'>
                <Button variant='contained' className='neon-button'>Create New Project</Button>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h3' className='neon-glow'>Recent Activity</Typography>
              <div className='mt-4 space-y-4'>
                <List>
                  <ListItem>
                    <ListItemText
                      primary='Prompt Optimization Project'
                      secondary='2 new variations added'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='AI Storytelling Workshop'
                      secondary='3 active contributors'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary='Code Generation Initiative'
                      secondary='1 improvement accepted'
                    />
                  </ListItem>
                </List>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className='prompt-card p-4'>
              <Typography variant='h3' className='neon-glow'>Popular Projects</Typography>
              <div className='mt-4 space-y-4'>
                <Button variant='outlined' className='neon-button w-full'>AI Art Generation</Button>
                <Button variant='outlined' className='neon-button w-full'>Code Optimization</Button>
                <Button variant='outlined' className='neon-button w-full'>Storytelling Framework</Button>
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

export default Collaborate;
