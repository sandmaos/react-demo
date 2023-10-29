import React, { useState, cloneElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Container, Paper } from '@mui/material'
import Grid from "@mui/material/Grid"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { mediaArray } from '../../components/Media'

export default function Header() {
  // const { username } = useSelector(state => state.userReducer)
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 6;
  const [nowAllItems, setNowAllItems] = useState(mediaArray);
  const [totlePages, setTotalPages] = useState(Math.ceil(mediaArray.length / itemsPerPage));
  const [currItems, setCurrItems] = useState(mediaArray.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage));

  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => {
    setSearchText(() => e.target.value);
  };

  useEffect(() => {
    var newAllItems = [];
    if (searchText !== '') {
      newAllItems = nowAllItems.filter((item) => {
        return (item.id % 2 === 0)
      })
    }
    else
      newAllItems = [...mediaArray];
    setNowAllItems(newAllItems);
    setTotalPages(Math.ceil(newAllItems.length / itemsPerPage));
    setCurrItems(newAllItems.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage));
  }, [searchText, currPage])

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLocalUsername(null);
    dispatch({ type: 'logout', data: { username: '' } })
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
                      onChange={handleSearch}
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
                  {currItems.map((item) => (
                    <Grid key={item.id} item xs={4}>
                      {cloneElement(item.name, { page: currPage, id: item.name.key })}
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
