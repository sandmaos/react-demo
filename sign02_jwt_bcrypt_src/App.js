import React from 'react'
import Header from './Header'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Home from './Home'
import { Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Header />
      <hr></hr>
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='/signup' element={<SignUp />}> </Route>
        <Route path='/signin' element={<SignIn />}> </Route>
      </Routes>    
    </div>
  )
}
