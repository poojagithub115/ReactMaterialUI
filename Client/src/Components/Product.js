import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Container, Card, Avatar, Typography, Button, Stack, Chip, Skeleton, Link as MUILink, Drawer, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
// import { DataGridPro } from '@mui/x-data-grid-pro';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Edit, StarRateRounded } from '@mui/icons-material';
import { positions } from 'slate';
import { Link as RLink } from 'react-router-dom'
import JobDetailDialog from './JobDetailDialog';

import { useGetUsersQuery } from 'api/userApi';
import { CardContainer } from './Styled/Styled';



const defaultTheme = createTheme();
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(15),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    title: {
        color: theme.palette.text.secondary,
        fontWeight: 'bold',
    },
}), { defaultTheme });

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


export default function Product() {

    const styles = useStyles();
    const [users, setUsers] = useState([]);
    const [SelectedID, SetSelectedId] = useState(null);
    const [open, setOpen] = useState(false);

    const { data: data, error, isLoading } = useGetUsersQuery();

    const toggleDrawer = (state, id = null) => () => {
        setOpen(state);
        SetSelectedId(id)
    };

    useEffect(() => {
        // setLoading(true);
        setTimeout(() => {
            setUsers(data)
        }, 1500);

    }, []);

    return (
        <Container>
            <Box sx={{ flexGrow: 1, mt: 5 }}>
                <div className={styles.root}>
                    <h1 className={styles.title}>Jobs</h1>
                </div>
                <Grid container spacing={2} >
                    {isLoading ? Array.from(new Array(9)).map((_, index) => (
                        <Grid xs={12} sm={6} md={4} size={4} key={index}>
                            <Card sx={{ mt: 4, p: 3, }}>
                                <Skeleton animation="wave" variant="rounded" width={40} height={40} sx={{ mb: 2 }}><Avatar /></Skeleton>
                                <Skeleton animation="wave" variant="rounded" width={320} height={15} />
                                <Skeleton animation="wave" variant="rounded" width={120} height={10} sx={{ my: 1 }} />
                                <Stack direction='row' spacing={1} sx={{ my: 1 }}>
                                    <Skeleton animation="wave" variant="rounded" width={50} height={20} />
                                    <Skeleton animation="wave" variant="rounded" width={50} height={20} />
                                </Stack>
                                <Skeleton animation="wave" variant="rounded" width={320} height={15} sx={{ mb: 1 }} />
                            </Card></Grid>))
                        :
                        data.map(u => (
                            <Grid xs={12} sm={6} md={4} size={4} key={u.id}>
                                {/* <Item> */}
                                <CardContainer sx={{ mt: 4, p: 3, '&:hover .edit-icon': { opacity: 1 } }}>
                                    <Box display="flex" flexDirection="column">
                                        {/* to={`ProductsDetails/:${u.id}`}  */}
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                                            <Avatar variant="rounded" sx={{ width: 40, height: 40, mb: 2 }} src={u.company.logo}></Avatar>
                                            <IconButton onClick={toggleDrawer(true, u.id)} component={RLink} className='edit-icon' sx={{
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease-in-out',
                                            }}><Edit sx={{ fontSize: '16px' }} /></IconButton></Stack>
                                        <MUILink component={RLink} underline="hover" onClick={toggleDrawer(true, u.id)} variant="h6" >{u.title}</MUILink>
                                        <Typography variant="subtitle1" color="text.primary">{u.company.name}</Typography>
                                        <Stack direction='row' spacing={1} sx={{ my: 1 }}>
                                            {u.tags.map(t => <Chip key={t} size='small' variant='outlined' label={t} />)}
                                        </Stack>
                                        <Stack direction='row' spacing={0.5} sx={{ alignItems: 'center' }}>
                                            <FmdGoodOutlinedIcon sx={{ fontSize: (theme) => theme.palette.common.iconSizes.small }} />
                                            <Typography variant='subtitle1' >{u.company.location}</Typography>
                                        </Stack>
                                        {/* <Button variant="outlined" sx={{ mt: 2 }}>Apply</Button> */}

                                        <Stack direction='row' justifyContent={'flex-end'} spacing={0.5} sx={{ mt: 1, alignItems: 'center' }}>
                                            {/* <CalendarTodayOutlinedIcon sx={{
                                                fontSize: (theme) => theme.palette.common.iconSizes.small
                                            }} /> */}
                                            <Typography variant='smallerText'>Posted on {new Date(u.postedDate).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}</Typography>
                                        </Stack>
                                    </Box>
                                </CardContainer>
                                {/* </Item>  */}
                            </Grid>))}
                    <JobDetailDialog open={open} toggleDrawer={toggleDrawer(false)} id={SelectedID} />
                </Grid>
            </Box>


        </Container >
    );
}
