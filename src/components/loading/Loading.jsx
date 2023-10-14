import './Loading.css';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Loading() {
    return (
        <div
            className='loading-overlay centralize'>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <CircularProgress  />
            </Box>
        </div>
    )
}

export default Loading;