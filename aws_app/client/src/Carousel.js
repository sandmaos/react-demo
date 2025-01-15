import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import p0 from './static/p0.jpg';
import p1 from './static/p1.jpg';
import p2 from './static/p2.jpg';
import p3 from './static/p3.jpg';
import p4 from './static/p4.jpg';
import p5 from './static/p5.jpg';
import p6 from './static/p6.jpg';
import p7 from './static/p7.jpg';
import p8 from './static/p8.jpg';


export default function Carousel({ id }) {

    const handleImage = () => {
        switch (id) {
            case 0:
                return p0;
            case 1:
                return p1;
            case 2:
                return p2;
            case 3:
                return p3;
            case 4:
                return p4;
            case 5:
                return p5;
            case 6:
                return p6;
            case 7:
                return p7;
            case 8:
                return p8;
            default:
                return p0;
        }
    }

    return (
        <>
            <Grid container alignItems="center" >
                <Grid item xs={12} sx={{ marginBottom: '5px' }}>
                    <Card sx={{ boxShadow: 3, maxWidth: '100%' }}>
                        <CardMedia
                            sx={{ minHeight: 400 }}
                            image={handleImage()}
                            title={id}
                        />

                    </Card>
                </Grid>

            </Grid>
        </>
    );
}