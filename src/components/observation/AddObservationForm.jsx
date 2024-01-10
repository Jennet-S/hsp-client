// Importing Material-UI components and React features
import React, { useState, useEffect } from 'react';
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

// React component for adding observation details
function AddObservationForm({ onSubmit, patientId }) {
  // State to manage form data and the list of patients
  const [formData, setFormData] = useState({
    patientId: 'patientId',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
  });

  const [patients, setPatients] = useState([]);
  const [open, setOpen] = React.useState(false);

  // Fetching patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);

  // Handling the opening of the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

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

  // Handling changes in the selected patient
  const handlePatientChange = (selectedPatientId) => {
    setFormData({
      ...formData,
      patientId: selectedPatientId,
    });
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Resetting form data and closing the dialog after submission
    setFormData({
      patientId: 'patientId',
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: '',
    });
    setOpen(false);
  };

  // Rendering the component
  return (
    <React.Fragment>
      {/* Button to open the dialog */}
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Add Observation
      </Button>

      {/* Dialog for entering observation details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Observation Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Form for entering observation details */}
            <form onSubmit={handleSubmit}>
              {/* Dropdown for selecting a patient */}
              <FormControl fullWidth>
                <InputLabel id="patientIdLabel">Patient ID</InputLabel>
                <Select
                  labelId="patientIdLabel"
                  id="patientId"
                  name="patientId"
                  value={formData.patientId}
                  onChange={(e) => handlePatientChange(e.target.value)}
                >
                  {/* Mapping over the list of patients to create dropdown options */}
                  {patients.map((patient) => (
                    <MenuItem key={patient._id} value={patient._id}>
                      {`${patient.lastName} ${patient.firstName} (${patient.nhi})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Text fields for entering observation details */}
              {/* Each field is associated with a specific property in the form data state */}
              <TextField
                label="Temperature"
                type="text"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Blood Pressure"
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Heart Rate"
                type="text"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Respiratory Rate"
                type="text"
                name="respiratoryRate"
                value={formData.respiratoryRate}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Oxygen Saturations"
                type="text"
                name="oxygenSaturation"
                value={formData.oxygenSaturation}
                onChange={handleChange}
                fullWidth
              />


              {/* Dialog actions (Cancel and Add buttons) */}
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
export default AddObservationForm;
