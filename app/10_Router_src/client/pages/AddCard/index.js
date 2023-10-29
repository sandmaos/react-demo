import React, { useState } from 'react'
import { Button, Container, Paper } from '@mui/material'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageAction } from '../../redux/actions';
import axios from 'axios';

export default function AddCard() {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: '',
    text: ''
  });
  const handleChange = (e) => {
    setFormData(() => {
      return {
        ...formData,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/api/addCard', { ...formData, token: `Bearer_${token}` })
      .then((res) => {
        alert(res.data.msg);
        dispatch(setPageAction(1));
        navigate('/home');
      }).catch((err) => {
        console.log(err.data.msg);
      })
  }

  return (
    <>
      <Container sx={{
        padding: '10px',
      }}>
        <Paper sx={{
          margin: '10px',
          boxShadow: 3,
          padding: '10px',
        }}>
          <Typography variant="h6" gutterBottom>
            Add Card
          </Typography>
          <Button sx={{ margin: '5px' }}
            variant="contained"
            onClick={() => { navigate('/home') }}>Home
          </Button>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <FormControl fullWidth margin="normal">
                  <TextField
                    required
                    id="type"
                    name="type"
                    label="Animal Type"
                    fullWidth
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    required
                    id="text"
                    name="text"
                    label="Text"
                    fullWidth
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>

        </Paper>
      </Container >
    </>
  )
}
