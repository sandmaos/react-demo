import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid"

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
  const cardState = useSelector(state => state.cardReducer);
  const { cardData, currPage } = cardState;
  const navigate = useNavigate();
  const token = useState(localStorage.getItem('token'))[0];
  // const { text } = props;
  const id = props.id;
  const type = props.type;
  const card = cardData.filter((item) => item.id === id);
  const { text } = card[0] || '' //ready for 2nd render() in Home
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
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      axios.post('http://127.0.0.1:5000/api/deleteCard', { id, token: `Bearer_${token}` })
        .then((res) => {
          alert(res.data.msg);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 140 }}
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

      </CardContent>

      <CardActions>
        <CardActions>
          <Button size="small" onClick={() => {
            navigate(`/home/${currPage}/${id}`)
          }}>Learn More</Button>
        </CardActions>
        <CardActions>
          <Button size="small" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </CardActions>
    </Card >
  );
}