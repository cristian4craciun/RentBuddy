import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Used for accessing route state and navigation
import { Container, Typography, Box, Button, Card, CardMedia, CardContent, Divider, Grid, Paper } from '@mui/material'; // UI components from Material-UI
import { ArrowBack, LocationOn, Bed, Bathtub, SquareFoot, Pets, LocalParking, AttachMoney, Email, Description, Map } from '@mui/icons-material'; // Material-UI icons
import MapComponent from '../MapComponent'; // Import the MapComponent

const HousingDetails = () => {
  const location = useLocation();  // Retrieves the passed state (housing details)
  const housing = location.state;  // Stores the housing details from the previous page
  const navigate = useNavigate();  // Enables navigation back to the previous page

  const [reviews, setReviews] = useState([]); // Store reviews in state
  const [reviewText, setReviewText] = useState(""); // State for review text
  const [reviewRating, setReviewRating] = useState(1); // Default rating is 1
  const [showReviewForm, setShowReviewForm] = useState(false); // To toggle the review form

  const handleReviewSubmit = () => {
    const newReview = {
      text: reviewText,
      rating: reviewRating,
    };
    setReviews([...reviews, newReview]); // Add new review to the list
    setReviewText(""); // Clear the review text after submitting
    setReviewRating(1); // Reset rating to 1
    setShowReviewForm(false); // Hide the review form after submission
  };

  // If no housing data is found, display an error message
  if (!housing) {
    return <Typography variant="h4" align="center">Housing details not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: "32px", marginBottom: "32px" }}>
      {/* Back Button - Navigates to the previous page */}
      <Button 
        onClick={() => navigate(-1)}  
        sx={{ marginBottom: "16px" }}  
      >
        Back to Listings
      </Button>

      <Card sx={{ borderRadius: "16px", boxShadow: 4, maxWidth: '1200px', margin: 'auto' }}>
        
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

        {/* Housing Details and Landlord Contact Section */}
        <CardContent sx={{ padding: '16px' }}>
          {/* Left: Housing Details */}
          <Box sx={{ marginBottom: '16px' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              ${housing.price} / month  {/* Displays the monthly rent price */}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {housing.bedrooms} Bedroom(s) · {housing.bathrooms} Bathroom(s) · {housing.location}
            </Typography>

            <Typography variant="body1" sx={{ marginTop: "16px" }}>
              <SquareFoot sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Square Footage:</strong> {housing.squareFootage ? `${housing.squareFootage} sqft` : "Not provided"}
            </Typography>
            <Typography variant="body1">
              <LocalGasStation sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Lease Duration:</strong> {housing.leaseDuration ? housing.leaseDuration : "Not specified"}
            </Typography>
            <Typography variant="body1">
              <Pets sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Pets Allowed:</strong> {housing.petsAllowed ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1">
              <LocationOn sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Parking Available:</strong> {housing.parkingAvailable ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1">
              <LocalGasStation sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Utilities Included:</strong> {housing.utilitiesIncluded ? "Yes" : "No"}
            </Typography>
          </Box>

          {/* Landlord Contact Info */}
          <Box sx={{ marginBottom: '16px' }}>
            <Typography variant="h6" fontWeight="bold">Landlord Contact</Typography>
            <Box sx={{ marginTop: "16px" }}>
            <Typography variant="body1">
              <MailOutline sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Email:</strong> {housing.landlordEmail}</Typography>
              <Typography variant="body1">
              <Phone sx={{ verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>Phone:</strong> {housing.landlordPhone || "Not provided"}</Typography>
            </Box>
          </Box>

          <Divider sx={{ marginY: "16px" }} />

          {/* Display some reviews */}
          {reviews.length > 0 && (
            <Box sx={{ marginTop: "16px" }}>
              <Typography variant="h6">Reviews</Typography>
              {reviews.slice(0, 3).map((review, index) => (
                <Box key={index} sx={{ marginBottom: "12px" }}>
                  <Typography><strong>Rating:</strong> {review.rating} / 5</Typography>
                  <Typography>{review.text}</Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Show Review Form Button */}
          <Button
            variant="contained"
            sx={{ marginTop: "16px" }}
            onClick={() => setShowReviewForm(!showReviewForm)}  // Toggle review form visibility
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </Button>

          {/* Review Form Section */}
          {showReviewForm && (
            <Box sx={{ marginTop: "16px" }}>
              <Typography variant="h6">Write a Review</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Write a review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Box sx={{ marginTop: "8px" }}>
                <Typography variant="body2">Rating</Typography>
                <Rating
                  value={reviewRating}
                  onChange={(e, newValue) => setReviewRating(newValue)}
                  sx={{ marginTop: "8px" }}
                />
              </Box>
              <Button
                variant="contained"
                sx={{ marginTop: "8px" }}
                onClick={handleReviewSubmit}
              >
                Submit Review
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Location Map Card */}
      <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Map sx={{ marginRight: "8px" }} />
            Location
          </Typography>
          
          {/* Map Component with direct Box wrapper */}
          <Box sx={{ height: 400, width: '100%', borderRadius: "8px", overflow: "hidden" }}>
            <MapComponent 
              address={housing.location} 
              height={400} 
              zoom={15}
              showPopup={true}
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: "12px", textAlign: "center" }}>
            {housing.location}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HousingDetails;

