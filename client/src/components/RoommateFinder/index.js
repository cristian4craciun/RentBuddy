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
    organized: "I like to keep things neat and organized at all times"
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
    organized: "I try to keep things organized but things sometimes get messy."
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
    organized: "I can be messy, but I do clean up after myself."
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
    organized: "I like to keep things neat and organized at all times"
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
    organized: "I try to keep things organized but things sometimes get messy."
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
    organized: "I can be messy, but I do clean up after myself."
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
    organized: "I like to keep things neat and organized at all times"
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
    organized: "I try to keep things organized but things sometimes get messy."
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
    organized: "I like to keep things neat and organized at all times"
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
    openCommunication: "Very important – I believe in always talking through any issues.",
    organized: "I like to keep things neat and organized at all times"
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
  organized: "I try to keep things organized but things sometimes get messy."
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
      "respectBoundaries", "splitFridge", "choreSystem", "openCommunication", "organized"
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
              </CardContent>
            </Card>
          ))}
      </Box>


      {/* Dialog for showing detailed info about the selected roommate */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Roommate Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          {selectedRoommate && (
            <>
              <Typography variant="h6" sx={{ marginBottom: '10px' }}>Name: {selectedRoommate.name}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Email: {selectedRoommate.email}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Phone: {selectedRoommate.phoneNumber}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Program: {selectedRoommate.program}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Age: {selectedRoommate.age}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Number of Roommates: {selectedRoommate.numRoommates}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Prefer Campus: {selectedRoommate.preferCampus}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Gender: {selectedRoommate.gender}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Smoking: {selectedRoommate.smoking}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Pet Friendly: {selectedRoommate.petFriendly}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Sleep Schedule: {selectedRoommate.sleepSchedule}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Drinking: {selectedRoommate.drinking}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Gym: {selectedRoommate.gym}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Has Car: {selectedRoommate.hasCar}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Study Habits: {selectedRoommate.studyHabits}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Cooking: {selectedRoommate.cooking}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Allergies: {selectedRoommate.allergies}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Familiar With City: {selectedRoommate.familiarWithCity}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>New Friends: {selectedRoommate.newFriends}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Respect Boundaries: {selectedRoommate.respectBoundaries}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Split Fridge: {selectedRoommate.splitFridge}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Chore System: {selectedRoommate.choreSystem}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Open Communication: {selectedRoommate.openCommunication}</Typography>
              <Typography variant="body1" sx={{ marginBottom: '5px' }}>Organized: {selectedRoommate.organized}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" sx={{ margin: '10px' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoommateFinder;