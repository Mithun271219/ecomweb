import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CustomSnackbar({ open, message, severity, onClose }) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert severity={severity} onClose={onClose} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbar;