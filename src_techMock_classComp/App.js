import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

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

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchData: [],
            searchText: '',
            itemImage: '',
            disable: false,
        }
    }

    handleOnChange = (e) => {
        this.setState({ searchText: e.target.value });
        if (e.target.value === '') {
            this.setState({ searchData: this.state.data.results, itemImage: '' });
        }
    }

    handleOnClick = () => {
        this.setState({ itemImage: '', disable: true });
        const newData = this.state.data.results.filter((item) => {
            return item.name.includes(this.state.searchText);
        })
        this.setState({ searchData: newData });
        setTimeout(() => { //debounce
            this.setState({ disable: false });
        }, 1000)
    }

    handleItemClick = (url) => {
        axios.get(url)
            .then((res) => {
                // console.log(res.data);
                this.setState({ itemImage: res.data.sprites.front_default });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handlePage = (url) => {
        this.setState({ searchText: '', itemImage: '' })
        axios.get(url)
            .then((res) => {
                this.setState({ data: res.data, searchData: res.data.results })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then((res) => {
                this.setState({ data: res.data, searchData: res.data.results })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <div className='App' >
                    <img className='title-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png' />
                    <div className='search-container'>
                        <input value={this.state.searchText} className='search-input' onChange={this.handleOnChange} placeholder="Pokemon Search" />
                        <button className='search-button' disabled={this.state.disable} onClick={this.handleOnClick}> Search</button>
                    </div>
                    <div className='grid'>
                        {
                            this.state.searchData.map((item, key) =>
                                <div className='grid-item' onClick={() => this.handleItemClick(item.url)} key={key}>
                                    {item.name}
                                </div>
                            )
                        }
                    </div>

                    <div className='page-navi'>
                        <button disabled={this.state.data.previous ? false : true}
                            onClick={() => this.handlePage(this.state.data.previous)}
                        > Previous</button>

                        <button disabled={this.state.data.next ? false : true}
                            onClick={() => this.handlePage(this.state.data.next)}>
                            Next</button>
                    </div>

                    <div className='img-holder'>
                        {
                            this.state.itemImage && <img src={this.state.itemImage} />
                        }
                    </div>
                </div>
            </>
        );
    }
}
