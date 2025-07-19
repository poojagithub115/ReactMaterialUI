import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function ConfirmDialog({ open, onclose, noDelete, deleteIt, title }) {
    return (
        <Dialog 
            open={open}
            onClose={onclose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningAmberRoundedIcon sx={{ color: 'error.main' }} />
                <Typography variant="h6" >
                    {`Delete Job - ${title}`}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='text-dark' id="alert-dialog-description" >
                    Are you sure you want to delete this Job ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained'  onClick={deleteIt} autoFocus>Yes</Button>
                <Button onClick={noDelete} variant='outlined' >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}
