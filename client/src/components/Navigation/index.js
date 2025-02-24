import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navigation = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', padding: '8px' }}>
      <Toolbar>
        {/* RentBuddy Logo & Larger Text */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box 
            component="img" 
            src="/logo.png"  // Ensure the logo path is correct
            alt="RentBuddy Logo" 
            sx={{ height: 55, marginRight: 1 }} 
          />
          <Typography 
            variant="h4"
            sx={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontWeight: 'bold', 
              color: '#90caf9',
              fontSize: '3rem'
            }}
          >
            RentBuddy
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Button color="inherit" component={Link} to="/">Housing</Button>
        <Button color="inherit" component={Link} to="/roommate-finder">Roommate Finder</Button>
        <Button color="inherit" component={Link} to="/auth">Sign In</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;