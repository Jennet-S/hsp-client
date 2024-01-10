// Importing React
import React from 'react';

// Functional component for displaying a time block with schedule items
function TimeBlock({ time, scheduleItems, onTaskCompletion, onDeleteScheduleItem }) {
  return (
    <div className='time-block'>
      {/* Displaying the time */}
      <h2>{time}</h2>
      <ul>
        {/* Mapping through schedule items to display each */}
        {scheduleItems.map((item, index) => (
          <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {/* Checkbox for task completion */}
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onTaskCompletion(item._id, !item.completed)}
            />
            {/* Displaying schedule item details */}
            {`${item.time}: ${item.scheduleItem} | Rm: ${item.room}`}
            {/* Button to delete the schedule item */}
            <button onClick={() => onDeleteScheduleItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exporting the TimeBlock component for use in other parts of the application
export default TimeBlock;
