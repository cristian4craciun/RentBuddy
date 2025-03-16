// Import necessary dependencies from React and Material-UI
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { ArrowBack, LocationOn, Bed, Bathtub, SquareFoot, Pets, LocalParking, AttachMoney, Email, Description } from '@mui/icons-material';

const HousingDetails = () => {
  const location = useLocation();
  const housing = location.state;
  const navigate = useNavigate();

  if (!housing) {
    return <Typography variant="h4" align="center">Housing details not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "32px", marginBottom: "32px" }}>
      {/* Back Button */}
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)} 
        sx={{ marginBottom: "16px" }}
      >
        Back to Listings
      </Button>

      {/* Housing Details Card */}
      <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
        {/* Housing Image */}
        <CardMedia
          component="img"
          height="400"
          image={housing.image}
          alt="Housing Image"
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px"
          }}
        />
        <CardContent>
          {/* Price and Location */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ${housing.price} / month
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <Bed sx={{ verticalAlign: "middle", marginRight: "6px" }} /> {housing.bedrooms} Bedroom(s) · 
            <Bathtub sx={{ verticalAlign: "middle", marginRight: "6px", marginLeft: "6px" }} /> {housing.bathrooms} Bathroom(s) · 
            <LocationOn sx={{ verticalAlign: "middle", marginRight: "6px", marginLeft: "6px" }} /> {housing.location}
          </Typography>

          {/* Divider */}
          <Divider sx={{ marginY: "16px" }} />

          {/* Additional Housing Details */}
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <SquareFoot sx={{ verticalAlign: "middle", marginRight: "6px" }} /> <strong>Square Footage:</strong> {housing.squareFootage ? `${housing.squareFootage} sqft` : "Not provided"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <AttachMoney sx={{ verticalAlign: "middle", marginRight: "6px" }} /> <strong>Lease Duration:</strong> {housing.leaseDuration ? housing.leaseDuration : "Not specified"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <Pets sx={{ verticalAlign: "middle", marginRight: "6px" }} /> <strong>Pet Policy:</strong> {housing.petsAllowed ? "Allowed" : "Not Allowed"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <LocalParking sx={{ verticalAlign: "middle", marginRight: "6px" }} /> <strong>Parking:</strong> {housing.parkingAvailable ? "Available" : "Not Available"}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>Utilities Included:</strong> {housing.utilitiesIncluded ? "Yes" : "No"}
          </Typography>

          {/* Housing Description */}
          <Typography variant="body1" sx={{ marginTop: "12px", lineHeight: 1.6 }}>
            <Description sx={{ verticalAlign: "middle", marginRight: "6px" }} /> {housing.description ? housing.description : "No description available"}
          </Typography>

          {/* Contact Landlord Button */}
          <Box sx={{ marginTop: "24px", textAlign: "center" }}>
            <Button 
              variant="contained" 
              startIcon={<Email />}
              onClick={() => {
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

// Export the HousingDetails component
export default HousingDetails;
