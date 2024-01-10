// Importing React and useState hook
import React, { useState } from 'react';

// Importing TimeBlock component
import TimeBlock from './TimeBlock';

// Importing MUI components
import { Stack, Select, MenuItem, FormControl } from '@mui/material';

// Functional component for displaying a time block area with schedule items
function TimeBlockArea({ times, scheduleItems, onTaskCompletion, onDeleteScheduleItem }) {
  // State for tracking the selected shift
  const [selectedShift, setSelectedShift] = useState('Am');

  // Event handler for shift change
  const handleShiftChange = (e) => {
    setSelectedShift(e.target.value);
  };

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

  // Get times based on the selected shift
  const shiftTimes = getShiftTimes(selectedShift);

  return (
    <div>
      {/* Dropdown for selecting the shift */}
      <FormControl>
        <Select value={selectedShift} onChange={handleShiftChange} fullWidth>
          <MenuItem value="Am">AM</MenuItem>
          <MenuItem value="Pm">PM</MenuItem>
          <MenuItem value="Nocte">Nocte</MenuItem>
        </Select>
      </FormControl>

      {/* Displaying time blocks using MUI Stack */}
      <Stack direction="row">
        {/* Mapping through times to display each time block */}
        {times.map((time) => (
          <TimeBlock
            key={time}
            time={time}
            // Filtering schedule items based on time and shift
            scheduleItems={scheduleItems.filter((item) => item.time === time && shiftTimes.includes(time))}
            onTaskCompletion={onTaskCompletion}
            onDeleteScheduleItem={onDeleteScheduleItem}
          />
        ))}
      </Stack>
    </div>
  );
}

// Exporting the TimeBlockArea component for use in other parts of the application
export default TimeBlockArea;
