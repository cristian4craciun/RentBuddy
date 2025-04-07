import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
  IconButton,
  Divider,
  Chip,
  Avatar,
  Grid,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

// Dummy user data
const dummyUsers = [
  {
    name: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    program: "Engineering",
    age: 21,
    numRoommates: 2,
    preferCampus: "close",
    gender: "M",
    smoking: "N",
    petFriendly: "Y",
    sleepSchedule: "early",
    drinking: "Y",
    gym: "N",
    hasCar: "Y",
    studyHabits: "home-morning",
    cooking: "Y",
    allergies: "N",
    familiarWithCity: "Y",
    newFriends: "Y",
    respectBoundaries: "I always ask for permission before entering someone's personal space.",
    splitFridge: "I like to share the fridge and keep it organized.",
    choreSystem: "I prefer to have a structured chore schedule.",
    openCommunication: "Very important – I believe in always talking through any issues.",
    organized: "I like to keep things neat and organized at all times",
    quietHours: "Starting from midnight.",
    splitFinances: "Evenly, regardless of individual usage"
  },
  {
    name: "Emily Brown",
    phoneNumber: "234-567-8901",
    email: "emily@example.com",
    program: "Biology",
    age: 23,
    numRoommates: 5,
    preferCampus: "far",
    gender: "F",
    smoking: "N",
    petFriendly: "N",
    sleepSchedule: "late",
    drinking: "N",
    gym: "Y",
    hasCar: "N",
    studyHabits: "campus-night",
    cooking: "Y",
    allergies: "Y",
    familiarWithCity: "Y",
    newFriends: "Y",
    respectBoundaries: "I respect people's boundaries most of the time.",
    splitFridge: "I'm fine with sharing the fridge, but I prefer to keep my items separate.",
    choreSystem: "I prefer a flexible chore system, but I still pitch in.",
    openCommunication: "Important – I like to keep communication open but it's not always necessary.",
    organized: "I try to keep things organized but things sometimes get messy.",
    quietHours: "Starting early evening.",
    splitFinances: "Based on usage (e.g., utilities, shared items)"
  },
  {
    name: "Alex Johnson",
    phoneNumber: "345-678-9012",
    email: "alex@example.com",
    program: "Physics",
    age: 25,
    numRoommates: 3,
    preferCampus: "close",
    gender: "M",
    smoking: "Y",
    petFriendly: "N",
    sleepSchedule: "early",
    drinking: "Y",
    gym: "Y",
    hasCar: "Y",
    studyHabits: "home-night",
    cooking: "Y",
    allergies: "N",
    familiarWithCity: "N",
    newFriends: "N",
    respectBoundaries: "I sometimes forget to respect personal space.",
    splitFridge: "I don't mind sharing the fridge, but I don't care if it's messy.",
    choreSystem: "I rarely do chores unless reminded.",
    openCommunication: "Somewhat important – I prefer to avoid conflicts but will communicate if needed.",
    organized: "I can be messy, but I do clean up after myself.",
    quietHours: "Whenever my roommates decide. I'm flexible.",
    splitFinances: "Only for essentials like rent and internet"
  },
  {
    name: "Samantha Green",
    phoneNumber: "456-789-0123",
    email: "samantha@example.com",
    program: "Computer Science",
    age: 24,
    numRoommates: 2,
    preferCampus: "far",
    gender: "F",
    smoking: "N",
    petFriendly: "Y",
    sleepSchedule: "late",
    drinking: "Y",
    gym: "N",
    hasCar: "N",
    studyHabits: "campus-morning",
    cooking: "N",
    allergies: "Y",
    familiarWithCity: "Y",
    newFriends: "Y",
    respectBoundaries: "I always ask for permission before entering someone's personal space.",
    splitFridge: "I like to share the fridge and keep it organized.",
    choreSystem: "I prefer to have a structured chore schedule.",
    openCommunication: "Very important – I believe in always talking through any issues.",
    organized: "I like to keep things neat and organized at all times",
    quietHours: "Starting from midnight.",
    splitFinances: "I'm open to discussing and deciding together"
  },
  {
    name: "Chris Williams",
    phoneNumber: "567-890-1234",
    email: "chris@example.com",
    program: "Mathematics",
    age: 20,
    numRoommates: 4,
    preferCampus: "close",
    gender: "M",
    smoking: "N",
    petFriendly: "N",
    sleepSchedule: "early",
    drinking: "N",
    gym: "Y",
    hasCar: "Y",
    studyHabits: "home-morning",
    cooking: "Y",
    allergies: "N",
    familiarWithCity: "Y",
    newFriends: "Y",
    respectBoundaries: "I respect people's boundaries most of the time.",
    splitFridge: "I'm fine with sharing the fridge, but I prefer to keep my items separate.",
    choreSystem: "I prefer a flexible chore system, but I still pitch in.",
    openCommunication: "Important – I like to keep communication open but it's not always necessary.",
    organized: "I try to keep things organized but things sometimes get messy.",
    quietHours: "Starting early evening.",
    splitFinances: "Based on usage (e.g., utilities, shared items)"
  },
  {
    name: "Jordan Lee",
    phoneNumber: "678-901-2345",
    email: "jordan@example.com",
    program: "History",
    age: 26,
    numRoommates: 4,
    preferCampus: "far",
    gender: "M",
    smoking: "Y",
    petFriendly: "Y",
    sleepSchedule: "late",
    drinking: "Y",
    gym: "N",
    hasCar: "N",
    studyHabits: "campus-night",
    cooking: "Y",
    allergies: "N",
    familiarWithCity: "N",
    newFriends: "N",
    respectBoundaries: "I sometimes forget to respect personal space.",
    splitFridge: "I don't mind sharing the fridge, but I don't care if it's messy.",
    choreSystem: "I rarely do chores unless reminded.",
    openCommunication: "Somewhat important – I prefer to avoid conflicts but will communicate if needed.",
    organized: "I can be messy, but I do clean up after myself.",
    quietHours: "Whenever my roommates decide. I'm flexible.",
    splitFinances: "I'm open to discussing and deciding together"
  },
  {
    name: "Isabella Adams",
    phoneNumber: "789-012-3456",
    email: "isabella@example.com",
    program: "Chemistry",
    age: 22,
    numRoommates: 2,
    preferCampus: "close",
    gender: "F",
    smoking: "N",
    petFriendly: "Y",
    sleepSchedule: "early",
    drinking: "N",
    gym: "Y",
    hasCar: "Y",
    studyHabits: "home-night",
    cooking: "Y",
    allergies: "Y",
    familiarWithCity: "Y",
    newFriends: "Y",
    respectBoundaries: "I always ask for permission before entering someone's personal space.",
    splitFridge: "I like to share the fridge and keep it organized.",
    choreSystem: "I prefer to have a structured chore schedule.",
    openCommunication: "Very important – I believe in always talking through any issues.",
    organized: "I like to keep things neat and organized at all times",
    quietHours: "Starting from midnight.",
    splitFinances: "Evenly, regardless of individual usage"
  },
  {
    name: "Liam Scott",
    phoneNumber: "890-123-4567",
    email: "liam@example.com",
    program: "English",
    age: 21,
    numRoommates: 3,
    preferCampus: "far",
    gender: "M",
    smoking: "N",
    petFriendly: "N",
    sleepSchedule: "late",
    drinking: "Y",
    gym: "Y",
    hasCar: "N",
    studyHabits: "campus-morning",
    cooking: "N",
    allergies: "N",
    familiarWithCity: "Y",
    newFriends: "Y",
    respectBoundaries: "I respect people's boundaries most of the time.",
    splitFridge: "I'm fine with sharing the fridge, but I prefer to keep my items separate.",
    choreSystem: "I prefer a flexible chore system, but I still pitch in.",
    openCommunication: "Important – I like to keep communication open but it's not always necessary.",
    organized: "I try to keep things organized but things sometimes get messy.",
    quietHours: "Starting early evening.",
    splitFinances: "Based on usage (e.g., utilities, shared items)"
  },
  {
    name: "Mia Thomas",
    phoneNumber: "901-234-5678",
    email: "mia@example.com",
    program: "Psychology",
    age: 24,
    numRoommates: 2,
    preferCampus: "close",
    gender: "F",
    smoking: "Y",
    petFriendly: "N",
    sleepSchedule: "early",
    drinking: "Y",
    gym: "N",
    hasCar: "Y",
    studyHabits: "home-morning",
    cooking: "Y",
    allergies: "N",
    familiarWithCity: "N",
    newFriends: "N",
    respectBoundaries: "I always ask for permission before entering someone's personal space.",
    splitFridge: "I like to share the fridge and keep it organized.",
    choreSystem: "I prefer to have a structured chore schedule.",
    openCommunication: "Very important – I believe in always talking through any issues.",
    organized: "I like to keep things neat and organized at all times",
    quietHours: "Starting from midnight.",
    splitFinances: "Evenly, regardless of individual usage"
  },
  {
    name: "Noah White",
    phoneNumber: "012-345-6789",
    email: "noah@example.com",
    program: "Philosophy",
    age: 27,
    numRoommates: 3,
    preferCampus: "far",
    gender: "M",
    smoking: "N",
    petFriendly: "Y",
    sleepSchedule: "late",
    drinking: "N",
    gym: "Y",
    hasCar: "Y",
    studyHabits: "campus-night",
    cooking: "Y",
    allergies: "Y",
    familiarWithCity: "Y",
    newFriends: "Y",
    respectBoundaries: "I respect people's boundaries most of the time.",
    splitFridge: "I like to share the fridge and keep it organized.",
    choreSystem: "I prefer to have a structured chore schedule.",
    openCommunication: "Very important – I believe in",
    quietHours: "Starting from midnight.",
    splitFinances: "Evenly, regardless of individual usage"
  }
];

// Current user dummy data
const currentUser = {
  name: "Jane Doe",
  phoneNumber: "987-654-3210",
  email: "jane@example.com",
  program: "Business",
  age: 22,
  numRoommates: 3,
  preferCampus: "close",
  gender: "F",
  smoking: "N",
  petFriendly: "N",
  sleepSchedule: "late",
  drinking: "N",
  gym: "Y",
  hasCar: "N",
  studyHabits: "campus-morning",
  cooking: "N",
  allergies: "Y",
  familiarWithCity: "N",
  newFriends: "Y",
  respectBoundaries: "I respect people's boundaries most of the time.",
  splitFridge: "I'm fine with sharing the fridge, but I prefer to keep my items separate.",
  choreSystem: "I prefer a flexible chore system, but I still pitch in.",
  openCommunication: "Important – I like to keep communication open but it's not always necessary.",
  organized: "I try to keep things organized but things sometimes get messy.",
  quietHours: "Starting from midnight.",
  splitFinances: "Evenly, regardless of individual usage"
};

const RoommateFinder = () => {
  const [matches, setMatches] = useState([]);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Function to calculate match score excluding name, email, and phone number
  const calculateMatchScore = (user) => {
    let score = 0;

    // Compare each field except name, email, and phone number
    const fieldsToCompare = [
      "program", "age", "numRoommates", "preferCampus", "gender", "smoking", "petFriendly", "sleepSchedule",
      "drinking", "gym", "hasCar", "studyHabits", "cooking", "allergies", "familiarWithCity", "newFriends",
      "respectBoundaries", "splitFridge", "choreSystem", "openCommunication", "organized", "quietHours", "splitFinances"
    ];

    fieldsToCompare.forEach((key) => {
      if (currentUser[key] === user[key]) {
        score++;
      }
    });

    return score;
  };

  // Handle Find Roommate button click
  const findRoommates = () => {
    const matchedUsers = dummyUsers.map((user) => {
      return {
        ...user,
        matchScore: calculateMatchScore(user)
      };
    });

    // Sort users based on the match score (highest first)
    matchedUsers.sort((a, b) => b.matchScore - a.matchScore);

    // Set the sorted matches to display
    setMatches(matchedUsers);
  };

  // Open the dialog with the selected roommate's details
  const handleCardClick = (user) => {
    setSelectedRoommate(user);
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoommate(null);
  };

  return (
    <Box sx={{ px: 4, py: 6, bgcolor: '#0d1117', minHeight: '100vh' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3" fontWeight="bold" sx={{ color: '#58a6ff' }}>
        Roommate Finder
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Make sure you've completed your profile!
        </Typography>
        <Button
          variant="contained"
          onClick={findRoommates}
          sx={{
            bgcolor: '#238636',
            px: 5,
            py: 1.5,
            fontWeight: 600,
            borderRadius: '999px',
            textTransform: 'none',
            '&:hover': { bgcolor: '#2ea043' },
          }}
        >
          🔍 Find Roommates
        </Button>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
          mt={12}
        >
          {matches.map((user, i) => (
            <Card
              key={i}
              onClick={() => handleCardClick(user)}
              sx={{
                width: 260,
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                bgcolor: '#161b22',
                color: '#e6edf3',
                boxShadow: 3,
                borderRadius: 4,
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
              }}
            >
              <CardContent>
                <Stack alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: '#58a6ff', width: 56, height: 56 }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Chip label={`Score: ${user.matchScore}`} size="small" color="success" />
                  <Typography variant="caption" color="primary">
                    Tap to view profile
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Stack>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md" PaperProps={{ sx: { bgcolor: '#0d1117', color: '#e6edf3', borderRadius: 4 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            {selectedRoommate?.name}
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: '#8b949e' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ px: 4, py: 3 }}>
          {selectedRoommate && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: '#58a6ff', width: 64, height: 64 }}>
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedRoommate.program}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {selectedRoommate.age}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ borderColor: '#30363d', my: 2 }} />
              <Grid container spacing={2}>
                {[
                  "email", "phoneNumber", "numRoommates", "preferCampus", "gender",
                  "smoking", "petFriendly", "sleepSchedule", "drinking", "gym",
                  "hasCar", "studyHabits", "cooking", "allergies", "familiarWithCity",
                  "newFriends", "respectBoundaries", "splitFridge", "choreSystem",
                  "openCommunication", "organized", "quietHours", "splitFinances"
                ].map((key, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Paper elevation={1} sx={{ height: '100%', p: 2, bgcolor: '#161b22', borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#58a6ff' }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedRoommate[key] || 'N/A'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 4, pb: 3 }}>
          <Button onClick={handleCloseDialog} variant="outlined" sx={{ borderRadius: '999px', px: 3, color: '#e6edf3', borderColor: '#90caf9', '&:hover': { borderColor: '#58a6ff', color: '#58a6ff' } }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoommateFinder;
