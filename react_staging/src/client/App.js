import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Error from './pages/Error'
import AddCard from './pages/AddCard'
import CardDetail from './components/CardDetail'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { signInAction, logOutAction } from './redux/actions'
import { setCardAction, clearCardAction } from './redux/actions'

export default function App() {
  const dispatch = useDispatch();
  const [localUsername, setLocalUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();
  const PATH = useLocation();
  const { currPage } = useSelector(state => state.cardReducer);

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLocalUsername(null);
    dispatch(logOutAction(''));
    dispatch(clearCardAction([]));
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
        })

      axios.post('http://127.0.0.1:5000/api/cards', { sortOption: -1 })
        .then((res) => {
          const cardData = res.data.cardData;
          dispatch(setCardAction(cardData));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [PATH])

  return (
    <>
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
        <Header />
        <Routes path='/'>
          <Route index element={<Home />} />  

          <Route path='home'>
            <Route index element={<Home />} />
            <Route path=':page' >
              <Route index element={<Home />} />
              <Route path=':cardId' element={<CardDetail />} />
            </Route>
          </Route>

          {/* <Route path='/home/:page' element={<Home />}> </Route>
          <Route path='/home/:page/:cardId' element={<CardDetail />}> </Route> */}
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
            path='addCard'
            element={
              <ProtectedRoute>
                <AddCard />
              </ProtectedRoute>
            }>
          </Route>

          <Route path='error' element={<Error />}> </Route>
          <Route path='*' element={<Navigate to={`/error`} />}> </Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}
