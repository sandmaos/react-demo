import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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

  useEffect(() => {
    if (localUsername !== null) {
      dispatch({ type: 'signin', data: { username: localUsername } })
      const token = localStorage.getItem('token');
      axios.post('http://127.0.0.1:5000/jwt', { token })
        .then((res) => {
          const { isExpired } = res.data;
          if (isExpired) {
            alert('Expired At: ',res.data.err.expiredAt)
            handleLogOut();
          }
        }).catch((err) => {
          console.log(err.response.data);
        })
    }
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
