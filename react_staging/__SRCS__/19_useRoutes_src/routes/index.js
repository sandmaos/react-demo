import React from 'react'

import { Navigate } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'

export const routes =[
    {
      path: '/',
      element: <Navigate to={<Home />} />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    },
  ]
