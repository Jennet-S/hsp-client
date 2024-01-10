// Importing React, Material-UI components, and necessary icons
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// React component for adding schedule details
function AddScheduleForm({ onSubmit }) {
  // State to manage the visibility of the dialog
  const [open, setOpen] = React.useState(false);

  // State to manage selected shift, time, schedule item, and room
  const [selectedShift, setSelectedShift] = useState('Am');
  const [selectedTime, setSelectedTime] = useState('7am');
  const [scheduleItem, setScheduleItem] = useState('');
  const [room, setRoom] = useState('');

  // Handling shift change
  const handleShiftChange = (e) => {
    setSelectedShift(e.target.value);
    // Set the first time of the selected shift
    setSelectedTime(getShiftTimes(e.target.value)[0]);
  };

  // Handling time change
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Handling schedule item change
  const handleScheduleItemChange = (e) => {
    setScheduleItem(e.target.value);
  };

  // Handling room change
  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  // Handling dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handling dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      time: selectedTime,
      scheduleItem,
      room,
    });

    // Resetting form values
    setSelectedShift('Am');
    setSelectedTime('');
    setScheduleItem('');
    setRoom('');

    setOpen(false);
  };

  // Available shift options
  const shiftOptions = ['Am', 'Pm', 'Nocte'];

  // Function to get shift-specific times
  const getShiftTimes = (shift) => {
    switch (shift) {
      case 'Am':
        return ['7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm'];
      case 'Pm':
        return ['3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
      case 'Nocte':
        return ['11pm', '12pm', '1am', '2am', '3am', '4am', '5am', '6am', '7am'];
      default:
        return [];
    }
  };

  // Generating shift-specific times
  const shiftTimes = getShiftTimes(selectedShift);

  // Rendering the component
  return (
    <React.Fragment>
      {/* Button to open the dialog */}
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Add Schedule
      </Button>
      {/* Dialog for adding schedule details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Schedule Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Form for adding schedule details */}
            <form onSubmit={handleSubmit}>
              {/* Dropdown for selecting shift */}
              <FormControl fullWidth>
                <Select
                  value={selectedShift}
                  onChange={handleShiftChange}
                  fullWidth
                >
                  {shiftOptions.map((shift) => (
                    <MenuItem key={shift} value={shift}>
                      {shift}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Dropdown for selecting time based on the selected shift */}
              <FormControl fullWidth>
                <Select
                  value={selectedTime}
                  onChange={handleTimeChange}
                  fullWidth
                >
                  {shiftTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Input for entering event/task */}
              <TextField
                label="Event/Task"
                type="text"
                value={scheduleItem}
                onChange={handleScheduleItemChange}
                fullWidth
              />
              {/* Input for entering room */}
              <TextField
                label="Room"
                type="text"
                value={room}
                onChange={handleRoomChange}
                fullWidth
              />
              {/* Dialog actions for cancel and submit */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

// Exporting the component for use in other parts of the application
export default AddScheduleForm;
