import React, { useState, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
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
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { FormControl, Grid } from '@mui/material'

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    pwd: '',
    pwdConfirm: '',
  })
  const [pwdError, setPwdError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [isHuman, setIsHuman] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPwdError(false);
    setFormData({
      ...formData,
      [name]: value,
      pwdConfirm: name === 'pwdConfirm' ? value : '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isHuman)
      return alert('Please verify!')
    const pwdMatch = formData.pwd === formData.pwdConfirm;
    if (pwdMatch) {
      await axios.post('http://127.0.0.1:5000/api/register', formData)
        .then((res) => {
          alert(res.data.message)
          if (!res.data.duplicate)
            navigate('/home')
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else
      setPwdError(true)
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
              type={showPwd ? 'text' : 'password'}
              id="pwd"
              autoComplete="current-password"
              value={formData.pwd}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ fontSize: '16px', boxShadow: 3 }}
                      aria-label="show pwd"
                      onClick={() => setShowPwd(preVal => !preVal)}
                    >
                      {
                        showPwd ? 'hide' : 'show'
                      }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth>

            <TextField
              margin="normal"
              required
              fullWidth
              name="pwdConfirm"
              label="Confirm Password"
              type={showPwd ? 'text' : 'password'}
              id="pwdConfirm"
              autoComplete="confirm-password"
              value={formData.pwdConfirm}
              onChange={handleChange}
              error={pwdError}
            />
            {
              pwdError &&
              <Typography fontSize={14} style={{ color: '#f44336' }}>
                Password Not Match!
              </Typography>
            }
          </FormControl>

          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //for test
            onChange={(value) => {
              console.log(value);
              setIsHuman(true);
            }}
          />

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
