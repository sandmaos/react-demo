import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'

export default function App() {
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));
  const navigate=useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLocalUsername(null);
    dispatch({ type: 'logout', data: ''  })
    navigate('/');
  }

  // verify jwt expire
  useEffect(() => {
    if (localUsername !== null) {
      dispatch({ type: 'signin', data: localUsername  })
      const token = localStorage.getItem('token');
      axios.post('http://127.0.0.1:5000/jwt', { token })
        .then((res) => {
          const { isExpired } = res.data;
          console.log(res);
          if (isExpired) {
            const expireAt = res.data.err.expiredAt;
            handleLogOut();
            alert(`Expired At:  ${expireAt}`);
          }
        }).catch((err) => {
          console.log(err.response.data);
        })
    }
  }, [])

  return (
    <div>
      <Header />
      <hr></hr>
      <Routes>
        <Route path='/' > </Route>
        <Route path='/home' element={<Home />}> </Route>
        <Route path='/signup' element={<SignUp />}> </Route>
        <Route path='/signin' element={<SignIn />}> </Route>
      </Routes>
    </div>
  )
}
