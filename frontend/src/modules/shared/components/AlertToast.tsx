import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarWithAlertProps {
    open: boolean;
    text: string | null;
    severity: "info" | "success" | "warning" | "error";
    vertical?: "top" | "bottom",
    horizontal?: "right" | "center" | "left",
    handleClose: () => void;
}

const AlertToast: React.FC<SnackbarWithAlertProps> = ({ open, text, severity, vertical='top', horizontal='right', handleClose }) => {
    return (
        <Snackbar 
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={3000} 
            onClose={handleClose}>
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
