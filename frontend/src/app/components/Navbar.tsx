'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Brain, Menu } from 'lucide-react';
import { useState } from 'react';
import NavbarButtons from './Utils/NavbarButtons';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="https://github.com/AOSSIE-Org/Perspective-AI">
          <ListItemText primary="GitHub" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: '#5F27CD', boxShadow: 3 }}
      className="w-full mt-0 p-4"
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          display="flex"
          alignItems="center"
          component={Link}
          href="/"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 1 }}>
            <Brain size={32} />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Perspective AI
          </Typography>
        </Box>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box display="flex" gap={2}>
            <NavbarButtons text="Home" href="/" />
            <NavbarButtons text="GitHub" href="https://github.com/AOSSIE-Org/Perspective-AI" />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
