// Importing necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom';  // Enables navigation between pages
import AppBar from '@mui/material/AppBar';  // Top navigation bar component from Material-UI
import Toolbar from '@mui/material/Toolbar';  // Toolbar for structuring content inside AppBar
import Typography from '@mui/material/Typography';  // Typography component for text styling
import Button from '@mui/material/Button';  // Button component from Material-UI
import Box from '@mui/material/Box';  // Box component for layout structure

// Navigation Component
const Navigation = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', padding: '8px' }}>
      <Toolbar>
        {/* RentBuddy Logo & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box 
            component="img" 
            src="/logo.png"  // Ensure the logo file is stored in the correct location
            alt="RentBuddy Logo" 
            sx={{ height: 55, marginRight: 1 }} // Styling for the logo
          />
          <Typography 
            variant="h4"  // Large heading size
            sx={{ 
              fontFamily: "'Poppins', sans-serif",  // Custom font for a modern look
              fontWeight: 'bold',  // Bold text for emphasis
              color: '#90caf9',  // Light blue text color
              fontSize: '3rem'  // Large font size for branding
            }}
          >
            RentBuddy
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Button color="inherit" component={Link} to="/">Housing</Button>  {/* Link to Housing page */}
        <Button color="inherit" component={Link} to="/roommate-finder">Roommate Finder</Button>  {/* Link to Roommate Finder page */}
        <Button color="inherit" component={Link} to="/profile">My Profile</Button>  {/* Link to My Profile page */}
      </Toolbar>
    </AppBar>
  );
};

// Export the Navigation component to be used in other parts of the application
export default Navigation;
