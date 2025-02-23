import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const HousingCard = ({ price, bedrooms, location, image }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="Housing Image"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          ${price} / month
        </Typography>
        <Typography color="text.secondary">
          Bedrooms: {bedrooms}
        </Typography>
        <Typography color="text.secondary">
          Location: {location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default HousingCard;
