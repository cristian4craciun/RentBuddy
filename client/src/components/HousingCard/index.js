// Import necessary dependencies from React and Material-UI
import React from 'react';
import { Link } from 'react-router-dom';  // Enables navigation between pages
import Card from '@mui/material/Card';  // Material-UI Card component for displaying housing details
import CardMedia from '@mui/material/CardMedia';  // Used for displaying images inside the card
import CardContent from '@mui/material/CardContent';  // Section for housing details
import Typography from '@mui/material/Typography';  // Text styling component
import CardActions from '@mui/material/CardActions';  // Contains action buttons
import Button from '@mui/material/Button';  // Button component from Material-UI
import Box from '@mui/material/Box';  // Used for layout structure

// Functional component representing a housing card
// ✅ Fix: Ensure all expected props are explicitly received
const HousingCard = ({ 
  id, price, bedrooms, bathrooms, location, image, 
  squareFootage, leaseDuration, petsAllowed, parkingAvailable, 
  utilitiesIncluded, description, landlordEmail 
}) => {

  // Logs the received props for debugging purposes
  console.log("HousingCard props:", { 
    id, price, bedrooms, bathrooms, location, image, 
    squareFootage, leaseDuration, petsAllowed, parkingAvailable, 
    utilitiesIncluded, description, landlordEmail 
  });

  return (
    // Card component to represent a housing listing
    <Card sx={{
      maxWidth: 380,  // Sets the maximum width of the card
      margin: "16px",  // Adds spacing around the card
      borderRadius: "12px",  // Rounds the corners of the card
      boxShadow: 4,  // Adds shadow for elevation effect
      transition: "transform 0.2s ease-in-out",  // Smooth animation for hover effect
      "&:hover": { transform: "scale(1.03)" }  // Slightly enlarges the card when hovered
    }}>
      
      {/* CardMedia component to display the housing image */}
      <CardMedia
        component="img"
        height="220"  // Image height
        image={image}  // Image source passed as a prop
        alt="Housing Image"
        sx={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}  // Rounded top corners
      />

      {/* CardContent section containing the housing details */}
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          ${price} / month  {/* Displays the rent price */}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "8px" }}>
          {bedrooms} Bedroom(s) · {bathrooms} Bathroom(s) · {location}  {/* Displays number of bedrooms, bathrooms, and location */}
        </Typography>
      </CardContent>

      {/* CardActions section with a "Learn More" button */}
      <CardActions>
        <Box sx={{ width: "100%", textAlign: "center" }}>  {/* Centers the button */}
          <Button
            component={Link}  // Uses React Router's Link to navigate
            to={`/details/${id}`}  // Routes to the details page for the selected house
            state={{ 
              id, price, bedrooms, bathrooms, location, image, 
              squareFootage, leaseDuration, petsAllowed, parkingAvailable, 
              utilitiesIncluded, description, landlordEmail 
            }}  // Passes housing details as state
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",  // Primary button color
              "&:hover": { backgroundColor: "#135ba1" },  // Darker shade on hover
              borderRadius: "8px",
              width: "90%"  // Makes the button take up most of the card's width
            }}
          >
            Learn More
          </Button>
        </Box>
      </CardActions>

    </Card>
  );
};

// Export the HousingCard component for use in other parts of the application
export default HousingCard;
