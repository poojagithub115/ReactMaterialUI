import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BannerImage = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: (theme) => `${theme.shape.borderRadius[1]}px`,
});
export const CompnyLogo = styled('img')(({ theme }) => ({
    padding: theme.spacing(2), position: 'absolute',
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
    border:'1px solid #ecebeb',
    width: '100%',
    '&:hover': {
        boxShadow: theme.shadows[1],
        transition:'0.3s all'
    }
}));


export const SideModal = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        borderRadius: (theme) => `${theme.shape.borderRadius[1]}px`,
        padding: theme.spacing(4),
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
