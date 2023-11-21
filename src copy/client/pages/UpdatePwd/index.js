import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {
  TextField,
  Box,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';

export default function UpdatePwd(props) {
  const { username } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pwd: '',
    confirmPwd: '',
  })
  const [pwdError, setPwdError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPwdError(false);
    setFormData({
      ...formData,
      [name]: value,
      confirmPwd: name === 'confirmPwd' ? value : '' //clear confirmPwd when input other fields
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pwd === formData.confirmPwd) {
      axios.post('http://127.0.0.1:5000/api/update-pwd', { username, password: formData.pwd })
        .then((res) => {
          alert(res.data.message)
          navigate('/signin')
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else
      setPwdError(true);
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
              type={showPwd ? 'text' : 'password'}
              id="pwd"
              autoComplete="current-password"
              value={formData.pwd}
              onChange={handleChange}
              error={pwdError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ fontSize: '16px', boxShadow: 3 }}
                      aria-label="show pwd"
                      onClick={() => setShowPwd(preVal => !preVal)}
                    >
                      {
                        showPwd ? 'Hide' : 'Show'
                      }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPwd"
              label="Confirm Password"
              type={showPwd ? 'text' : 'password'}
              id="confirmPwd"
              autoComplete="confirm-password"
              value={formData.confirmPwd}
              onChange={handleChange}
              error={pwdError}
            />
            {
              pwdError &&
              <Typography fontSize={14} style={{ color: '#f44336' }}>
                Password not match!
              </Typography>
            }
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
