import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './carousel.module.css';
import {
    Container,
    Paper,
    Button,
    Grid,
} from '@mui/material';
import CardCarousel from '../../components/CardCarousel';

export default function Carousel() {
    const slides = useSelector(state => state.cardReducer.cardData);
    const [currentSlide, setCurrentSlide] = useState(0);

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
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} textAlign='center'>
                        <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}>&lt;</Button>
                        {currentSlide + 1} / {slides.length}
                        <Button onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}>&gt;</Button>
                    </Grid>
                </Grid>
                <div className={styles.carousel}>
                    <div className={styles.fade} style={{ transform: translateValue }}>
                        {slides.map((card, index) => (
                            <div
                                key={index}
                                className={`${styles.carouselSlide} ${index === currentSlide ? styles.active : ''}`}
                            >
                                <CardCarousel id={card.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </Paper>
        </Container>
    );
}
