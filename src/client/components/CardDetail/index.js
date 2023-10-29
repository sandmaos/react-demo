import React, { useEffect } from 'react';
import {
  Card,
  Container,
  Paper,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import lizard from '../../static/lizard.jpg';
import giraffe from '../../static/giraffe.jpg';
import tiger from '../../static/tiger.jpg';
import hippo from '../../static/hippo.jpg';
import kangaroo from '../../static/kangaroo.jpg';
import zebra from '../../static/zebra.jpg';
import koala from '../../static/koala.jpg';
import penguin from '../../static/penguin.jpg';
import dolphin from '../../static/dolphin.jpg';
import pets from '../../static/pets.jpg';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CardDetail() {
  const id = useParams().cardId * 1;
  const { cardData, currPage } = useSelector(state => state.cardReducer);
  const navigate = useNavigate();
  // const { text } = props;
  const card = cardData.filter((item) => item.id === id);
  const { text, type } = card[0] || '';
  const timeObj = new Date(id);
  const handleImage = () => {
    switch (type) {
      case 'Lizard':
        return lizard;
      case 'Giraffe':
        return giraffe;
      case 'Tiger':
        return tiger;
      case 'Hippo':
        return hippo;
      case 'Hippo':
        return hippo;
      case 'Kangaroo':
        return kangaroo;
      case 'Zebra':
        return zebra;
      case 'Koala':
        return koala;
      case 'Penguin':
        return penguin;
      case 'Dolphin':
        return dolphin;
      default:
        return pets;
    }
  }
  useEffect(()=>{
    if(!card[0])
    return navigate('error')
  },[])

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
                  image={handleImage()}
                  title={type}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {type}
                  </Typography>
                  <Typography variant="body" >
                    {timeObj.toDateString() + ' ' + timeObj.toTimeString().split(' ')[0]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {text}
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