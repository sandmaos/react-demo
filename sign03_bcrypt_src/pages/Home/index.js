import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import MediaCard from '../../components/MediaCard';
import axios from 'axios'


export default function Header() {
  // const { username } = useSelector(state => state.userReducer)
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLocalUsername(null);
    dispatch({ type: 'logout', data: { username: '' } })
  }

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
