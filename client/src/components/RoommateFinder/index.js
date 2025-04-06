import React, { useState } from 'react';
import {Button, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box,} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    <div style={{ padding: '20px' }}>
      <Button
        variant="contained"
        onClick={findRoommates}
        sx={{
          marginBottom: '20px',
          backgroundColor: 'primary',
          '&:hover': {
            backgroundColor: 'primary',
          },
        }}
      >
        Find Roommates
      </Button>
      <Typography variant="body1" color="textSecondary">
        Make sure you've completed your profile!
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{
          minHeight: '80vh', // Set the minimum height of the container
          marginTop: '20px',
        }}
      >
        {matches.length > 0 &&
          matches.map((user, index) => (
            <Card
              key={index}
              sx={{
                width: 250,
                cursor: "pointer",
                boxShadow: 2,
                borderRadius: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                marginBottom: '20px', // Add space between cards
              }}
              onClick={() => handleCardClick(user)}
            >
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Match Score: {user.matchScore}
                </Typography>
                <Typography variant="caption" color="primary" sx={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
                  Click for profile
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>

      {/* Dialog for showing detailed info about the selected roommate */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogContent
          sx={{
            padding: '24px',
            minWidth: '350px',
            maxWidth: '500px',
            maxHeight: '70vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {selectedRoommate && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedRoommate.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedRoommate.program} | Age: {selectedRoommate.age}
              </Typography>

              <Box sx={{ borderTop: '1px solid #eee', mt: 1, pt: 1 }}>
                {[
                  ['Email', selectedRoommate.email],
                  ['Phone', selectedRoommate.phoneNumber],
                  ['# of Roommates', selectedRoommate.numRoommates],
                  ['Prefer Campus', selectedRoommate.preferCampus],
                  ['Gender', selectedRoommate.gender],
                  ['Smoking', selectedRoommate.smoking],
                  ['Pet Friendly', selectedRoommate.petFriendly],
                  ['Sleep Schedule', selectedRoommate.sleepSchedule],
                  ['Drinking', selectedRoommate.drinking],
                  ['Gym', selectedRoommate.gym],
                  ['Has Car', selectedRoommate.hasCar],
                  ['Study Habits', selectedRoommate.studyHabits],
                  ['Cooking', selectedRoommate.cooking],
                  ['Allergies', selectedRoommate.allergies],
                  ['Familiar with City', selectedRoommate.familiarWithCity],
                  ['Wants New Friends', selectedRoommate.newFriends],
                  ['Respect Boundaries', selectedRoommate.respectBoundaries],
                  ['Split Fridge', selectedRoommate.splitFridge],
                  ['Chore System', selectedRoommate.choreSystem],
                  ['Open Communication', selectedRoommate.openCommunication],
                  ['Organized', selectedRoommate.organized],
                  ['Quiet Hours', selectedRoommate.quietHours],
                  ['Split Finances', selectedRoommate.splitFinances],
                ].map(([label, value], i) => (
                  <Box key={i}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
    </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default RoommateFinder;