// Import necessary dependencies from React and Material-UI
import React from 'react';
import Grid from '@mui/material/Grid';  // Grid system for layout management
import HousingCard from './index';  // Importing HousingCard component from the same folder

// Functional component to display a list of housing options
const HousingList = ({ housings }) => {
  return (
    // Creates a container grid to organize the housing cards
    <Grid container spacing={2}>  {/* Adds spacing between grid items */}
      {housings.map(housing => (
        <Grid item key={housing.id} xs={12} sm={6} md={4}>  
          {/* 
            xs={12} -> Full width on extra small screens
            sm={6}  -> Half width on small screens (tablets)
            md={4}  -> One-third width on medium+ screens (desktops)
          */}

          {/* Render a HousingCard for each housing object in the list */}
          <HousingCard 
            id={housing}  // Pass the unique housing ID
            price={housing.price}  // Pass the price
            bedrooms={housing.bedrooms}  // Pass the number of bedrooms
            location={housing.location}  // Pass the location
            image={housing.image}  // Pass the image URL
          />
        </Grid>
      ))}
    </Grid>
  );
};

// Export the HousingList component for use in other parts of the application
export default HousingList;
