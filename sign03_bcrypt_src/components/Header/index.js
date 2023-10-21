import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

export default function Header() {
  const userState = useSelector(state => state.userReducer);
  const navigate = useNavigate();

  const username = userState.username;
  const handleSignIn = () => {
    navigate('signin');
  }
  const handleSignUp = () => {
    navigate('signup');
  }


  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === '1')
      handleSignIn()
    else
      handleSignUp();
  };


  return (
    <div>
      <Container>
        <h1>Header</h1>
        <Button onClick={()=>{navigate('/home')}}>Home</Button>
        {
          username === '' ?
            <>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Sign In" value="1" />
                      <Tab label="Sign Up" value="2" />
                    </TabList>
                  </Box>
                </TabContext>
              </Box>
              {/* <Button variant="contained" onClick={handleSignUp}>SignUp</Button>
              <Button variant="contained" onClick={handleSignIn}>SignIn</Button> */}
            </>
            : <></>
        }
      </Container>
    </div>
  )
}
