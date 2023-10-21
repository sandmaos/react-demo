import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    pwd: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      navigate('/')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/register', formData)
      .then((msg) => {
        console.log(1, msg);
      })
      .then(() => {
        navigate('/home')
      })
      .catch((err) => {
        console.log(2, err);
      })
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>

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
              name="pwd"
              label="Confirm Password"
              type="password"
              id="pwdConfirm"
              autoComplete="current-password"
              value={formData.pwd}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  // return (
  //   <div>
  //     <p>Sign Up</p>
  //     <form type='submit'>
  //       <p>username:</p>
  //       <input name='username'
  //         value={formData.username}
  //         onChange={handleChange}>
  //       </input>

  //       <p>pwd:</p>
  //       <input name='pwd'
  //         value={formData.pwd}
  //         onChange={handleChange}>
  //       </input>

  //       <p>pwd confirm:</p>
  //       <input name='pwd'
  //         value={formData.pwd}
  //         onChange={handleChange}>
  //       </input>

  //       <button onClick={handleSubmit}> submit</button>
  //     </form>
  //   </div>
  // )
}
