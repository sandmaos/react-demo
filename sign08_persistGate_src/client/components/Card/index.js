import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MediaCard(props) {
  const path = useLocation().pathname.split('/');
  const cardData = useSelector(state => state.cardReducer.cardData);
  const navigate = useNavigate();
  // const { text } = props;
  const id =  props.id;
  const type = props.type;
  const card = cardData.filter((item) => item.id === id);
  const { text } = card[0]
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
  const handleDelete = () => {
    axios.post('http://127.0.0.1:5000/api/deleteCard', { id })
      .then((res) => {
        alert(res.data.msg);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={handleImage()}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {type}
        </Typography>
        <Typography variant="body" >
          {timeObj.toDateString() + ' ' + timeObj.toTimeString().split(' ')[0]}
        </Typography>
        {
          path.length === 2 ? <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 3,
              }}>
              {text}
            </Typography>
          </> :
            <>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {text}
              </Typography>
            </>
        }
      </CardContent>

      <CardActions>
        <CardActions>
          {
            path.length === 2 ?
              <Button size="small" onClick={() => {
                navigate(`/home/${id}/${type}`)
              }}>Learn More</Button>
              :
              <Button size="small" onClick={() => {
                navigate(`/home`)
              }}>Back</Button>
          }
        </CardActions>
        <CardActions>
          <Button size="small" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </CardActions>
    </Card >
  );
}