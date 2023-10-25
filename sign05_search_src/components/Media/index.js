import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MediaCard from '../MediaCard';


function FormRow() {
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <MediaCard />
            </Grid>
            <Grid item xs={4}>
                <MediaCard />
            </Grid>
            <Grid item xs={4}>
                <MediaCard />
            </Grid>
        </React.Fragment>
    );
}

 function NestedGrid() {
    return (
        <Box sx={{
            flexGrow: 1,
            maxWidth: '100%',
        }}>
            <Grid sx={{
                margin: '30px',
                maxWidth: '100%',
            }}
                container spacing={1}>
                <Grid container item spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={3}>
                    <FormRow />
                </Grid>
            </Grid>
        </Box>
    );
}

export const mediaArray = Array.from({ length: 22 }, (_, index) => ({
    id: index, 
    name: <MediaCard key={index}/>
  }));