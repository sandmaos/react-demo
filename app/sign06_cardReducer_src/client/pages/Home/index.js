import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Paper } from '@mui/material'
import Grid from "@mui/material/Grid"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// import { mediaArray } from '../../components/Media'

import MediaCard from '../../components/MediaCard';
// import mediaData from '../../utils/mediaData';

export default function Header() {
  const dispatch = useDispatch();
  const cardState = useSelector((state) => state.cardReducer);
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 6;
  const [totlePages, setTotalPages] = useState(-1);
  const [currCards, setCurrCards] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (localUsername !== null) { //fetch cards info 
      var cardData = cardState.cardData;
      if (cardData.length === 0) { //fetch only when refresh web
        axios.get('http://127.0.0.1:5000/cards')
          .then((res) => {
            cardData = res.data.cardData;
            dispatch({ type: 'setCard', data: cardData });
            initCards(cardData);
          })
          .catch((err) => {
            console.log(err);
          })
      }
      initCards(cardData);
    }
  }, [searchText, currPage])

  const initCards = (cardData) => {
    var newAllCardsList = [];
    if (searchText !== '') {
      newAllCardsList = cardData.filter((item) => {
        const regex = new RegExp(searchText, 'i');
        return regex.test(item.type);
        // return (item.type.toLowerCase().indexOf(searchText) !== -1)
      })
    }
    else {
      newAllCardsList = [...cardData];
    }
    setTotalPages(Math.ceil(newAllCardsList.length / itemsPerPage));
    const currCardsList = newAllCardsList.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage);

    setCurrCards(() => {
      return currCardsList.map((item) => (
        <MediaCard {...item} />
      ));
    });
  }

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLocalUsername(null);
    dispatch({ type: 'logout', data: { username: '' } });
    dispatch({ type: 'clearCard', data: [] })
  }

  return (
    <Container sx={{
      padding: '10px',
    }}>
      <Paper sx={{
        margin: '10px',
        boxShadow: 3,
        padding: '10px',
      }}>
        <Paper sx={{
          margin: '10px',
          boxShadow: 1,
          padding: '5px',
        }}>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}> </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" component="h2">
                Home
              </Typography>
            </Grid>
          </Grid>

        </Paper>
        {
          localUsername === null ?
            <>
              <p>Please Sign in</p>
            </>
            :
            <>
              <Paper sx={{
                margin: '10px',
                boxShadow: 3,
                padding: '5px',
              }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Button sx={{ margin: '5px' }}
                      variant="contained"
                      onClick={handleLogOut}>Log out
                    </Button>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="standard-search"
                      label="Search field"
                      type="search"
                      variant="standard"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </Grid>

                  <Grid paddingRight={'10px'} item xs={4} textAlign={'right'}>
                    <span>Welcome, {localUsername}</span>
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{
                margin: '10px',
                boxShadow: 1,
                padding: '10px',
              }}>
                <Grid container spacing={2} alignItems="center">
                  {currCards.map((item) => (
                    <Grid key={item.props.id} item xs={4}>
                      {item}
                      {/* {cloneElement(item.name, { page: currPage, id: item.name.key })} */}
                    </Grid>
                  ))}

                </Grid>
              </Paper>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}> </Grid>
                <Grid item xs={4}>
                  <Stack spacing={2}>
                    <Pagination
                      count={totlePages}
                      variant="outlined"
                      shape="rounded"
                      page={currPage}
                      onChange={(e, val) => setCurrPage(val)} />
                  </Stack>
                </Grid>
                <Grid item xs={4}> </Grid>
              </Grid>
            </>
        }
      </Paper>
    </Container>
  )
}
