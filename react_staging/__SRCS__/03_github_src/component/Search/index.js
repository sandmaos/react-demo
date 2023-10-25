import React, { useState } from 'react';
import axios from 'axios';

export default function Search(props) {
  const [username, setUsername] = useState('');
  const handleInput = (e) => {
    setUsername(e.target.value);
  }
  const search = () => {
    props.setAllStates({isFirst:false,isLoading:true})
    axios.get(`https://api.github.com/search/users?q=${username}`)
      .then(res =>  props.setAllStates({isLoading:false,users:res.data.items}) )
      .catch((err) => {
        console.log(err);
        props.setAllStates({isLoading:false,error:err});
      })
  }

  return (
    <>
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text"
            value={username}
            onChange={handleInput}
            placeholder="enter the name" />&nbsp;
          <button onClick={search}>Search</button>
        </div>
      </section>
    </>
  )
}
