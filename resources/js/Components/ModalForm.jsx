import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { Button, Modal, TextField } from '@mui/material';
import * as React from 'react';
import { createAd, updateAd } from '@/requests/adsRequest.jsx';
import { useEffect, useState } from 'react';
import { Loader } from '@/Components/Loader.jsx';
import { ToastContainer, toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column'
};

export default function ModalForm(props) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            url: '',
        }
    })

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setValue('id', props.ad.id);
        setValue('title', props.ad.title);
        setValue('description', props.ad.description);
        setValue('url', props.ad.url);
    }, [props.ad]);

    useEffect(() => {
        setLoading(false);
    }, [props.ad]);

    const onSubmit = (data) => {
        setLoading(true);

        data.id
            ? updateAd(data).then(() => {
                setLoading(false);

                return props.refreshPage();
            })
            .catch((error) => {
                setLoading(false);

                toast.error(error.message);
            })
            : createAd(data).then(() => {
                setLoading(false);

                return props.refreshPage();
            })
            .catch((error) => {
                setLoading(false);

                toast.error(error.message);
            })
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer />
                <Loader loading={loading}/>
                <Box sx={style}>
                    <Typography
                        variant={'h4'}
                        align={'center'}
                    >
                        {
                            props.ad instanceof Array
                                ? 'Create Ad'
                                : 'Edit Ad'
                        }
                    </Typography>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                InputLabelProps={{shrink: !!field.value}}
                                label="Title"
                                placeholder="Please input title ad"
                                variant="outlined"
                                multiline
                                margin={'dense'}
                                maxRows={3}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        }
                        rules={{
                            required: 'This field is required',
                            validate: (value) => {
                                const trimValue = value.trim();

                                if (trimValue.length < 5 || trimValue.length > 50) {
                                    return `The minimum number of characters
                                             is 5, the maximum is 50`;
                                }

                                return true;
                            },
                        }}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                InputLabelProps={{shrink: !!field.value}}
                                label="Description"
                                placeholder="Please input description ad"
                                multiline
                                rows={6}
                                margin={'dense'}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        }
                        rules={{
                            required: 'This field is required',
                            validate: (value) => {
                                const trimValue = value.trim();

                                if (trimValue.length < 50 || trimValue.length > 255) {
                                    return `The minimum number of characters
                                             is 50, the maximum is 255`;
                                }

                                return true;
                            },
                        }}
                    />
                    <Controller
                        name="url"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                InputLabelProps={{shrink: !!field.value}}
                                label="Url"
                                placeholder="Please input url ad"
                                variant="outlined"
                                multiline
                                margin={'dense'}
                                inputMode={'url'}
                                error={!!errors.url}
                                helperText={errors.url?.message}
                            />
                        }
                        rules={{
                            required: 'This field is required',
                            pattern: {
                                value: /^(http|https):\/\/[^ "]+$/,
                                message: 'Invalid url',
                            },
                        }}
                    />
                    <Box>
                        <Button
                            variant={'outlined'}
                            sx={{
                                marginTop: 2,
                                marginRight: 2
                            }}
                            type={'submit'}
                        >
                            {props.ad instanceof Object ? 'Update' : 'Create'}
                        </Button>
                        <Button
                            variant={'outlined'}
                            color={'error'}
                            sx={{
                                marginTop: 2,
                            }}
                            onClick={props.handleClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    )
}
