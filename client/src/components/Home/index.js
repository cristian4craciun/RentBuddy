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
        { id: 1, price: 1200, bedrooms: 2, location: "Downtown" },
        { id: 2, price: 1500, bedrooms: 3, location: "Suburb" }
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                sx={{ minHeight: '100vh', marginTop: theme.spacing(8), marginLeft: theme.spacing(4) }}
            >
                <Grid item>
                    <Typography variant="h3">
                        {mode === 0 ? "Waterloo Housing" : "Welcome back!"}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <HousingList housings={sampleHousings} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Home;
