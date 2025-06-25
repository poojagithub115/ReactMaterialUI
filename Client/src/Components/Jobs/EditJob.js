import { Box, DialogTitle, Divider, Drawer, TextField, useTheme } from '@mui/material'
import { SideModal } from 'Components/Styled/Styled';
import React from 'react'

function EditJob({ opneEditt, opnEditFun, id }) {
    const theme = useTheme();
    return (
        <SideModal

            anchor="right"
            open={opneEditt}
            onClose={opnEditFun}>
            <Box>
                <DialogTitle sx={{ padding: '0 !important' }}>{"Use Google's location service?"}</DialogTitle>
                <Divider orientation="horizontal" flexItem sx={{
                    borderStyle: 'dotted',
                    borderWidth: '1px', margin: '15px 0',
                    borderColor: 'rgba(0, 0, 0, 0.12)', // optional: match MUI's default color
                }} />

                <Box sx={{ mt: 2 }}>
                    <label htmlFor="custom-input" style={{ marginBottom: 5, display: 'block', fontWeight: 500 }}>
                        Your Label
                    </label>
                    <TextField
                        // label="Your Label"
                        id="custom-input"
                        margin="normal"
                        hiddenLabel
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            margin: 0,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8, // change this value as needed
                            },
                        }}
                    />
                </Box>
            </Box>
        </SideModal>
    )
}

export default EditJob
