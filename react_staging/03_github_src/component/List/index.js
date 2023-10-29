import React from 'react'
import './index.css';

export default function List(props) {
  const users = props.states.users.slice(0, 9);
  const { isFirst, isLoading, error } = props.states;
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
