import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar, Link as MUILink,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AcUnitIcon from '@mui/icons-material/AcUnit';


import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';

import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
const iconMap = {
  Home: <HomeIcon />,
  Events: <EventIcon />,
  'Send email': <MailIcon />,
  Jobs: <WorkIcon />
};

const drawerWidth = 240;
function SidebarMenu() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? theme.palette.common.hoverText : theme.palette.common.menuText,
      fontWeight: isActive ? 700 : 500,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.background.default,
        textDecoration: 'none',
      },
      '&.active': {
        color: theme.palette.background.default,
      }
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'common.menuBG',
          borderRadius: (theme) => `0  0 ${theme.shape.borderRadius[1]}px ${theme.shape.borderRadius[1]}px`,
          color: (theme) => theme.palette.common.menuText,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: 'width 0.3s',
          ...(open && {
            // width: `calc(100% - ${drawerWidth}px)`,
            // ml: `${drawerWidth}px`,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <AcUnitIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <Stack direction="row" spacing={4}>
            <MUILink component={NavLink} to="/" sx={navLinkStyle}>
              Home
            </MUILink>
            <MUILink component={NavLink} to="/about" className="" sx={navLinkStyle}>
              Events
            </MUILink>
            <MUILink component={NavLink} to="/Products" className="" sx={navLinkStyle}>
              Products
            </MUILink>
          </Stack>

        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        hideBackdrop
        anchor="left"
        className='abc'
        open={open}
        sx={{
          marginTop: '64px', // Typical AppBar height (adjust if yours is different)
          height: 'calc(100% - 64px)',
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ bgcolor: 'common.menuBG', color: 'primary.contrastText' }}>

        </Toolbar>
        <Divider />
        <List>
          {['Home', 'Events', 'Send email', 'Jobs'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {iconMap[text] || <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main">
      </Box>
    </Box >
  );
}

export default SidebarMenu;
