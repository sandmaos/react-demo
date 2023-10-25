import React, { useState } from 'react';
// import axios from 'axios';
import PubSub from "pubsub-js";

export default function Search() {
  const [username, setUsername] = useState('');
  const handleInput = (e) => {
    setUsername(e.target.value);
  }
  const search = async () => {
    PubSub.publish('github', { isFirst: false, isLoading: true });
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${username}`);
      const data = await res.json();
      PubSub.publish('github', { isLoading: false, users: data.items });
    } catch (error) {
      console.log(error);
    }

    // fetch(`https://api.github.com/search/users?q=${username}`)
    // .then(res => {
    //   console.log('Server connected',res);
    //   return res.json();
    // })
    // .then(res => console.log(res))
    // .catch(err => {
    //   PubSub.publish('github', { isLoading: false, error: err });
    // })
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
