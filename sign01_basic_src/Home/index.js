import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  // const { username } = useSelector(state => state.userReducer)
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));

  const handleLogOut = () => {
    localStorage.removeItem('username');
    setLocalUsername(null);
    dispatch({ type: 'logout', data: { username: '' } })
  }

  useEffect(() => {
    if (localUsername !== null)
      dispatch({ type: 'signin', data: { username: localUsername } })
  }, [])


  return (
    <div>
      <h1> Home </h1>
      {
        localUsername === null ?
          <>
            <p>Please Sign in</p>
          </>
          :
          <>
            <p>Welcome, {localUsername}</p>
            <button onClick={handleLogOut}>Log out</button>
          </>
      }
    </div>
  )
}
