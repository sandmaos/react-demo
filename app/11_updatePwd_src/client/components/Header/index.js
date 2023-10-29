import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { logOutAction } from '../../redux/actions'
import { clearCardAction } from '../../redux/actions'

import { Button, Container, Typography } from '@mui/material';
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import PubSub from "pubsub-js";

export default function Header() {
  const userState = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [path, setPath] = useState('');
  const username = userState.username;
  const allowedPaths = ['/signin', '/signup'];
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    let currPath = location.pathname;
    if (!allowedPaths.includes(currPath))
      currPath = ''
    setPath(currPath);
  }, [location.pathname]);

  const handleChange = (_, newPath) => {
    setPath(newPath);
    switch (newPath) {
      case '/signin':
        return navigate('signin');
      case '/signup':
        return navigate('signup');
      default:
        return navigate('/');
    }
  };

  const handleLightMode = () => {
    const nowMode = !lightMode
    setLightMode(nowMode);
    PubSub.publish('theme', nowMode ? 'light' : 'dark')
  }
  const handleLogOut = () => {
    localStorage.clear();
    // setLocalUsername(null);
    dispatch(logOutAction(''));
    dispatch(clearCardAction([]))
    navigate('/home')
  }

  return (
    <>
      <Container  sx={{ maxHeight: 200 }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
          }}
        >
          <Toolbar stickyHeader  sx={{ flexWrap: 'wrap' }}>
            <Grid  color="inherit" item sx={{ flexGrow: 1 }}>
              <Button
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
                onClick={() => navigate('/home')}
              >
                Home
              </Button>
            </Grid>
            <Grid color="inherit" item >
              <Box onClick={handleLightMode} sx={{marginRight:1}}>
                {lightMode ?
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                  </svg>
                  :
                  <svg style={{ fill: 'orange' }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Zm297-297Z" />
                  </svg>
                }
              </Box >
            </Grid>
            {
              username &&
              <Grid paddingRight={'10px'} item xs={4} textAlign={'right'}>
                <span>Welcome, {username}</span>
              </Grid>
            }

            {
              username === '' ?
                <Button
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() => navigate('signin')}
                >
                  Sign in
                </Button>
                :
                <Button
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={handleLogOut}>
                  Logout
                </Button>
            }
          </Toolbar>
        </AppBar>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={path}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {
                  username === '' &&
                  [
                    // <Tab label="Home" value='' disabled={true} key={3} />,
                    <Tab label="Sign In" value='/signin' key={1} />,
                    <Tab label="Sign Up" value='/signup' key={2} />,
                  ]
                }
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </Container>
    </>
  )
}
