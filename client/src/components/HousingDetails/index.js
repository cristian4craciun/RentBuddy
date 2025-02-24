import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LocationOn, Bed } from '@mui/icons-material';


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
        startIcon={<ArrowBack/>} 
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
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ${housing.price} / month
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {housing.bedrooms} Bedroom(s) · {housing.location}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "12px", lineHeight: 1.6 }}>
            {housing.description}
          </Typography>

          {/* Contact Information */}
          <Box sx={{ marginTop: "24px", textAlign: "center" }}>
            <Button 
              variant="contained" 
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

export default HousingDetails;
