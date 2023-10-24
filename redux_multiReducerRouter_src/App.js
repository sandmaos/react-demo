import React from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import Adder from './Adder';
import Show from './Show';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Show></Show>}></Route>
        <Route path='/show' element={<Show></Show>}></Route>
        <Route path='/add' element={<Adder></Adder>}></Route>
      </Routes>
    </>
  )
}
