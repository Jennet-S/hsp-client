// Importing React and MUI components
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Functional component for displaying a button in a stack
function AddButton(prop) {
  return (
    <Stack spacing={2} direction="row">
      {/* Button with variant 'contained' */}
      <Button variant="contained">{prop}</Button>
    </Stack>
  );
}

// Exporting the AddButton component for use in other parts of the application
export default AddButton;
