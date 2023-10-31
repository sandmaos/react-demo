import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { FormControl, Grid } from '@mui/material'

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    pwd: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/api/register', formData)
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


  return (
    <Container component="main"
      maxWidth="xs"
      sx={{ padding: 10 }}>
      <Box
        sx={{
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
        <form onSubmit={handleSubmit}>

          <FormControl fullWidth >
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
          </FormControl>
          <FormControl fullWidth >
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
          </FormControl>
          <FormControl fullWidth>

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
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent={'flex-end'}>
          <Grid>
            <Link
              sx={{ ':hover': { cursor: 'pointer' } }}
              onClick={() => navigate('/signin')}
              variant='body2'>
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
