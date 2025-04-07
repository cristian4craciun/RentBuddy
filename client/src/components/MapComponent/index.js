import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const fallback = { lat: 43.4723, lon: -80.5449 };

const MapComponent = ({ address, height = 220 }) => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await res.json();
        if (data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
        } else {
          setCoords(fallback);
        }
      } catch {
        setCoords(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [address]);

  if (loading || !coords) {
    return (
      <Box sx={{ height, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#eee' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height }}>
      <MapContainer center={[coords.lat, coords.lon]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
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

