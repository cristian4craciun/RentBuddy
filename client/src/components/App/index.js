import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navigation from '../Navigation';
import Home from '../Home';
import RoommateFinder from '../RoommateFinder';
import HousingDetails from '../HousingDetails';
import MyProfile from '../Profile';
import { FirebaseContext } from '../Firebase';
import Login from '../auth/Login/Login';
import SignUp from '../auth/SignUp/SignUp';
import 'leaflet/dist/leaflet.css';


// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3ea6ff',      
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#22c55e',       
    },
    background: {
      default: '#0d1117',    
      paper: '#1a1f24',      
    },
    text: {
      primary: '#e6edf3',
      secondary: '#9ea7b3',
    },
    divider: '#30363d',
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',  
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#1a1f24',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundColor: '#1a1f24',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
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
      <Navigation authUser={authUser} firebase={firebase} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<HousingDetails />} />
          <Route path="/profile" element={authenticated ? <MyProfile /> : <Navigate to="/signin" replace />} />
          <Route path="/roommate-finder" element={authenticated ? <RoommateFinder /> : <Navigate to="/signin" replace />} />
          <Route path="/signin" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
