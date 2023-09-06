import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {Box} from "@mui/material";
import PropTypes from "prop-types";

export const Loader = (props) => {
    return (
        props.loading &&
        <>
            <Box sx={{
                position: 'fixed',
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
                opacity: '0.5',
                zIndex: '7'
            }}>
                <ClipLoader
                    color={'#1976d2'}
                    loading={props.loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    cssOverride={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                    }}
                />
            </Box>
        </>
    );
}

Loader.propTypes = {
    loading: PropTypes.bool
}
