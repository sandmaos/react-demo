import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AddCard from './pages/AddCard'
import CardDetail from './components/CardDetail'
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
            alert(`Expired At:  ${expireAt}`);
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
    <div>
      <ThemeProvider theme={createTheme({ palette: { mode: 'light' } })}>
        <CssBaseline />
        <Header />
        <Routes>
          {/* <Route path='/' element={<Home />}> </Route> */}
          <Route path='/home/:page' element={<Home />}> </Route>
          <Route path='/home/:page/:cardId' element={<CardDetail />}> </Route>
          <Route path='/signup' element={<SignUp />}> </Route>
          <Route path='/signin' element={<SignIn />}> </Route>
          <Route path='/addCard' element={<AddCard />}> </Route>
          <Route path='/*' element={<Navigate to={`/home/${currPage}`} />}> </Route>
          {/* <Route path='/*' element={<Navigate to="/home" />}> </Route> */}
        </Routes>
      </ThemeProvider>
    </div>
  )
}
