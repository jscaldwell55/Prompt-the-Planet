import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Create as CreateIcon,
  Explore as ExploreIcon,
  Help as HelpIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isAuthenticated = false; // TODO: Implement authentication

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            background: 'linear-gradient(45deg, #00ff87, #60efff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          NeonPrompt
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button
            component={RouterLink}
            to="/create"
            startIcon={<CreateIcon />}
            sx={{
              color: 'text.primary',
              '&:hover': {
                background: 'rgba(0, 255, 135, 0.1)',
              },
            }}
          >
            Create
          </Button>
          <Button
            component={RouterLink}
            to="/explore"
            startIcon={<ExploreIcon />}
            sx={{
              color: 'text.primary',
              '&:hover': {
                background: 'rgba(0, 255, 135, 0.1)',
              },
            }}
          >
            Explore
          </Button>
          <Button
            component={RouterLink}
            to="/collaborate"
            startIcon={<GroupIcon />}
            sx={{
              color: 'text.primary',
              '&:hover': {
                background: 'rgba(0, 255, 135, 0.1)',
              },
            }}
          >
            Collaborate
          </Button>
          <Button
            component={RouterLink}
            to="/help"
            startIcon={<HelpIcon />}
            sx={{
              color: 'text.primary',
              '&:hover': {
                background: 'rgba(0, 255, 135, 0.1)',
              },
            }}
          >
            Help
          </Button>
        </Box>

        {isAuthenticated ? (
          <>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(45deg, #00ff87, #60efff)',
                }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{
              ml: 2,
              background: 'linear-gradient(45deg, #00ff87, #60efff)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00cc6a, #4bc8ff)',
              },
            }}
          >
            Login
          </Button>
        )}

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 