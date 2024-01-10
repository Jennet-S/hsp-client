// Importing React, Material-UI components, icons, and other components
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditPatientForm from './EditPatientForm';
import ObservationCard from '../observation/ObservationCard';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from "@mui/material";

// Styled component for IconButton to handle rotation on click
const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  transform: `rotate(${expand ? 180 : 0}deg)`,
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// React component for displaying patient details and observations
function PatientCard({
  patient,
  onDeletePatient,
  onUpdatePatient,
  onEditPatient,
  onCancelEdit,
  isEditing,
  observations,
}) {
  // State to manage fetched observations and loading state
  const [fetchedObservations, setFetchedObservations] = useState(observations);
  const [loading, setLoading] = useState(true);

  // Fetching observations for the patient when the component mounts or patient changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/patients/${patient._id}/observations`);
        const data = await response.json();
  
        // Logging fetched data for debugging
        console.log('Data fetched:', response);
        setFetchedObservations(data);
        console.log('Data parsed:', data);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching observation data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [patient._id]); // Include patient._id as a dependency

  // Handling the deletion of the patient
  const handleDelete = () => {
    onDeletePatient(patient._id);
  };

  // Handling the initiation of patient edit mode
  const handleEdit = () => {
    onEditPatient(patient._id);
  };

  // Handling the cancellation of patient edit mode
  const handleCancel = () => {
    onCancelEdit();
    // Toggle the isEditing state to false when cancel is clicked
    onEditPatient(null); // Pass a null or some identifier to indicate that editing is canceled
  };

  // Handling the deletion of an observation
  const handleDeleteObservation = async (observationId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/observations/${observationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFetchedObservations(fetchedObservations.filter((obs) => obs._id !== observationId));
        console.log('Observation deleted successfully');
      } else {
        console.error('Failed to delete observation');
      }
    } catch (error) {
      console.error('Error deleting observation:', error);
    }
  };

  // Handling the submission of an observation form
  const submitObservationForm = async (observationData) => {
    try {
      const response = await fetch('http://localhost:3000/api/observations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(observationData),
      });

      if (response.ok) {
        const newObservation = await response.json();
        console.log('Observation data stored successfully:', newObservation);

        setFetchedObservations([...fetchedObservations, newObservation]);

        console.log('Updated fetchedObservations:', fetchedObservations);
      } else {
        console.error('Failed to store observation data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting observation form:', error);
    }
  };

  // State to manage the expanded/collapsed state of the card
  const [expanded, setExpanded] = React.useState(false);

  // Handling the expansion/collapse of the card
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Rendering the component
  return (
    <Card sx={{ maxWidth: 400 }}>
      {/* Card header with patient avatar and edit/delete actions */}
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{patient.room}</Avatar>}
        action={
          <React.Fragment>
            <IconButton aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        }
      />
      <CardContent>
        {/* Render either the EditPatientForm or patient details based on isEditing state */}
        {isEditing ? (
          <div>
            <EditPatientForm patient={patient} onUpdatePatient={onUpdatePatient} />
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            {/* Displaying patient details when not in edit mode */}
            <h2>{patient.lastName}, {patient.firstName} {patient.age} yr</h2>
            <p>Dx: {patient.diagnosis}</p>
            <p>MHx: {patient.history}</p>
            <p>Resus: {patient.resus}</p>
          </div>
        )}
      </CardContent>
      {/* Card actions for expanding/collapsing the observation section */}
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* Collapsible section for displaying patient observations */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Display loading message or observations based on the loading state */}
          {loading ? (
            <CircularProgress
              color="primary"
              fourColor
              variant="indeterminate"
            />
          ) : (
            fetchedObservations
              .filter((observation) => observation.patientId === patient._id)
              .map((observation) => (
                <ObservationCard
                  key={observation._id}
                  observation={observation}
                  onDeleteObservation={handleDeleteObservation}
                />
              ))
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

// Exporting the component for use in other parts of the application
export default PatientCard;
