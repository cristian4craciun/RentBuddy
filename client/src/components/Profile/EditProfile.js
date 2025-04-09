import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography
} from '@mui/material';

const EditProfile = ({ open, onClose, userProfile, onSave }) => {
  const [formData, setFormData] = useState(userProfile);

  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: 'primary.light'}}>Edit Profile</DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <TextField label="Name" fullWidth margin="normal" name="name" value={formData.name} onChange={handleChange} />
        <TextField label="Phone Number" fullWidth margin="normal" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        <TextField label="Email" fullWidth margin="normal" name="email" value={formData.email} onChange={handleChange} />
        <TextField label="Program" fullWidth margin="normal" name="program" value={formData.program} onChange={handleChange} />
        <TextField label="Age" fullWidth margin="normal" name="age" value={formData.age} onChange={handleChange} />
        <TextField label="Number of Roommates Wanted" fullWidth margin="normal" name="numRoommates" value={formData.numRoommates} onChange={handleChange} />

        <FormControl fullWidth margin="normal">
          <InputLabel>Prefer Close to Campus</InputLabel>
          <Select name="preferCampus" value={formData.preferCampus} onChange={handleChange} label="Prefer Close to Campus">
            <MenuItem value="close">Close to Campus</MenuItem>
            <MenuItem value="far">Far from Campus</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Smoking</InputLabel>
          <Select name="smoking" value={formData.smoking} onChange={handleChange} label="Smoking">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Pet Friendly</InputLabel>
          <Select name="petFriendly" value={formData.petFriendly} onChange={handleChange} label="Pet Friendly">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Sleep Schedule</InputLabel>
          <Select name="sleepSchedule" value={formData.sleepSchedule} onChange={handleChange} label="Sleep Schedule">
            <MenuItem value="early">Early Riser</MenuItem>
            <MenuItem value="late">Late Sleeper</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Drinking</InputLabel>
          <Select name="drinking" value={formData.drinking} onChange={handleChange} label="Drinking">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Goes to the Gym</InputLabel>
          <Select name="gym" value={formData.gym} onChange={handleChange} label="Goes to the Gym">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Has a Car</InputLabel>
          <Select name="hasCar" value={formData.hasCar} onChange={handleChange} label="Has a Car">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Study Habits</InputLabel>
          <Select value={formData.studyHabits} onChange={handleChange} label="Study Habits" name="studyHabits">
            <MenuItem value="home-morning">Study at Home - Morning</MenuItem>
            <MenuItem value="home-night">Study at Home - Night</MenuItem>
            <MenuItem value="campus-morning">Study on Campus - Morning</MenuItem>
            <MenuItem value="campus-night">Study on Campus - Night</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Cooking</InputLabel>
          <Select value={formData.cooking} onChange={handleChange} label="Cooking" name="cooking">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Allergies</InputLabel>
          <Select value={formData.allergies} onChange={handleChange} label="Allergies" name="allergies">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        {formData.allergies === "Y" && (
          <TextField label="What allergies?" fullWidth margin="normal" name="allergyDetails" value={formData.allergyDetails} onChange={handleChange} />
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel>Familiar with the City</InputLabel>
          <Select value={formData.familiarWithCity} onChange={handleChange} label="Familiar with the City" name="familiarWithCity">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Looking for New Friends</InputLabel>
          <Select value={formData.newFriends} onChange={handleChange} label="Looking for New Friends" name="newFriends">
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </Select>
        </FormControl>

        <div style={{ margin: '20px 0' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>How do you respect personal space and boundaries?</Typography>
        <RadioGroup name="respectBoundaries" value={formData.respectBoundaries} onChange={handleChange}>
          <FormControlLabel value="I always ask for permission before entering someone's personal space." control={<Radio />} label="I always ask for permission before entering someone's personal space." />
          <FormControlLabel value="I respect people's boundaries most of the time." control={<Radio />} label="I respect people's boundaries most of the time." />
          <FormControlLabel value="I sometimes forget to respect personal space." control={<Radio />} label="I sometimes forget to respect personal space." />
          <FormControlLabel value="I rarely think about personal boundaries." control={<Radio />} label="I rarely think about personal boundaries." />
        </RadioGroup>

        <div style={{ margin: '20px 0' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>How do you feel about sharing fridge space?</Typography>
        <RadioGroup name="splitFridge" value={formData.splitFridge} onChange={handleChange}>
          <FormControlLabel value="I like to share the fridge and keep it organized." control={<Radio />} label="I like to share the fridge and keep it organized." />
          <FormControlLabel value="I'm fine with sharing the fridge, but I prefer to keep my items separate." control={<Radio />} label="I'm fine with sharing the fridge, but I prefer to keep my items separate." />
          <FormControlLabel value="I don't mind sharing the fridge, but I don't care if it's messy." control={<Radio />} label="I don't mind sharing the fridge, but I don't care if it's messy." />
          <FormControlLabel value="I prefer to keep my own food and not share fridge space." control={<Radio />} label="I prefer to keep my own food and not share fridge space." />
        </RadioGroup>

        <div style={{ margin: '20px 0' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>How do you handle chores in a shared space?</Typography>
        <RadioGroup name="choreSystem" value={formData.choreSystem} onChange={handleChange}>
          <FormControlLabel value="I prefer to have a structured chore schedule." control={<Radio />} label="I prefer to have a structured chore schedule." />
          <FormControlLabel value="I prefer a flexible chore system, but I still pitch in." control={<Radio />} label="I prefer a flexible chore system, but I still pitch in." />
          <FormControlLabel value="I rarely do chores unless reminded." control={<Radio />} label="I rarely do chores unless reminded." />
          <FormControlLabel value="I expect others to do the chores." control={<Radio />} label="I expect others to do the chores." />
        </RadioGroup>

        <div style={{ margin: '20px 0' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>How important is open communication to you in a living situation?</Typography>
        <RadioGroup name="openCommunication" value={formData.openCommunication} onChange={handleChange}>
          <FormControlLabel value="Very important – I believe in always talking through any issues." control={<Radio />} label="Very important – I believe in always talking through any issues." />
          <FormControlLabel value="Important – I like to keep communication open but it's not always necessary." control={<Radio />} label="Important – I like to keep communication open but it's not always necessary." />
          <FormControlLabel value="Somewhat important – I prefer to avoid conflicts but will communicate if needed." control={<Radio />} label="Somewhat important – I prefer to avoid conflicts but will communicate if needed." />
          <FormControlLabel value="Not important – I prefer to handle things privately." control={<Radio />} label="Not important – I prefer to handle things privately." />
        </RadioGroup>

        <div style={{ margin: '20px 0' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>How organized are you when it comes to shared living spaces?</Typography>
        <RadioGroup name="organized" value={formData.organized} onChange={handleChange}>
          <FormControlLabel value="I like to keep things neat and organized at all times." control={<Radio />} label="I like to keep things neat and organized at all times." />
          <FormControlLabel value="I try to keep things organized but things sometimes get messy." control={<Radio />} label="I try to keep things organized but things sometimes get messy." />
          <FormControlLabel value="I can be messy, but I do clean up after myself." control={<Radio />} label="I can be messy, but I do clean up after myself." />
          <FormControlLabel value="I don't mind living in a messy space." control={<Radio />} label="I don't mind living in a messy space." />
        </RadioGroup>

        <div style={{ margin: '20px 0' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>What are your thoughts on quiet hours?</Typography>
        <RadioGroup name="quietHours" value={formData.quietHours} onChange={handleChange}>
          <FormControlLabel value="Never. No need for quiet hours." control={<Radio />} label="Never. No need for quiet hours." />
          <FormControlLabel value="Starting from midnight." control={<Radio />} label="Starting from midnight." />
          <FormControlLabel value="Starting early evening." control={<Radio />} label="Starting early evening." />
          <FormControlLabel value="Whenever my roommates decide. I'm flexible." control={<Radio />} label="Whenever my roommates decide. I'm flexible." />
        </RadioGroup>

        <div style={{ margin: '20px 0' }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>How do you think finances should be split when rooming together?</Typography>
        <RadioGroup name="splitFinances" value={formData.splitFinances} onChange={handleChange}>
          <FormControlLabel value="Evenly, regardless of individual usage" control={<Radio />} label="Evenly, regardless of individual usage" />
          <FormControlLabel value="Based on usage (e.g., utilities, shared items)" control={<Radio />} label="Based on usage (e.g., utilities, shared items)" />
          <FormControlLabel value="Only for essentials like rent and internet" control={<Radio />} label="Only for essentials like rent and internet" />
          <FormControlLabel value="openToDiscuss" control={<Radio />} label="I'm open to discussing and deciding together" />
        </RadioGroup>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose} color="secondary" variant="contained" sx={{ borderRadius: 20, textTransform: 'none', paddingX: 3 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ borderRadius: 20, textTransform: 'none', paddingX: 3 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
