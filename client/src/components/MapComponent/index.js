// MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing default marker icons in Leaflet + Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const fallbackCoords = [
  { lat: 43.4723, lon: -80.5449, label: 'University of Waterloo' },
  { lat: 43.4643, lon: -80.5204, label: 'Uptown Waterloo' },
  { lat: 43.4596, lon: -80.5137, label: 'Columbia & Lester' },
];

const getRandomFallback = () =>
  fallbackCoords[Math.floor(Math.random() * fallbackCoords.length)];

const MapComponent = ({ address, height = 300 }) => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
        } else {
          setCoords(getRandomFallback());
        }
      } catch (err) {
        console.error('Geocoding error, using fallback:', err);
        setCoords(getRandomFallback());
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchCoords();
    } else {
      setCoords(getRandomFallback());
      setLoading(false);
    }
  }, [address]);

  if (loading || !coords) {
    return (
      <Box
        sx={{
          height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#eee',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height, width: '100%' }}>
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[coords.lat, coords.lon]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
