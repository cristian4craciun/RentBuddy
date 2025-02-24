import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, CssBaseline, Container} from '@mui/material';
import Grid from "@mui/material/Grid";
import callApiLoadUserSettings from './callApiLoadUserSettings';
import HousingList from '../HousingCard/housinglist';  // Adjust the path if necessary

const serverURL = "";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
    }
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
        {
            id: 1,
            price: 750,
            bedrooms: 1,
            location: "Near University of Waterloo",
            image: "https://live-production.wcms.abc-cdn.net.au/37e49def1e066c0909c4fc2fad28e115?impolicy=wcms_crop_resize&cropH=2214&cropW=3936&xPos=0&yPos=99&width=862&height=485",
            description: "Affordable single-bedroom apartment just a 5-minute walk from the University of Waterloo. Ideal for students looking for quiet study spaces."
        },
        {
            id: 2,
            price: 650,
            bedrooms: 2,
            location: "Columbia Street, Waterloo",
            image: "https://photos.gta-homes.com/1210-145-columbia-street-w-waterloo-x11891533.jpg",
            description: "Cozy 2-bedroom basement apartment with all utilities included. Close to bus routes and student-friendly cafes."
        },
        {
            id: 3,
            price: 950,
            bedrooms: 3,
            location: "Uptown Waterloo",
            image: "https://fourteenprincess.com/wp-content/uploads/2013/10/uptown_14ps.jpg",
            description: "Modern 3-bedroom unit with high-speed internet and laundry. Walking distance to Laurier and UW campus."
        },
        {
            id: 4,
            price: 550,
            bedrooms: 4,
            location: "Keats Way, Waterloo",
            image: "https://www.waterloocondominiums.ca/images-profiles/255-keats-way-on-the-park/255-keats-way-on-the-park-main.jpg",
            description: "4-bedroom shared student house with large common areas and study rooms. Great for group rentals."
        },
        {
            id: 5,
            price: 800,
            bedrooms: 5,
            location: "King Street North, Waterloo",
            image: "https://medialibrarycfo.entrata.com/18981/MLv3/9/36/2024/07/17/124245/669810a56d91a3.91935019284.png",
            description: "Spacious 5-bedroom loft-style apartment near Laurier. Includes a gym, study lounge, and gaming room."
        }
    ];
    
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography 
                    variant="h3" 
                    textAlign="center"
                    sx={{
                        fontWeight: "bold",
                        color: "#90caf9",
                        marginTop: "24px",
                        marginBottom: "24px",
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }
                    }}
                >
                    Housing
                </Typography>
                <HousingList housings={sampleHousings} />
            </Container>
        </ThemeProvider>
    );
};

export default Home;