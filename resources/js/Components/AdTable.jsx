import {
    Button,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Container from '@mui/material/Container';
import * as React from 'react';
import { deleteAd } from '@/requests/adsRequest.jsx';
import { useEffect, useState } from 'react';
import { Loader } from '@/Components/Loader.jsx';
import { toast, ToastContainer } from 'react-toastify';

export default function AdTable(props) {
    const [loading, setLoading] = useState(true);

    const handleDelete = (id) => {
        setLoading(true);

        deleteAd(id).then(() => {
            setLoading(false);

            return props.refreshPage();
        })
        .catch((error) => {
            setLoading(false);

            toast.error(error.message);
        })
    }

    useEffect(() => {
        setLoading(false);
    }, [props.ads]);

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        } else {
            return str;
        }
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <ToastContainer />
            <Loader loading={loading}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Url</TableCell>
                            <TableCell align="center">Manage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.ads.data.data.map((row, key) => (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell>
                                    {truncateString(row.description, 75)}
                                </TableCell>
                                <TableCell align="center">
                                    {truncateString(row.url, 20)}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        'display': 'flex',
                                        'justifyContent': 'center',
                                    }}
                                >
                                    <Button onClick={() => props.handleOpen(row.id)}>
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
