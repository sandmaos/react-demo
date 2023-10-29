import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl } from '@mui/material'


export default function UpdatePwd(props) {
  const { username } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pwd: '',
    confirmPwd: '',
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
    axios.post('http://127.0.0.1:5000/api/update-pwd', { username, password: formData.pwd })
      .then((res) => {
        alert(res.data.message)
        navigate('/signin')
      })
      .catch((err) => {
        console.log(err);
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
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Update Password
          </Typography>
          <form onSubmit={handleSubmit}>

            <TextField
              margin="normal"
              required
              fullWidth
              disabled
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
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
              name="confirmPwd"
              label="Confirm Password"
              type="password"
              id="confirmPwd"
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
              Update
            </Button>

          </form>

        </Box>
      </Container>
    </>

  )
}
