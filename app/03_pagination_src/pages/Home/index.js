import React, { useState, cloneElement } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Paper } from '@mui/material'
import Grid from "@mui/material/Grid"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { mediaArray } from '../../components/Media'

export default function Header() {
  // const { username } = useSelector(state => state.userReducer)
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = mediaArray.length;
  const totlePages = Math.ceil(totalItems / itemsPerPage);
  const currItems = mediaArray.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage);

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLocalUsername(null);
    dispatch({ type: 'logout', data: { username: '' } })
  }

  const handleEmail = () => {

  }

  return (
    <Paper alignItems sx={{
      margin: '10px',
      boxShadow: 3,
      padding: '5px',
    }}>

      <h1> Home </h1>
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
                  <Button sx={{ margin: '5px' }}
                    variant="contained"
                    onClick={handleEmail}>Send Email
                  </Button>
                </Grid>

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

                <Grid paddingRight={'10px'} item xs={4} textAlign={'right'}>
                  <span>Welcome, {localUsername}</span>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{
              margin: '20px',
              boxShadow: 1,
              padding: '5px',
            }}>
              <Grid container spacing={2} alignItems="center">
                {currItems.map((item) => (
                  <Grid key={item.id} item xs={4}>
                    {cloneElement(item.name, { page: currPage, id: item.name.key })}
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </>
      }
    </Paper>
  )
}
