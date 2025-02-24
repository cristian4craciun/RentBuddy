import React from 'react';
import Grid from '@mui/material/Grid';
import HousingCard from './index';  // Since both files are in HousingCard

const HousingList = ({ housings }) => {
  return (
    <Grid container spacing={2}>
      {housings.map(housing => (
        <Grid item key={housing.id} xs={12} sm={6} md={4}>
          <HousingCard 
            id={housing}
            price={housing.price} 
            bedrooms={housing.bedrooms} 
            location={housing.location}
            image={housing.image}  // Pass the image prop
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HousingList;
