import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material';
import callApiLoadUserSettings from './callApiLoadUserSettings';
import HousingList from '../HousingCard/housinglist';  // Adjust the path if necessary
import FilterBar from '../Filters';  // ✅ Import the new FilterBar component

const serverURL = "https://shiny-doodle-j96545wrjqw25g4j-5000.app.github.dev"; // Change based on forwarded URL

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
    const [housings, setHousings] = useState([]);
    const [filteredHousings, setFilteredHousings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user settings if needed
        // loadUserSettings();

        // Fetch listings from the API
        fetchListings();
    }, []);

    const loadUserSettings = () => {
        callApiLoadUserSettings(serverURL, userID)
            .then(res => {
                setMode(res[0].mode);
            });
    }

    const fetchListings = async () => {
        try {
            setLoading(true);
            console.log("Fetching listings from:", `${serverURL}/api/listings`);

            const response = await fetch(`api/listings`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP error! Status: ${response.status}, Details:`, errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received data:", data);

            if (data.length === 0) {
                console.warn("No listings found in database");
            }

            // Map database fields...
            // const mappedData = data.map(listing => ({
            //     // Keep the existing mapping logic here
            // }));
            // Map database fields...
            const mappedData = data.map(listing => ({
                id: listing.listing_id,
                price: listing.price,
                bedrooms: listing.number_of_bedrooms,
                bathrooms: 1, // NOT IN DB
                location: `${listing.address}, ${listing.city}, ${listing.province}`,
                image: "https://source.unsplash.com/random/800x600?apartment", // NOT IN DB
                squareFootage: 800, // NOT IN DB
                leaseDuration: `${listing.lease_length} months`,
                petsAllowed: true, // NOT IN DB
                parkingAvailable: false, // NOT IN DB
                utilitiesIncluded: true, // NOT IN DB
                description: listing.listing_name, 
                landlordEmail: listing.contact_email || "not-provided@example.com"
            }));


            setHousings(mappedData);
            setFilteredHousings(mappedData);  // Initialize filtered data
        } catch (error) {
            console.error("Error fetching listings:", error);
            alert("Failed to load housing listings. See console for details.");
            setHousings(sampleHousings);
            setFilteredHousings(sampleHousings);  // ✅ Keep the filters working with sample data
        } finally {
            setLoading(false);
        }
    };

    // ✅ Function to apply filters
    const applyFilters = (filters) => {
        let filtered = housings.filter(housing => {
            return (
                (filters.minPrice === "" || housing.price >= parseInt(filters.minPrice)) &&
                (filters.maxPrice === "" || housing.price <= parseInt(filters.maxPrice)) &&
                (filters.bedrooms === "" || housing.bedrooms === parseInt(filters.bedrooms)) &&
                (filters.bathrooms === "" || housing.bathrooms === parseInt(filters.bathrooms)) &&
                (!filters.petsAllowed || housing.petsAllowed) &&
                (!filters.parkingAvailable || housing.parkingAvailable)
            );
        });

        setFilteredHousings(filtered);
    };

    // Keeping sampleHousings as fallback data
    const sampleHousings = [
        {
            "id": 1,
            "price": 750,
            "bedrooms": 2,
            "bathrooms": 1,
            "location": "Near University of Waterloo",
            "image": "https://live-production.wcms.abc-cdn.net.au/37e49def1e066c0909c4fc2fad28e115?impolicy=wcms_crop_resize&cropH=2214&cropW=3936&xPos=0&yPos=99&width=862&height=485",
            "squareFootage": 900,
            "leaseDuration": "12 months",
            "petsAllowed": true,
            "parkingAvailable": false,
            "utilitiesIncluded": true,
            "description": "Spacious apartment near the university with modern amenities.",
            "landlordEmail": "landlord@example.com"
        },
        {
            "id": 2,
            "price": 650,
            "bedrooms": 2,
            "bathrooms": 1,
            "location": "Columbia Street, Waterloo",
            "image": "https://photos.gta-homes.com/1210-145-columbia-street-w-waterloo-x11891533.jpg",
            "squareFootage": 850,
            "leaseDuration": "8 months",
            "petsAllowed": false,
            "parkingAvailable": true,
            "utilitiesIncluded": false,
            "description": "Cozy 2-bedroom basement apartment with all utilities included. Close to bus routes and student-friendly cafes.",
            "landlordEmail": "columbia@rentbuddy.com"
        },
        {
            "id": 3,
            "price": 950,
            "bedrooms": 3,
            "bathrooms": 2,
            "location": "Uptown Waterloo",
            "image": "https://fourteenprincess.com/wp-content/uploads/2013/10/uptown_14ps.jpg",
            "squareFootage": 1200,
            "leaseDuration": "12 months",
            "petsAllowed": true,
            "parkingAvailable": true,
            "utilitiesIncluded": true,
            "description": "Modern 3-bedroom unit with high-speed internet and laundry. Walking distance to Laurier and UW campus.",
            "landlordEmail": "uptown@rentbuddy.com"
        },
        {
            "id": 4,
            "price": 550,
            "bedrooms": 4,
            "bathrooms": 2,
            "location": "Keats Way, Waterloo",
            "image": "https://www.waterloocondominiums.ca/images-profiles/255-keats-way-on-the-park/255-keats-way-on-the-park-main.jpg",
            "squareFootage": 1400,
            "leaseDuration": "4 months",
            "petsAllowed": false,
            "parkingAvailable": true,
            "utilitiesIncluded": false,
            "description": "4-bedroom shared student house with large common areas and study rooms. Great for group rentals.",
            "landlordEmail": "keatsway@rentbuddy.com"
        },
        {
            "id": 5,
            "price": 800,
            "bedrooms": 5,
            "bathrooms": 3,
            "location": "King Street North, Waterloo",
            "image": "https://medialibrarycfo.entrata.com/18981/MLv3/9/36/2024/07/17/124245/669810a56d91a3.91935019284.png",
            "squareFootage": 1600,
            "leaseDuration": "6 months",
            "petsAllowed": true,
            "parkingAvailable": false,
            "utilitiesIncluded": true,
            "description": "Spacious 5-bedroom loft-style apartment near Laurier. Includes a gym, study lounge, and gaming room.",
            "landlordEmail": "kingstnorth@rentbuddy.com"
        },
        {
            "id": 6,
            "price": 720,
            "bedrooms": 2,
            "bathrooms": 1,
            "location": "Phillip Street, Waterloo",
            "image": "https://images.ctfassets.net/9h1vrxbpwduu/4fN9B5bkZentf9f8gZNfQf/ca53265db6573d599928cf8ee335a74a/Circa-Hero.jpg?fm=webp&w=1920",
            "squareFootage": 950,
            "leaseDuration": "10 months",
            "petsAllowed": false,
            "parkingAvailable": true,
            "utilitiesIncluded": true,
            "description": "A quiet 2-bedroom apartment close to University Plaza. Ideal for students looking for an affordable option with modern amenities.",
            "landlordEmail": "phillipstreet@rentbuddy.com"
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

                {/* ✅ Render the FilterBar */}
                <FilterBar applyFilters={applyFilters} />

                {loading ? (
                    <Typography align="center" sx={{ my: 4 }}>Loading housing listings...</Typography>
                ) : (
                    <HousingList housings={filteredHousings} />
                )}
            </Container>
        </ThemeProvider>
    );
};

export default Home;
