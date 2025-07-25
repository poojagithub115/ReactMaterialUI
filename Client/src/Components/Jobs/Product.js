import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Card, Avatar, Typography, Stack, Chip, Skeleton, Link as MUILink, IconButton, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
// import { DataGridPro } from '@mui/x-data-grid-pro';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Edit, Title } from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link as RLink } from 'react-router-dom'
import JobDetailDialog from './JobDetailDialog';
import { useGetUsersQuery, usePostUserMutation, useDeleteUserMutation } from 'api/userApi';
import { CardContainer } from '../Styled/Styled';
import EditJob from './EditJob';
import Toast from './Toast';
import ConfirmDialog from './ConfirmDialog';



const defaultTheme = createTheme();
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    // paper: {
    //     padding: theme.spacing(15),
    //     textAlign: 'center',
    //     color: theme.palette.text.primary,
    // },
    title: {
        color: theme.palette.text.secondary,
        fontWeight: 'bold',
        padding: '20px 0'
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
    const [openAlert, setOpenAlert] = useState(false);
    const [Title, setTitle] = useState(false);
    const [JobMode, setJobMode] = useState('add')
    const [opneEditt, setOpneEditt] = useState(false);

    const { data: records, error, isLoading, refetch } = useGetUsersQuery();
    const [deleteUser, { isLoadingDel, isSuccess, isError }] = useDeleteUserMutation();
    const [toast, setToast] = useState({
        open: false,
        severity: 'info',
        message: '',
    });
    const toggleDrawer = (state, id = null) => () => {
        setOpen(state);
        SetSelectedId(id)
    };
    const opnEditFun = (state, id = null, JobMode) => () => {
        setOpneEditt(state);
        setJobMode(JobMode)
        SetSelectedId(id)
    };
    const deleteItem = async (id, title) => {

        SetSelectedId(id)
        setTitle(title)
        setOpenAlert(true)

    };
    const confirmDeleteItem = async () => {
        try {
            await deleteUser(SelectedID).unwrap();
            setUsers(prev => prev.filter(job => job.id !== SelectedID));
            setToast({
                open: true,
                severity: 'success',
                message: 'Job Deleted Successfully !',
            })
            setOpenAlert(false)
        }
        catch (err) {
            console.error('Failed to delete the job:', err);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setUsers(records)
        }, 2000);
        refetch();

    }, [records, users]);

    return (
        <Container sx={{ mt: 15 }}>
            {toast.open && <Toast autoHideDuration={3000} open={toast.open} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} tMessage={toast.message} />}
            {openAlert && <ConfirmDialog open={openAlert} onclose={() => setOpenAlert(false)} deleteIt={confirmDeleteItem} title={Title} noDelete={() => {
                setOpenAlert(false);
                SetSelectedId(null);
            }} />}
            <Box sx={{ flexGrow: 1, }}>
                <Stack direction={'row'} alignItems={'center'}>
                    <div className={styles.root}>
                        <h1 className={styles.title}>Jobs</h1>
                    </div>
                    <Button variant='contained' onClick={opnEditFun(true, '', 'add')}>Add Job</Button>
                </Stack>
                <Grid container spacing={3} >
                    {isLoading ? Array.from(new Array(records?.length || 6)).map((_, index) => (
                        <Grid items='true' size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={index}>
                            <Card sx={{ mt: 4, p: 3, }}>
                                <Skeleton animation="wave" variant="rounded" width={40} height={40} sx={{ mb: 2 }}><Avatar /></Skeleton>
                                <Skeleton animation="wave" variant="rounded" width={320} height={15} />
                                <Skeleton animation="wave" variant="rounded" width={120} height={10} sx={{ my: 1 }} />
                                <Stack direction='row' spacing={1} sx={{ my: 1 }}>
                                    <Skeleton animation="wave" variant="rounded" width={50} height={20} />
                                    <Skeleton animation="wave" variant="rounded" width={50} height={20} />
                                </Stack>
                                <Skeleton animation="wave" variant="rounded" width={320} height={15} sx={{ mb: 1 }} />
                                <Skeleton animation="wave" variant="rounded" width={320} height={15} sx={{ mb: 1 }} />
                                <Stack direction='row' justifyContent={'end'} spacing={1} sx={{ mt: 3 }}>
                                    <Skeleton animation="wave" variant="rounded" width={100} height={10} />
                                </Stack>
                            </Card></Grid>))
                        :
                        Array.isArray(records) && records.map(u => (
                            <Grid items='true' size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={u.id}>
                                {/* <Item> */}
                                <CardContainer sx={{ width: '100%', p: 3, '&:hover .icon': { opacity: 1 } }}>
                                    <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
                                        {/* to={`ProductsDetails/:${u.id}`}  */}
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                                            <Avatar variant="rounded" sx={{ width: 40, height: 40, mb: 2 }} src={u.company.logo}></Avatar>
                                            <div>
                                                <IconButton onClick={opnEditFun(true, u.id, 'edit')} className='edit-icon icon' sx={{
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                }}>
                                                    <Edit sx={{ fontSize: '16px' }} />
                                                </IconButton>
                                                <IconButton onClick={() => deleteItem(u.id, u.title)} className='delete-icon icon' sx={{
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease-in-out',
                                                }}><DeleteRoundedIcon sx={{ fontSize: '16px' }} />
                                                </IconButton>
                                            </div>
                                        </Stack>
                                        <MUILink component={RLink} underline="hover" onClick={toggleDrawer(true, u.id)} variant="h6" >{u.title}</MUILink>
                                        <Typography variant="subtitle1" color="text.primary">{u.company.name}</Typography>
                                        <Stack direction='row' sx={{ my: 2 }} flexWrap={'wrap'} gap={'6px'}>
                                            {u.tags.slice(0, 3).map((t) => <Chip key={t} size='small' variant='outlined' label={t} />)}
                                            {u.tags.length > 3 && <Chip label={'2+'} size='small' variant='outlined' />}
                                        </Stack>
                                        <Stack direction='row' gap={'6px'} sx={{ alignItems: 'center' }}>
                                            <FmdGoodOutlinedIcon sx={{ fontSize: (theme) => theme.palette.common.iconSizes.small }} />
                                            <Typography variant='subtitle1' noWrap sx={{ maxWidth: '100%' }} >{u.company.location}</Typography>
                                        </Stack>
                                        {/* <Button variant="outlined" sx={{ mt: 2 }}>Apply</Button> */}
                                        <Stack direction='row' justifyContent={'flex-end'} spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
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
                    {SelectedID && <JobDetailDialog open={open} onRefetch={refetch} toggleDrawer={toggleDrawer(false)} id={SelectedID} />}
                    <EditJob onRefetch={refetch} mode={JobMode} opnEditFun={opnEditFun(false)} id={SelectedID} opneEditt={opneEditt} />
                </Grid>
            </Box>
        </Container >
    );
}
