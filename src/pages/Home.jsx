import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import PatientCard from "../components/patient/PatientCard";
import AddPatientForm from "../components/patient/AddPatientForm";
import { CircularProgress } from "@mui/material";
import TimeBlockArea from "../components/schedule/TimeBlockArea";
import AddScheduleForm from "../components/schedule/AddScheduleForm";
import AddObservationForm from "../components/observation/AddObservationForm";
import '../home.css';


function Home() {
  // Access the current location and navigate function from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Extract user name from location state or set it to "Guest"
  const userName = location.state && location.state.id ? location.state.id : "Guest";

  // States for patients, loading status, editing patient ID, schedule items, and observations
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [observations, setObservations] = useState([]);

  // Fetch patients data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/patients');
        const data = await response.json();
        setPatients(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch schedule data on component mount
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const scheduleResponse = await fetch('http://localhost:3000/api/schedules');
        const scheduleData = await scheduleResponse.json();
        setScheduleItems(scheduleData);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchScheduleData();
  }, []);

  // Handle adding a new patient
  const handleAddPatient = async (newPatientData) => {
    try {
      const response = await fetch('http://localhost:3000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addedPatient = await response.json();
      setPatients([...patients, addedPatient]);
    } catch (error) {
      console.error('Error adding new patient:', error);
    }
  };

  // Handle deleting a patient
  const handleDeletePatient = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/patients/${patientId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setPatients(patients.filter((patient) => patient._id !== patientId));
      console.log(`Patient with ID ${patientId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Handle updating patient information
  const handleUpdatePatient = async (patientId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedPatient = await response.json();
      setPatients(patients.map((p) => (p._id === patientId ? updatedPatient : p)));
      setEditingPatientId(null);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  // Handle initiating patient editing
  const handleEditPatient = (patientId) => {
    setEditingPatientId(patientId);
  };

  // Handle canceling patient editing
  const handleCancelEdit = () => {
    setEditingPatientId(null);
  };

  // Handle adding a new schedule item
  const handleAddScheduleItem = async (newScheduleItem) => {
    try {
      const response = await fetch('http://localhost:3000/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScheduleItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addedScheduleItem = await response.json();
      setScheduleItems([...scheduleItems, addedScheduleItem]);
    } catch (error) {
      console.error('Error adding schedule item:', error);
    }
  };

  // Handle updating task completion status
  const handleTaskCompletion = async (scheduleItemId, completed) => {
    try {
      const response = await fetch(`http://localhost:3000/api/schedules/${scheduleItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedScheduleItems = scheduleItems.map((item) =>
        item._id === scheduleItemId ? { ...item, completed } : item
      );
      setScheduleItems(updatedScheduleItems);
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  // Handle deleting a schedule item
  const handleDeleteScheduleItem = async (scheduleItemId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/schedules/${scheduleItemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedScheduleItems = scheduleItems.filter((item) => item._id !== scheduleItemId);
      setScheduleItems(updatedScheduleItems);

      console.log(`Schedule item with ID ${scheduleItemId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting schedule item:', error);
    }
  };

  // Handle adding a new observation
  const handleAddObservation = async (newObservation) => {
    try {
      const response = await fetch('http://localhost:3000/api/observations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObservation),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const addedObservation = await response.json();
      // Update the state with the new observation
      setObservations([...observations, addedObservation]);
      console.log('Observation added successfully:', addedObservation);
    } catch (error) {
      console.error('Error adding observation:', error);
    }
  };

  // Define times for the schedule
  const times = ['7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm'];

  return (
    <>
      {/* Navbar and welcome message */}
      <div className="navbar">
        <Navbar />
        <p>Welcome {userName}</p>
      </div>
      
      {/* Section for adding new patients, observations, and schedule items */}
      <div className="add-action-section">
        <AddPatientForm onSubmit={handleAddPatient} />
        <AddObservationForm onSubmit={handleAddObservation} />
        <AddScheduleForm onSubmit={handleAddScheduleItem} />
      </div>

      {/* Display list of patients */}
<h1>Patients</h1>



        <div className='patient-cards'>
          {loading ? (
            <CircularProgress
              color="primary"
              fourColor
              variant="indeterminate"
            />
          ) : (
            patients.map((patient) => (
              <div key={patient._id} className='patient-card'>
                <PatientCard
                  patient={patient}
                  onDeletePatient={handleDeletePatient}
                  onUpdatePatient={handleUpdatePatient}
                  onEditPatient={handleEditPatient}
                  onCancelEdit={handleCancelEdit}
                  isEditing={editingPatientId === patient._id}
                  observations={observations.filter(obs => obs.patientId === patient._id)}
                />
              </div>
            ))
          )}
        </div>


      {/* Display schedule area */}
      <div className="schedule-area">
        <h1>Schedule</h1>
        <TimeBlockArea
          times={times}
          scheduleItems={scheduleItems}
          onTaskCompletion={handleTaskCompletion}
          onDeleteScheduleItem={handleDeleteScheduleItem}
        />
      </div>
    </>
  );
}

export default Home;
