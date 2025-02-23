import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Grid from "@mui/material/Grid";
import callApiLoadUserSettings from './callApiLoadUserSettings';
import HousingList from '../HousingCard/housinglist';  // Adjust the path if necessary

const serverURL = "";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Home = () => {
    const [userID, setUserID] = useState(1);
    const [mode, setMode] = useState(0);

    useEffect(() => {
        // Uncomment the following line to activate loading user settings when needed
        // loadUserSettings();
    }, []);

    const loadUserSettings = () => {
        callApiLoadUserSettings(serverURL, userID)
            .then(res => {
                setMode(res[0].mode);
            });
    }

    const sampleHousings = [
        { id: 1, price: 1200, bedrooms: 2, location: "Downtown", image: "https://via.placeholder.com/400x300" },
        { id: 2, price: 1500, bedrooms: 3, location: "Suburb", image: "https://via.placeholder.com/400x300" },
        { id: 3, price: 1800, bedrooms: 4, location: "Near University", image: "https://via.placeholder.com/400x300" },
        { id: 4, price: 900, bedrooms: 1, location: "Outskirts", image: "https://via.placeholder.com/400x300" },
        { id: 5, price: 2200, bedrooms: 5, location: "Luxury Area", image: "https://via.placeholder.com/400x300" }
    ];    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <Typography variant="h4" gutterBottom>Housing</Typography>
                <HousingList housings={sampleHousings} />
            </div>
        </ThemeProvider>
    );
};

export default Home;