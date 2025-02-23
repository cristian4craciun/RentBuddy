import React, { useState } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Grid, Box, Button, FormHelperText } from '@mui/material';

const RoommateFinder = () => {
  const [gender, setGender] = useState('');
  const [smoking, setSmoking] = useState('');
  const [petFriendly, setPetFriendly] = useState('');
  const [sleepSchedule, setSleepSchedule] = useState('');
  const [formError, setFormError] = useState(false);
  const [roommateMatches, setRoommateMatches] = useState([]);

  // match scoring logic
  const calculateMatchScore = (prospect1, userPreferences) => {
    let score = 0;

    if (prospect1.gender === userPreferences.gender) score += 3;
    if (prospect1.smoking === userPreferences.smoking) score += 1;
    if (prospect1.pet_friendly === userPreferences.pet_friendly) score += 1;
    if (prospect1.sleep_time === userPreferences.sleep_time) score += 1;

    return score;
  };

  // function to get the sorted list of matches
  const RoommateMatcher = (prospects, userPreferences) => {
    const matchScores = [];

    // calculate match score for each prospect
    for (const prospect of prospects) {
      const score = calculateMatchScore(prospect, userPreferences);
      matchScores.push({
        prospect_id: prospect.prospect_id,
        name: prospect.name,
        phone: prospect.phone,
        score
      });
    }

    // sort by score in descending order
    matchScores.sort((a, b) => b.score - a.score);

    // return only top 5 matches
    return matchScores.slice(0, 5);
  };

  // handle form submission and run the matching process
  const handleFormSubmit = () => {
    if (!gender || !smoking || !petFriendly || !sleepSchedule) {
      setFormError(true);
    } else {
      setFormError(false);
      const userPreferences = { gender, smoking, pet_friendly: petFriendly, sleep_time: sleepSchedule };

      // sample dummy data for prospects with names and fake phone numbers - this will be replaced by mysql database data
      const prospects = [
        { prospect_id: 1, name: 'John Doe', phone: '555-0101', gender: 'M', smoking: 'Y', pet_friendly: 'N', sleep_time: 'late' },
        { prospect_id: 2, name: 'Jane Smith', phone: '555-0102', gender: 'F', smoking: 'N', pet_friendly: 'Y', sleep_time: 'early' },
        { prospect_id: 3, name: 'Alex Johnson', phone: '555-0103', gender: 'M', smoking: 'N', pet_friendly: 'Y', sleep_time: 'late' },
        { prospect_id: 4, name: 'Emily Davis', phone: '555-0104', gender: 'F', smoking: 'Y', pet_friendly: 'N', sleep_time: 'early' },
        { prospect_id: 5, name: 'Chris Brown', phone: '555-0105', gender: 'M', smoking: 'Y', pet_friendly: 'Y', sleep_time: 'early' },
        { prospect_id: 6, name: 'Sara Wilson', phone: '555-0106', gender: 'F', smoking: 'N', pet_friendly: 'Y', sleep_time: 'late' },
        { prospect_id: 7, name: 'David Lee', phone: '555-0107', gender: 'M', smoking: 'N', pet_friendly: 'N', sleep_time: 'early' },
        { prospect_id: 8, name: 'Olivia Martinez', phone: '555-0108', gender: 'F', smoking: 'Y', pet_friendly: 'N', sleep_time: 'late' },
        { prospect_id: 9, name: 'Daniel Garcia', phone: '555-0109', gender: 'M', smoking: 'Y', pet_friendly: 'Y', sleep_time: 'early' },
        { prospect_id: 10, name: 'Sophia Anderson', phone: '555-0110', gender: 'F', smoking: 'N', pet_friendly: 'Y', sleep_time: 'late' },
      ];

      // get the top 5 matches sorted by score
      const matches = RoommateMatcher(prospects, userPreferences);

      // update state with the top 5 matches
      setRoommateMatches(matches);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Roommate Finder
      </Typography>
      <Typography variant="body1" paragraph>
        Find a roommate that fits your preferences.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box padding={3} border={1} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Roommate Preferences
            </Typography>

            {/* Gender Input */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>

            {/* Smoking Preference Input */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Smoking</InputLabel>
              <Select
                value={smoking}
                onChange={(e) => setSmoking(e.target.value)}
                label="Smoking"
              >
                <MenuItem value="Y">Yes</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </Select>
            </FormControl>

            {/* Pet Friendly Preference Input */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Pet Friendly</InputLabel>
              <Select
                value={petFriendly}
                onChange={(e) => setPetFriendly(e.target.value)}
                label="Pet Friendly"
              >
                <MenuItem value="Y">Yes</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </Select>
            </FormControl>

            {/* Sleep Schedule Preference Input */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Sleep Schedule</InputLabel>
              <Select
                value={sleepSchedule}
                onChange={(e) => setSleepSchedule(e.target.value)}
                label="Sleep Schedule"
              >
                <MenuItem value="early">Early</MenuItem>
                <MenuItem value="late">Late</MenuItem>
              </Select>
            </FormControl>

            {formError && (
              <FormHelperText error>
                All fields are required.
              </FormHelperText>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
            >
              Find Matches
            </Button>
          </Box>
        </Grid>

        {/* show the top 5 matches */}
        <Grid item xs={12} md={6}>
          <Box padding={3} border={1} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Top 5 Roommate Matches
            </Typography>
            <ul>
              {roommateMatches.length > 0 ? (
                roommateMatches.map((match) => (
                  <li key={match.prospect_id}>
                    <Typography>
                      <strong>{match.name}</strong> <br />Phone: {match.phone}
                    </Typography>
                  </li>
                ))
              ) : (
                <Typography>No matches found yet</Typography>
              )}
            </ul>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default RoommateFinder;
