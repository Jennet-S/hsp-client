// Importing React library
import React from 'react';

// Functional component representing an ObservationCard
const ObservationCard = ({ observation, onDeleteObservation }) => {
  // Handling the click event for deleting an observation
  const handleDeleteClick = () => {
    onDeleteObservation(observation._id);
  };

  // Logging observation data to the console
  console.log('Observation data in ObservationCard:', observation);

  // Rendering the ObservationCard component
  return (
    <div className='observation-card'>
      {/* Displaying observation details */}
      <h3>Obs:</h3>
      <p>Temp: {observation.temperature}</p>
      <p>BP: {observation.bloodPressure}</p>
      <p>HR: {observation.heartRate}</p>
      <p>RR: {observation.respiratoryRate}</p>
      <p>Sats: {observation.oxygenSaturation}</p>

      {/* Button to delete the observation */}
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

// Exporting the ObservationCard component for use in other parts of the application
export default ObservationCard;
