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


export default function MediaCard(props) {
  const { id, type, text } = props;
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
        return lizard;
    }
  }
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
          id:{id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type} are a widespread group of squamate reptiles, with over 6,000
          species.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}