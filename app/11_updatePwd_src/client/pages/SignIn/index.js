import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import {
  Button,
  TextField,
  Box,
  Grid,
  Link,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { authPassCode } from '../../utils/emailjsAuth'

import { signInAction } from '../../redux/actions'

export default function App() {
  const emailTime = 60;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    pwd: '',
    myCode: ''
  })
  const [isDisabled, setIsDisabled] = useState(false)
  const [verifyCode, setVerifyCode] = useState('');
  const [timer, setTimer] = useState(emailTime)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleVerify = () => {
    authPassCode()
      .then((res) => {
        console.log(res.msg)
        setVerifyCode(res.code);
      })
      .catch((err) => {
        alert(err.msg)
      });

    setIsDisabled(true);
    const nowId = setInterval(() => {
      setTimer((preTimer) => preTimer - 1);
    }, 1000);

    setTimeout(() => {
      setIsDisabled(false);
      setVerifyCode(''); //code expired
      setTimer(emailTime); //initial timer
      clearInterval(nowId);
    }, emailTime * 1000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { myCode } = formData;
    // if (myCode * 1 !== verifyCode) {
    //   return alert('Wrong Verify Code!')
    // }
    axios.post('http://127.0.0.1:5000/api/signin', formData)
      .then((res) => {
        if (res.data.flag) {
          alert('Signed In!');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', formData.username);
          dispatch(signInAction(formData.username))
          navigate('/home')
        }
        else throw (res.data.message);
      })
      .catch((err) => {
        alert(`Sign in failed: ${err}`);
      })
  }

  return (
    <>
      <Container component="main"
        maxWidth="xs"
        sx={{ padding: 10 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pwd"
              label="Password"
              type="password"
              id="pwd"
              autoComplete="current-password"
              value={formData.pwd}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="myCode"
              label="Verify Code"
              type="text"
              id="myCode"
              value={formData.myCode}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send verification"
                      onClick={handleVerify}
                      disabled={isDisabled}
                    >
                      {
                        isDisabled ? timer : <SendIcon />
                      }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link
                sx={{ ":hover": { cursor: 'pointer' } }} onClick={() => navigate('/forget_pwd')} variant="body2">
                Forgot password?
              </Link>
            </Grid>

          </Grid>
        </Box>
      </Container>
    </>
  );
}
