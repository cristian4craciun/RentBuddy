import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Stack
} from '@mui/material';
import EditProfile from './EditProfile';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    program: '',
    age: '',
    numRoommates: '',
    preferCampus: '',
    gender: '',
    smoking: '',
    petFriendly: '',
    sleepSchedule: '',
    drinking: '',
    gym: '',
    hasCar: '',
    studyHabits: '',
    cooking: '',
    allergies: '',
    allergyDetails: '',
    familiarWithCity: '',
    newFriends: '',
    respectBoundaries: '',
    splitFridge: '',
    choreSystem: '',
    openCommunication: '',
    organized: '',
    quietHours: '',
    splitFinances: ''
  });
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close

  const handleProfileChange = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setOpenDialog(false); // Close the dialog after saving
  };

  return (
    <Box
      sx={{
        bgcolor: '#0e1117',
        minHeight: '100vh',
        py: 8,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 1100,
          bgcolor: '#161b22',
          color: '#e6edf3',
          borderRadius: 4,
          p: 5,
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: '#58a6ff' }}
          >
            My Profile
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: '#8b949e', mb: 2 }}
          >
            Keep your preferences up-to-date to get the best roommate matches.
          </Typography>

          <Divider sx={{ borderColor: '#30363d', mb: 3 }} />

          <Grid container spacing={3}>
            {Object.entries(userProfile).map(([key, value]) => {
              if (key !== 'allergyDetails' || userProfile.allergies === 'Y') {
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Box
                      sx={{
                        backgroundColor: '#1c2128',
                        borderRadius: 3,
                        p: 2.5,
                        height: '100%',
                        boxShadow: '0 0 0 1px #30363d',
                        transition: '0.3s ease',
                        '&:hover': {
                          boxShadow: '0 0 0 2px #58a6ff',
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: '#8b949e', fontSize: '0.75rem' }}
                      >
                        {formattedKey}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 500, mt: 0.5, color: value ? '#e6edf3' : '#586069' }}
                      >
                        {value || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>

          <Box mt={5} textAlign="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenDialog(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                px: 5,
                py: 1.5,
                borderRadius: '999px',
                backgroundColor: '#238636',
                '&:hover': {
                  backgroundColor: '#2ea043',
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>

          <EditProfile
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            userProfile={userProfile}
            onSave={handleProfileChange}
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;
