import { Snackbar } from '@mui/base';
import { Alert } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

const ErrorToast = ({ message }) => {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default ErrorToast