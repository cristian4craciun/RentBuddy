// Import necessary dependencies from React and Material-UI
import React from 'react';
import Grid from '@mui/material/Grid';
import HousingCard from './index';  // Importing the HousingCard component

// Functional component to display a list of housing options
const HousingList = ({ housings }) => {
  return (
    // Creates a container grid to organize the housing cards
    <Grid container spacing={2}>  
      {/* Loops through the 'housings' array and creates a HousingCard for each listing */}
      {housings.map(housing => (
        <Grid item key={housing.id} xs={12} sm={6} md={4}>  
          {/* 
            xs={12} -> Full width on extra small screens
            sm={6}  -> Half width on small screens (tablets)
            md={4}  -> One-third width on medium+ screens (desktops)
          */}

          {/* Render a HousingCard and pass all housing properties as props */}
          <HousingCard 
            id={housing.id}                    // Unique housing ID
            price={housing.price}              // Monthly rent price
            bedrooms={housing.bedrooms}        // Number of bedrooms
            bathrooms={housing.bathrooms}      // Number of bathrooms
            location={housing.location}        // Location of the housing
            image={housing.image}              // URL of the housing image
            squareFootage={housing.squareFootage} // Total square footage
            leaseDuration={housing.leaseDuration} // Lease duration (e.g., 12 months)
            petsAllowed={housing.petsAllowed}  // Boolean indicating if pets are allowed
            parkingAvailable={housing.parkingAvailable} // Boolean indicating parking availability
            utilitiesIncluded={housing.utilitiesIncluded} // Boolean indicating if utilities are included
            description={housing.description}  // Additional details about the property
            landlordEmail={housing.landlordEmail} // Contact email of the landlord
          />
        </Grid>
      ))}
    </Grid>
  );
};

// Export the HousingList component for use in other parts of the application
export default HousingList;
