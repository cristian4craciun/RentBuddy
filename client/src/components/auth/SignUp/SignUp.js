import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

const Signup = ({ firebase }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const idToken = await firebase.doCreateUserWithEmailAndPassword(email, password);

      // Send token to backend
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      if (data.user) {
        navigate('/'); // Redirect to home after signup
      } else {
        setError("Signup failed.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 5,
          backgroundColor: '#1e1e1e',
          color: '#fff',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="grey.500" mb={2}>
          Create an account to get started
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: '#90caf9' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#90caf9' },
                '&:hover fieldset': { borderColor: '#64b5f6' },
                '&.Mui-focused fieldset': { borderColor: '#42a5f5' },
              },
              input: { color: '#fff' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#90caf9' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#90caf9' },
                '&:hover fieldset': { borderColor: '#64b5f6' },
                '&.Mui-focused fieldset': { borderColor: '#42a5f5' },
              },
              input: { color: '#fff' },
            }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5, bgcolor: '#42a5f5' }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
        </form>

        <Typography variant="body2" mt={2}>
          Already have an account?{" "}
          <Button variant="text" onClick={() => navigate('/signin')} sx={{ color: '#90caf9' }}>
            Sign In
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default withFirebase(Signup);
