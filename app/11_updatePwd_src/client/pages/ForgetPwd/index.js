import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import NoEncryptionOutlinedIcon from '@mui/icons-material/NoEncryptionOutlined';
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material';

import { authUpdatePwd } from '../../utils/emailjsAuth'

export default function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [pwdJwt, setPwdJwt] = useState('');

  const handleGetJwt = () => {
    axios.post('http://127.0.0.1:5000/api/findUser', { username })
      .then(res => {
        if (res.data.findUser) {
          setPwdJwt(res.data.token);
        }
        else alert(res.data.message);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    authUpdatePwd(pwdJwt)
      .then(() => {
        alert('Check email')
        navigate('/signin')
      }).catch((err) => {
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
            <NoEncryptionOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            {
              pwdJwt === '' ?
                'User Verify'
                :
                `token: ${pwdJwt.slice(0, 25)}...`
            }

          </Typography>
          <form onSubmit={handleSubmit}>

            <TextField
              margin="normal"
              required
              fullWidth
              disabled={pwdJwt !== ''}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {
              pwdJwt === '' ?
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleGetJwt}
                >
                  Generate token
                </Button>
                :
                <></>
            }

            {
              pwdJwt && <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm
              </Button>
            }

          </form>

        </Box>
      </Container>
    </>
  );
}
