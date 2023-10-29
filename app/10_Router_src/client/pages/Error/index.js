import React from 'react';
import {
  Card,
  Container,
  Paper,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import notFound from '../../static/404.jpg';


export default function Error() {
  const navigate = useNavigate();
  const { currPage } = useSelector(state => state.cardReducer);
  return (
    <>
      <Container sx={{
        padding: '10px',
      }}>

        <Paper sx={{
          margin: '10px',
          boxShadow: 3,
          padding: '10px',
        }}>

          <Grid container spacing={0} alignItems="center">
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <Card sx={{ maxWidth: '80%' }}>
                <CardMedia
                  sx={{ minHeight: 400 }}
                  image={notFound}
                />
                <CardContent>
                  <Typography variant="body" >
                    {'404 Not Found'}
                  </Typography>
                </CardContent>

                <CardActions>
                  <CardActions>
                    <Button size="small" onClick={() => {
                      navigate(`/home/${currPage}`)
                    }}>Back</Button>
                  </CardActions>
                </CardActions>
              </Card >
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </>
  );
}