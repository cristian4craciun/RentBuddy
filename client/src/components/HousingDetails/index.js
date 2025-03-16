// Import necessary dependencies from React and Material-UI
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Used for accessing route state and navigation
import { Container, Typography, Box, Button, Card, CardMedia, CardContent, Divider } from '@mui/material'; // UI components from Material-UI
import { ArrowBack, LocationOn, Bed, Bathtub, SquareFoot, Pets, LocalParking, AttachMoney, Email, Description } from '@mui/icons-material'; // Material-UI icons

// Functional component to display detailed information about a selected housing listing
const HousingDetails = () => {
  const location = useLocation();  // Retrieves the passed state (housing details)
  const housing = location.state;  // Stores the housing details from the previous page
  const navigate = useNavigate();  // Enables navigation back to the previous page

  // If no housing data is found, display an error message
  if (!housing) {
    return <Typography variant="h4" align="center">Housing details not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "32px", marginBottom: "32px" }}>
      
      {/* Back Button - Navigates to the previous page */}
      <Button 
        startIcon={<ArrowBack />}  // Adds an arrow icon before the text
        onClick={() => navigate(-1)}  // Goes back to the previous page
        sx={{ marginBottom: "16px" }}  
      >
        Back to Listings
      </Button>

      {/* Housing Details Card */}
      <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
        
        {/* Housing Image */}
        <CardMedia
          component="img"
          height="400"  // Sets the image height
          image={housing.image}  // Uses the image URL from housing data
          alt="Housing Image"
          sx={{
            objectFit: "cover",  // Ensures the image fills the space properly
            borderTopLeftRadius: "16px",  // Rounds the top left corner
            borderTopRightRadius: "16px"  // Rounds the top right corner
          }}
        />

        {/* Housing Information Section */}
        <CardContent>
          
          {/* Display Price and Location Details */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ${housing.price} / month  {/* Displays the monthly rent price */}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <Bed sx={{ verticalAlign: "middle", marginRight: "6px" }} /> {housing.bedrooms} Bedroom(s) · 
            <Bathtub sx={{ verticalAlign: "middle", marginRight: "6px", marginLeft: "6px" }} /> {housing.bathrooms} Bathroom(s) · 
            <LocationOn sx={{ verticalAlign: "middle", marginRight: "6px", marginLeft: "6px" }} /> {housing.location}
          </Typography>

          {/* Divider for separating sections */}
          <Divider sx={{ marginY: "16px" }} />

          {/* Additional Housing Details */}
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <SquareFoot sx={{ verticalAlign: "middle", marginRight: "6px" }} /> 
            <strong>Square Footage:</strong> {housing.squareFootage ? `${housing.squareFootage} sqft` : "Not provided"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <AttachMoney sx={{ verticalAlign: "middle", marginRight: "6px" }} /> 
            <strong>Lease Duration:</strong> {housing.leaseDuration ? housing.leaseDuration : "Not specified"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <Pets sx={{ verticalAlign: "middle", marginRight: "6px" }} /> 
            <strong>Pet Policy:</strong> {housing.petsAllowed ? "Allowed" : "Not Allowed"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <LocalParking sx={{ verticalAlign: "middle", marginRight: "6px" }} /> 
            <strong>Parking:</strong> {housing.parkingAvailable ? "Available" : "Not Available"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>Utilities Included:</strong> {housing.utilitiesIncluded ? "Yes" : "No"}
          </Typography>

          {/* Housing Description */}
          <Typography variant="body1" sx={{ marginTop: "12px", lineHeight: 1.6 }}>
            <Description sx={{ verticalAlign: "middle", marginRight: "6px" }} /> 
            {housing.description ? housing.description : "No description available"}
          </Typography>

          {/* Contact Landlord Button */}
          <Box sx={{ marginTop: "24px", textAlign: "center" }}>
            <Button 
              variant="contained" 
              startIcon={<Email />}
              onClick={() => {
                // If landlord email is available, show an alert with the email address
                if (housing.landlordEmail) {
                  alert(`Contact the landlord at: ${housing.landlordEmail}`);
                } else {
                  alert("No landlord email available for this listing.");
                }
              }}
              sx={{ 
                backgroundColor: "#1976d2", 
                "&:hover": { backgroundColor: "#135ba1" }, 
                borderRadius: "8px",
                padding: "10px 20px"
              }}
            >
              Contact Landlord
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Container>
  );
};

// Export the HousingDetails component to be used elsewhere in the application
export default HousingDetails;
