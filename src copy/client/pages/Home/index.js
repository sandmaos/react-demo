import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/Card';
import {
  Button, Container, Paper, MenuItem, Select,
  InputLabel, FormControl, Grid, Pagination,
  Stack, TextField, Typography
} from '@mui/material'
import { setPageAction, setCardAction } from '../../redux/actions'

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localUsername = localStorage.getItem('username');
  const currPage = useSelector(state => state.cardReducer.currPage);
  const itemsPerPage = 6;
  const [totlePages, setTotalPages] = useState(0);
  const [currCards, setCurrCards] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState(-1);

  /* This is faster, perhaps the cardData is from redux, the axios in
   App.js returned later, then cardData update again, but there is no big 
   change other than add or delete, the DOM wont change.
  */
  // const cardData = useSelector(state => state.cardReducer.cardData);
  // useEffect(() => {
  //   if (localUsername !== null) {
  //   // shallow copy of cardData
  //   if (sortOption === -1)
  //     initCards([...cardData].sort((a, b) => { return b.id - a.id }));
  //   else
  //     initCards([...cardData].sort((a, b) => { return a.id - b.id }));
  //   }
  //   /* !!! Must listen [cardData], and it will trigger the Effect twice,
  //   since the init state of card in redux is [], then fetch form db,
  //   the state changed again
  //   */
  // }, [searchText, currPage, sortOption, cardData])

  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    axios.post('http://127.0.0.1:5000/api/cards', { sortOption })
      .then((res) => {
        const cardData = res.data.cardData;
        setCardData(cardData)
        dispatch(setCardAction(cardData));
        initCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchText, currPage, sortOption])


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
      newAllCardsList = cardData;
    }
    setTotalPages(Math.ceil(newAllCardsList.length / itemsPerPage));
    const currCardsList = newAllCardsList.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage);

    setCurrCards(currCardsList);
  }

  const handlePagination = ((e, val) => {
    dispatch(setPageAction(val));
    navigate(`/home/${val}`);
  })


  return (
    <Container sx={{ padding: '10px' }}>
      <Paper sx={{
        boxShadow: 3,
        padding: '10px',
      }}>
        {
          localUsername === null ?
            <>
              <Paper sx={{
                margin: '10px',
                boxShadow: 1,
                padding: '5px',
              }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}> </Grid>
                  <Grid item xs={4} textAlign={'center'}>
                    <Typography variant="h5" component="h2">
                      Please Sign In
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </>
            :
            <>

              <Paper sx={{
                margin: '10px',
                boxShadow: 3,
                padding: '5px',
              }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>Total: {cardData.length} cards</Grid>
                  <Grid item xs={4} textAlign='center'>
                    <TextField
                      fullWidth
                      id="standard-search"
                      label="Search field"
                      type="search"
                      variant="standard"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </Grid>

                  <Grid paddingRight={'3px'} item xs={4} textAlign={'right'} >
                    <FormControl fullWidth variant="standard" >
                      <InputLabel>Sort by time</InputLabel>
                      <Select
                        value={sortOption}
                        label="Sort by time"
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <MenuItem value={-1}>New to Old</MenuItem>
                        <MenuItem value={1}>Old to New</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>

              <Paper sx={{
                margin: '10px',
                boxShadow: 1,
                padding: '10px',
              }}>
                <Grid container spacing={2} alignItems="center">
                  {/* {currCards.map((item) => (
                    <Grid key={item.props.id} item xs={4}>
                      {item}
                    </Grid>
                  ))} */}

                  {currCards.map((item) => (
                    <Grid key={item.id} item xs={4}>
                      <Card {...item} />
                    </Grid>
                  ))}

                </Grid>
              </Paper>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4} textAlign={'left'}>
                  <Button
                    variant="contained"
                    sx={{ margin: '5px' }}
                    onClick={() => { navigate('/carousel') }}>Carousel
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={2} alignItems='center'>
                    <Pagination
                      count={totlePages}
                      variant="outlined"
                      shape="rounded"
                      page={currPage}
                      onChange={handlePagination} />
                  </Stack>
                </Grid>
                <Grid item xs={4} textAlign={'right'}>
                  <Button
                    variant="contained"

                    sx={{ margin: '5px' }}
                    onClick={() => { navigate('/addCard') }}>Add Card
                  </Button>
                </Grid>
              </Grid>
            </>
        }
      </Paper>
    </Container>
  )
}