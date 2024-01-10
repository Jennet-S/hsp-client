// Importing React and the moment library for date formatting
import React from "react";
import moment from "moment";

// Functional component for displaying the current date in a specific format
function DateTime() {
  // Get the current date and format it using moment.js
  const formattedDate = moment().format("dddd Do");

  // Render the formatted date inside a paragraph element
  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
}

// Exporting the DateTime component for use in other parts of the application
export default DateTime;
