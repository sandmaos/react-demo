import { Box, Input, Paper, Grid, CardMedia, Button, Typography, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'

/**
 * 1. fetch pokemon data list from API https://pokeapi.co/api/v2/pokemon
 * 2. display the list under search input
 * 3. implement to filter out the list by user's input
 * 4. make the item in the list clickable so it will send another request
 *    to get the detail of the pokemon.
 * 5. show the pokemon's image under list (sprites.front_default)
 * follow-up:
 * a. make the search filter debouncable
 * b. make the UI look better
 */

export default function App() {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [disable, setDisable] = useState(false);
    const handleOnChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value === '') {
            setSearchData(data);
            setItemImage('');
            return
        }
    }

    const handleOnClick = () => {
        setItemImage('');
        setDisable(true);
        const newData = data.filter((item) => {
            return item.name.includes(searchText);
        })
        setSearchData(newData);
        setTimeout(() => { //debounce
            setDisable(false);
        }, 1000)
    }

    const handleItemClick = (url) => {
        axios.get(url)
            .then((res) => {
                // console.log(res.data);
                setItemImage(res.data.sprites.front_default)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then((res) => {
                // console.log(res.data.results);
                setData(res.data.results);
                setSearchData(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <>
            <Container className='App' sx={{ padding: '10px' }} >
                <Paper sx={{ padding: '10px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid container item alignItems='center'>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={10}>
                                <CardMedia
                                    sx={{ height: 160, width: '80%' }}
                                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
                                />
                            </Grid>
                        </Grid>
                        <Grid container item alignItems='center'>
                            <Grid item xs={4}></Grid>
                            <Input onChange={handleOnChange} placeholder="Pokemon Search" />
                            <Button disabled={disable} onClick={handleOnClick}>Search</Button>
                        </Grid>
                        <Grid container item alignItems='center'>
                            {
                                searchData.map((item, key) =>
                                    <Grid item xs={3} key={key}>
                                        <Typography sx={{ marginTop: '20px', ':hover': { cursor: 'pointer' }, marginRight: 1 }} onClick={() => handleItemClick(item.url)}>
                                            {item.name}
                                        </Typography>

                                    </Grid >
                                )
                            }
                        </Grid>
                        {
                            itemImage && <img src={itemImage} />
                        }
                    </Box>
                </Paper>
            </Container>
        </>
    );
}
