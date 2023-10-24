import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AddCard from './pages/AddCard'
import MediaCard from './components/MediaCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

export default function App() {
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLocalUsername(null);
    dispatch({ type: 'logout', data: { username: '' } });
    dispatch({ type: 'clearCard', data: [] });
    navigate('/');
  }

  // verify jwt expire when refresh website
  useEffect(() => {
    if (localUsername !== null) {
      dispatch({ type: 'signin', data: { username: localUsername } })
      const token = localStorage.getItem('token');
      axios.post('http://127.0.0.1:5000/api/jwt', { token })
        .then((res) => {
          const { isExpired } = res.data;
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
      <Routes>
        {/* <Route path='/' element={<Home />}> </Route> */}
        <Route path='/home' element={<Home />}> </Route>
        <Route path='/home/:id/:type' element={<MediaCard />}> </Route>
        <Route path='/signup' element={<SignUp />}> </Route>
        <Route path='/signin' element={<SignIn />}> </Route>
        <Route path='/addCard' element={<AddCard />}> </Route>
        <Route path='/*' element={<Navigate to="/home" />}> </Route>
      </Routes>

    </div>
  )
}
