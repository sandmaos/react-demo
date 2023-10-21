import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

export default function Header() {
  const userState = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState('home');
  const username = userState.username;

  useEffect(() => {
    const currPath=location.pathname.slice(1) || 'home';
    setPath(() => currPath);
  }, [path]);

  const handleChange = (event, newPath) => {
    setPath(newPath);
    switch (newPath) {
      case 'home':
        return navigate('home');
      case 'signin':
        return navigate('signin');
      case 'signup':
        return navigate('signup');
      default:
        return
    }
  };


  return (
    <>
      <Container>
        <h1>Header</h1>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={path}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Home" value="home"  key={1}/>
                {
                  username === '' ? [
                    <Tab label="Sign In" value="signin" key={2} />,
                    <Tab label="Sign Up" value="signup" key={3}/>
                  ]
                    : null
                }
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </Container>
    </>
  )
}
