// Importing React and necessary Material-UI components
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// React component for editing patient details
function EditPatientForm({ patient, onUpdatePatient }) {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName,
    room: patient.room,
    nhi: patient.nhi,
    age: patient.age,
    diagnosis: patient.diagnosis,
    history: patient.history,
    resus: patient.resus,
  });

  // State to manage the visibility of the dialog
  const [open, setOpen] = useState(true);

  // Handling the closing of the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handling changes in form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePatient(patient._id, formData);
    // setOpen(false);
  };

  // Rendering the component
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Patient Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* Form for editing patient details */}
          <form onSubmit={handleSubmit}>
            {/* Text fields for various patient details */}
            <TextField
              label="First name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Room"
              type="text"
              name="room"
              value={formData.room}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="NHI"
              type="text"
              name="nhi"
              value={formData.nhi}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Age"
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Diagnosis"
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="History"
              type="text"
              name="history"
              value={formData.history}
              onChange={handleChange}
              fullWidth
            />

            {/* Dropdown for selecting resuscitation status */}
            <FormControl fullWidth>
              <InputLabel>Resus</InputLabel>
              <Select
                name="resus"
                value={formData.resus}
                onChange={handleChange}
                fullWidth
              >
                {/* Options for resuscitation status */}
                <MenuItem value="Not set">Select status</MenuItem>
                <MenuItem value="Goal A">Goal A</MenuItem>
                <MenuItem value="Goal B">Goal B</MenuItem>
                <MenuItem value="Goal C">Goal C</MenuItem>
              </Select>
            </FormControl>

            {/* Dialog actions (Cancel and Save Changes buttons) */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogActions>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

// Exporting the component for use in other parts of the application
export default EditPatientForm;
