import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Media from '../../components/Media'
import MediaCard from '../../components/MediaCard'
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

  return (
    <>
      <h1> Home </h1>
      {
        localUsername === null ?
          <>
            <p>Please Sign in</p>
          </>
          :
          <>
            <p>Welcome, {localUsername}</p>
            <Button
              variant="contained"
              onClick={handleLogOut}>Log out</Button>

            <Grid container spacing={2}>
              {currItems.map((item) => (
                <Grid key={item.id} item xs={4}>
                  {item.name} {item.name.key}
                </Grid>
              ))}
            </Grid>

            <Stack spacing={2}>
              <Pagination
                count={totlePages}
                variant="outlined"
                shape="rounded"
                page={currPage}
                onChange={(e, val) => setCurrPage(val)} />
            </Stack>
          </>
      }
    </>
  )
}
