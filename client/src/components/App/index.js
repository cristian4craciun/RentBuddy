import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navigation from '../Navigation';
import Profile from '../Profile';
import Home from '../Home';
import RoommateFinder from '../RoommateFinder';
import HousingDetails from '../HousingDetails';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',  // Light blue for accents
    },
    background: {
      default: '#121212',  // Dark background
      paper: '#1e1e1e',  // Dark cards
    },
    text: {
      primary: '#ffffff',  // White text
      secondary: '#b0bec5',  // Light gray text
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",  // Modern font
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />  {/* Applies the theme */}
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<HousingDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/roommate-finder" element={<RoommateFinder />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
