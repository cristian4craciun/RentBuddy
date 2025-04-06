import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import EditProfile from './EditProfile'; // Import the EditProfile component

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
      padding={4} 
      sx={{ 
        backgroundColor: '#000', 
        borderRadius: 2, 
        maxWidth: 600, 
        margin: '0 auto', 
        color: '#fff', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" sx = {{color: '#ADD8E6'}}>
        My Profile
      </Typography>
      <Typography variant="body1" paragraph>
        Complete your profile information below.
      </Typography>

      {/* Profile Display */}
      <Paper elevation={3} sx={{ width: '100%', padding: 3, borderRadius: 2, marginBottom: 3 }}>
        {Object.entries(userProfile).map(([key, value]) => {
          if (key !== "allergyDetails" || userProfile.allergies === "Y") {
            return (
              <Typography key={key} sx={{ marginBottom: 1 }}>
                <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {value || 'N/A'}
              </Typography>
            );
          }
          return null;
        })}
      </Paper>


      {/* Edit Profile Button */}
      <Box mt={3} sx={{ width: '100%' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenDialog(true)} 
          sx={{ width: '100%' }}
        >
          Edit Profile
        </Button>
      </Box>

      {/* Edit Profile Dialog */}
      <EditProfile 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        userProfile={userProfile} 
        onSave={handleProfileChange}
      />
    </Box>
  );
};

export default Profile;
