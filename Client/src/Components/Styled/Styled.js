import { Box, Drawer, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


export const BannerImage = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: 8,
});
export const CompnyLogo = styled('img')(({ theme }) => ({
    padding: 1, position: 'absolute',
    top: 185,
    left: 15,
    zIndex: 8,
    background: '#fff',
    border: '2px solid #fff',
    borderRadius: theme.shape.borderRadius[4],
    overflow: 'hidden',
    width: 80,
    height: 80,
    objectFit: 'cover', boxShadow: theme.shadows[1]
}));

export const CardContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius[2],
    boxShadow: theme.shadows[1],
    width: '100%'
}));


export const SideModal = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        borderRadius: (theme) => `${theme.shape.borderRadius[0]}px`,
        padding: '20px',
        bottom: 0,
        width: '40%',
        top: 'unset',
        bottom: '0',
        height: 'calc(100% - 64px)',
        [theme.breakpoints.up('xs')]: {
            minWidth: '80%'
        },
        [theme.breakpoints.up('md')]: {
            minWidth: '50%'
        },
        [theme.breakpoints.up('xl')]: {
            minWidth: '40%'
        },
    },
}))
