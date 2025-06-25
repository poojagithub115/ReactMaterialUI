import { Box, Button, Chip, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useGetUserByIdQuery } from 'api/userApi'
import { CompnyLogo, SideModal } from '../Styled/Styled';
import { LanguageRounded, Share, TurnedInNot } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';

function JobDetailDialog({ open, toggleDrawer, id }) {
    const theme = useTheme();
    const { data: user, error, isLoading } = useGetUserByIdQuery(id);
    let dollarSign = user?.salary?.currency == 'USD' ? <AttachMoneyRoundedIcon sx={{ fontSize: (theme) => theme.palette.common.iconSizes.small, mr: .5 }} /> : <CurrencyRupeeRoundedIcon sx={{ fontSize: (theme) => theme.palette.common.iconSizes.small, mr: .5 }} />

    return (
        <SideModal
            anchor="right"
            open={open}
            onClose={toggleDrawer}>
            <Box role="presentation" sx={{ position: 'relative' }}>
                <img
                    src={user?.company.images.banner}
                    style={{
                        width: '100%',
                        height: '230px',
                        objectFit: 'cover',
                        borderRadius: 8
                    }}
                    loading="lazy"
                />
                <Box sx={{ padding: '20' }}>
                    {isLoading ? (
                        <Typography>Loading...</Typography>
                    ) : error ? (
                        <Typography color="error">Error loading job</Typography>
                    ) : (
                        <>
                            <CompnyLogo src={user?.company.logo} />
                            <Box sx={{ paddingTop: 6 }}>
                                <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
                                    <Stack>
                                        <Typography variant="subtitle2" >
                                            {user?.company.name}
                                        </Typography>
                                        <Stack direction={'row'} gap={3} alignItems={'center'} >
                                            <Typography variant="h5" >
                                                {user?.title}
                                            </Typography>
                                            <Chip label={user?.locationType} color={(user?.locationType == 'Hybrid') ? 'success' : (user?.locationType == 'Remote') ? 'secondary' : 'warning'} size="small" icon={<FiberManualRecordIcon color='#ffffff' />} />
                                        </Stack>
                                        <Typography variant="caption" display="block">
                                            <FmdGoodOutlinedIcon sx={{ fontSize: (theme) => theme.palette.common.iconSizes.small, mr: .5 }} />
                                            {user?.company?.location}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            {dollarSign}
                                            {user?.salary?.min} - {user?.salary?.max} {user?.salary?.type == 'Annual' ? 'Per Annual' : 'Per Month'}
                                        </Typography>

                                        {/* -------------------------------- */}
                                        <Typography variant="caption" display="block">
                                            <BusinessCenterRoundedIcon sx={{ fontSize: (theme) => theme.palette.common.iconSizes.small, mr: .5 }} />
                                            {user?.experienceLevel}
                                        </Typography>

                                        {/* -------------------------------- */}
                                        <Typography variant="smallerText" display="block" sx={{ mt: 2 }}>
                                            Employee Type :
                                            <Typography variant="p" display="block" > {user?.employmentType}</Typography>
                                        </Typography>

                                        {/* -------------------------------- */}
                                        <Stack direction='column' spacing={1} sx={{ my: 1 }}>
                                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                                Must have skils :
                                                <Typography variant="p" display="block" > {user.tags.map(t => t += ',')}</Typography>
                                            </Typography>

                                        </Stack>

                                    </Stack>
                                    {/* -------------------------------- */}
                                    <Stack direction={'row'} alignItems={'center'} gap={.5}>
                                        <IconButton><Share /></IconButton>
                                        <IconButton><TurnedInNot /></IconButton>
                                        <IconButton href={user?.company?.website}
                                            target="_blank" // open in new tab
                                            rel="noopener noreferrer"><LanguageRounded /></IconButton>
                                    </Stack>
                                </Stack>
                                {/* -------------------------------- */}
                                <Stack direction='row' spacing={0.5} sx={{ mt: 1, alignItems: 'center' }}>
                                    <Typography variant='smallerText'>Posted on {new Date(user.postedDate).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</Typography>
                                </Stack>
                                <Divider orientation="horizontal" flexItem sx={{
                                    borderStyle: 'dotted',
                                    borderWidth: '1px', margin: '25px 0',
                                    borderColor: 'rgba(0, 0, 0, 0.12)', // optional: match MUI's default color
                                }} />
                                {/* -------------------------------- */}
                                <Stack>
                                    <Typography variant="h6" display="block" sx={{ mb: 0.5 }}>
                                        Job description
                                    </Typography>
                                    <Typography variant="subtitle1" display="block">
                                        {user?.description}
                                    </Typography>
                                    {/* -------------------------------- */}
                                    <Typography variant="h7" display="block" sx={{ mt: 2 }}>
                                        Requirements
                                    </Typography>
                                    <List>
                                        {
                                            user?.requirements.map(r => (
                                                <ListItem disablePadding>
                                                    <ListItemIcon sx={{ minWidth: 24, }}>
                                                        <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={r} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                    {/* -------------------------------- */}
                                    <Typography variant="h7" display="block" sx={{ mt: 1 }}>Responsibilities</Typography>
                                    <List>{
                                        user?.responsibilities.map(r => (
                                            <ListItem disablePadding>
                                                <ListItemIcon sx={{ minWidth: 24, }}>
                                                    <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                                                </ListItemIcon>
                                                <ListItemText primary={r} />
                                            </ListItem>
                                        ))
                                    }
                                    </List>
                                </Stack>
                            </Box>
                            <Button sx={{ marginTop: 2 }} variant='contained'>Apply now</Button>
                        </>
                    )}
                </Box>
            </Box>
        </SideModal>
    )
}

export default JobDetailDialog
