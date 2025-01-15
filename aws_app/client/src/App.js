import React, { useState, useEffect } from 'react';
import styles from './carousel.module.css';
import {
  Container,
  Paper,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import Carousel from './Carousel';
import axios from 'axios';
import baseURL from './api/base'

export default function App() {
  const slides = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleOnCLick = () => {
    axios.get(baseURL + '/info')
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const translateValue = `translateX(${-currentSlide * 100}%)`;

  return (
    <Container sx={{ padding: '10px' }}>
      <Paper sx={{
        boxShadow: 3,
        padding: '10px',
      }}>
        <Paper sx={{
          margin: '10px',
          boxShadow: 3,
          padding: '5px',
        }}>
          <Grid container spacing={2} alignItems="center" justifyContent='center' >
            <Typography variant="h6" component="h1">
              Love  ♂s  Abstract
            </Typography>
          </Grid>
          <button onClick={handleOnCLick}> API</button>
        </Paper>
        <Container
          sx={{
            padding: '10px',
          }}>
          <Paper sx={{
            margin: '10px',
            boxShadow: 3,
            padding: '10px',
            paddingBottom: '30px',
          }}>
            <Grid container
              spacing={0}
              alignItems="center"
              sx={{ marginBottom: 2 }}
            >
              <Grid item xs={3}></Grid>
              <Grid textAlign='center'>
                <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}>&lt;</Button>
                {currentSlide + 1} / {slides.length}
                <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}>&gt;</Button>
              </Grid>
            </Grid>
            <div className={styles.carousel}>
              <div className={styles.fade} style={{ transform: translateValue }}>
                {slides.map((id, index) => (
                  <div
                    key={index}
                    className={`${styles.carouselSlide} ${index === currentSlide ? styles.active : ''}`}
                  >
                    <Carousel id={id} />
                  </div>
                ))}
              </div>
            </div>
          </Paper>
        </Container>
      </Paper>
    </Container>
  )
}
