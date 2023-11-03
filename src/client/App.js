import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Error from './pages/Error'
import AddCard from './pages/AddCard'
import CardDetail from './components/CardDetail'
import ForgetPwd from './pages/ForgetPwd'
import UpdatePwd from './pages/UpdatePwd'
import Carousel from './pages/Carousel'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { signInAction, logOutAction } from './redux/actions'
import { setCardAction, clearCardAction } from './redux/actions'

import PubSub from "pubsub-js";

export default function App() {
  const dispatch = useDispatch();
  //!!! ERROR Usage
  // const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));
  const localUsername = localStorage.getItem('username');
  const navigate = useNavigate();
  const PATH = useLocation();
  const [themMode, setThemMode] = useState('dark');
  const pubId = PubSub.subscribe('theme', (_, data) => setThemMode(data));

  const handleLogOut = () => {
    localStorage.clear();
    // setLocalUsername(null);
    dispatch(logOutAction());
    dispatch(clearCardAction());
    navigate('/');
  }

  // verify jwt expire when refresh website
  useEffect(() => {
    if (localUsername !== null) {
      
      dispatch(signInAction(localUsername))
      const token = localStorage.getItem('token');
      axios.post('http://127.0.0.1:5000/api/jwt', { token })
        .then((res) => {
          const { isExpired } = res.data;
          if (isExpired) {
            const expireAt = res.data.err.expiredAt;
            handleLogOut();
            alert(`Expired At: ${expireAt}`);
          }
        }).catch((err) => {
          console.log(err.response.data);
        });
      axios.post('http://127.0.0.1:5000/api/cards', { sortOption: -1 })
        // fetch('http://127.0.0.1:5000/api/cards', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ sortOption: -1 }),
        // })
        //   .then(res => {
        //     return res.json(); // Parse JSON data
        //   })
        .then((res) => {
          const cardData = res.data.cardData;
          dispatch(setCardAction(cardData));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (() => {
      PubSub.unsubscribe(pubId);
    })

  }, [])
  // }, [PATH])

  return (
    <>
      <ThemeProvider theme={createTheme({ palette: { mode: themMode } })}>
        <CssBaseline />
        <Header />
        <Routes path='/'>
          <Route index element={<Navigate to={'/home'} />} />

          <Route path='home'>
            <Route index element={<Home />} />
            <Route path=':page' >
              <Route index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }>
              </Route>
              <Route path=':cardId'
                element={<ProtectedRoute>
                  <CardDetail />
                </ProtectedRoute>
                } >
              </Route>
            </Route>
          </Route>

          <Route
            path='signup'
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='signin'
            element={
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='forget_pwd'
            element={
              <ProtectedRoute>
                <ForgetPwd />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='update_pwd/:id'
            element={
              <ProtectedRoute>
                <UpdatePwd />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='addCard'
            element={
              <ProtectedRoute>
                <AddCard />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='carousel'
            element={
              <ProtectedRoute>
                <Carousel />
              </ProtectedRoute>
            }>

          </Route>

          <Route path='error' element={<Error />}> </Route>
          <Route path='*' element={<Navigate to={'/error'} />}> </Route>
        </Routes>

        <Footer />
      </ThemeProvider>
    </>
  )
}
