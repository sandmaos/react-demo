import React,{useEffect, useState} from 'react'
import PubSub from "pubsub-js";
import './index.css';

export default function List() {
  const [states,setStates]=useState({
    users:[],
    isFirst:true,
    isLoading:false,
    error:''
  })
 
  const { users,isFirst, isLoading, error } = states;

  useEffect(() => {
    const token = PubSub.subscribe('github',(msg,data)=>{
      setStates((states)=>{
        return {...states,...data}
      })
    })
  
    return () => {
      PubSub.unsubscribe(token);
    }
  }, [])
  
  return (
    <div className="row">
      {
        isFirst ?
          (<h2>Welcome!</h2>) :
          isLoading ?
            (<h2>Loading...</h2>) :
            error ?
              (<h2>{error.message}</h2>) :
                (users.map((user) => {
                  return (
                    <div key={user.id} className="card">
                      <a href={user.html_url} target="_blank">
                        <img alt='avatar' src={user.avatar_url} style={{ width: '100px' }} />
                      </a>
                      <p className="card-text">{user.login}</p>
                    </div>
                  )
                })
                )
      }
    </div>
  )
}
