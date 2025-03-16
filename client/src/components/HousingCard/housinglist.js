import React from 'react';
import Grid from '@mui/material/Grid';
import HousingCard from './index';  

const HousingList = ({ housings }) => {
  return (
    <Grid container spacing={2}>  
      {housings.map(housing => (
        <Grid item key={housing.id} xs={12} sm={6} md={4}>  
          {/* Pass ALL properties to HousingCard */}
          <HousingCard 
            id={housing.id}
            price={housing.price}
            bedrooms={housing.bedrooms}
            bathrooms={housing.bathrooms}
            location={housing.location}
            image={housing.image}
            squareFootage={housing.squareFootage}
            leaseDuration={housing.leaseDuration}
            petsAllowed={housing.petsAllowed}
            parkingAvailable={housing.parkingAvailable}
            utilitiesIncluded={housing.utilitiesIncluded}
            description={housing.description}
            landlordEmail={housing.landlordEmail}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HousingList;
