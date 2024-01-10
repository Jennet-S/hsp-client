// Importing React and Material-UI components/icons
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DateTime from './DateTime';
import AddPatientForm from './patient/AddPatientForm';
import AddScheduleForm from './schedule/AddScheduleForm';

// Array of pages to be displayed in the navigation menu
const pages = [
  <AddScheduleForm />,
  <AddPatientForm />,
];

// Navbar component
function Navbar() {
  // State variables for managing anchor elements and form visibility
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAddPatientFormVisible, setAddPatientFormVisible] = useState(false);

  // Handlers for opening and closing navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Toggle visibility of the Add Patient form
  const toggleAddPatientForm = () => {
    setAddPatientFormVisible(!isAddPatientFormVisible);
  };

  // Handler for Add Patient button click
  const handleAddPatientClick = () => {
    toggleAddPatientForm();
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" color='error'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Hospital Icon */}
          <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          {/* Hospital Title */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOSPITAL SHIFT PLANNER
          </Typography>

          {/* Responsive Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            {/* Navigation Menu Items */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* ADB Icon */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          {/* Displaying Pages in Navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <React.Fragment key={index}>
                {page}
              </React.Fragment>
            ))}
          </Box>

          {/* Displaying Current Date */}
          <DateTime />

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

            />
          </Box>
        </Toolbar>

        {/* Closing Tag for Container */}
        <Box sx={{ flexGrow: 0 }} />
      </Container>
    </AppBar>
  );
}

// Exporting the Navbar component for use in other parts of the application
export default Navbar;
