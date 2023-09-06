import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getAds, getAdsByPage } from '@/requests/adsRequest.jsx';
import { Button, Pagination } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalForm from '@/Components/ModalForm.jsx';
import AdTable from '@/Components/AdTable.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '@/Components/Loader.jsx';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const defaultTheme = createTheme();

export default function Dashboard() {
    const navigate = useNavigate();

    const [ad, setAd] = useState([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [allAds, setAllAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshPage = () => {
        navigate(0);
    }

    const handleOpen = (id) => {
        setOpen(true);

        id && getAds(id).then((response) => {
            setAd(response.data.data)
        })
        .catch((error) => {
            toast.error(error.message);
        })
    };

    const handleClose = () => {
        setOpen(false);
        setAd([]);
    };

    useEffect(() => {
        setLoading(true);

        getAdsByPage(page).then((response) => {
            setLoading(false);
            setAllAds(response);
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
        })
    }, [page]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Loader loading={loading}/>
            <ToastContainer />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <Button
                            variant="elevated"
                            color="tertiary"
                            onClick={() => handleOpen(null)}
                        >
                            Create new Ad
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {
                        allAds.data?.data?.length > 0
                            ? <AdTable
                                ads={allAds}
                                refreshPage={refreshPage}
                                handleOpen={(id) => handleOpen(id)}
                            />
                            : <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                marginY={10}
                                align={'center'}
                                sx={{ flexGrow: 1 }}
                            >
                                You have no ads yet
                            </Typography>
                    }
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        marginBottom={2}
                    >
                        <Pagination
                            count={allAds.data?.meta?.last_page}
                            page={page}
                            onChange={(_, page) => setPage(page)}
                            shape="rounded"
                        />
                    </Box>
                </Box>
            </Box>
            <ModalForm
                ad={ad}
                handleClose={() => handleClose()}
                open={open}
                refreshPage={refreshPage}
            />
        </ThemeProvider>
    );
}
