import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navigation from '../Navigation';
import Home from '../Home';
import RoommateFinder from '../RoommateFinder';
import HousingDetails from '../HousingDetails';
import MyProfile from '../Profile';
import SignIn from '../SignIn';
import { FirebaseContext } from '../Firebase';
import Login from '../auth/Login/Login';
import SignUp from '../auth/SignUp/SignUp';


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
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    if (firebase) {
    // Check if firebase is not null
    const listener = firebase.auth.onAuthStateChanged(user => {
    if (user) {
    setAuthUser(user);
    } else {
    setAuthUser(null);
    }
    });
    // Cleanup function
    return () => listener();
    }
  }, [firebase]);

  const authenticated = !!authUser;
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />  {/* Applies the theme */}
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<HousingDetails />} />
          <Route path="/roommate-finder" element={<RoommateFinder />} />
          <Route path="/profile" element={<MyProfile />} />
          {/* <Route path="/roommate-finder" element={authUser ? <RoommateFinder /> : <Navigate replace to="/signin" />} /> */}
          <Route path="/signin" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
