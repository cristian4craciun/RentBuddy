import React from 'react';
import { Link } from 'react-router-dom';  
import Card from '@mui/material/Card';  
import CardMedia from '@mui/material/CardMedia';  
import CardContent from '@mui/material/CardContent';  
import Typography from '@mui/material/Typography';  
import CardActions from '@mui/material/CardActions';  
import Button from '@mui/material/Button';  
import Box from '@mui/material/Box';  

// ✅ Fix: Ensure all expected props are explicitly received
const HousingCard = ({ 
  id, price, bedrooms, bathrooms, location, image, 
  squareFootage, leaseDuration, petsAllowed, parkingAvailable, 
  utilitiesIncluded, description, landlordEmail 
}) => {

  console.log("HousingCard props:", { 
    id, price, bedrooms, bathrooms, location, image, 
    squareFootage, leaseDuration, petsAllowed, parkingAvailable, 
    utilitiesIncluded, description, landlordEmail 
  });

  return (
    <Card sx={{
      maxWidth: 380,  
      margin: "16px",  
      borderRadius: "12px",  
      boxShadow: 4,  
      transition: "transform 0.2s ease-in-out",  
      "&:hover": { transform: "scale(1.03)" }  
    }}>
      
      <CardMedia
        component="img"
        height="220"  
        image={image}  
        alt="Housing Image"
        sx={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}  
      />

      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          ${price} / month  
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "8px" }}>
          {bedrooms} Bedroom(s) · {bathrooms} Bathroom(s) · {location}  
        </Typography>
      </CardContent>

      <CardActions>
        <Box sx={{ width: "100%", textAlign: "center" }}>  
          <Button
            component={Link}  
            to={`/details/${id}`}  
            state={{ 
              id, price, bedrooms, bathrooms, location, image, 
              squareFootage, leaseDuration, petsAllowed, parkingAvailable, 
              utilitiesIncluded, description, landlordEmail 
            }}  
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",  
              "&:hover": { backgroundColor: "#135ba1" },  
              borderRadius: "8px",
              width: "90%"  
            }}
          >
            Learn More
          </Button>
        </Box>
      </CardActions>

    </Card>
  );
};

export default HousingCard;
