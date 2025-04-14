import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarWithAlertProps {
    open: boolean;
    text: string;
    severity: "info" | "success" | "warning" | "error";
    handleClose: () => void;
}

const AlertToast: React.FC<SnackbarWithAlertProps> = ({ open, text, severity, handleClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {text}
            </Alert>
        </Snackbar>
    );
};

export default AlertToast;
