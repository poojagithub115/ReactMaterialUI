import { Snackbar } from '@mui/material'
import React from 'react'
import MuiAlert from '@mui/material/Alert';

export default function Toast({ autoHideDuration, open, severity, onClose, tMessage }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <MuiAlert
                elevation={1}
                variant="filled"
                severity={severity}
                onClose={onClose}
                sx={{ width: '100%', }}
            >
                {tMessage}
            </MuiAlert>
        </Snackbar>
    )
}
