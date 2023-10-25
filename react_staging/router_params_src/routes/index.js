import React from 'react'

import { Navigate } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Message/Detail'

export const routes = [
  {
    path: '/',
    element: <Navigate to={<Home />} />
  },

  {
    path: '/home/*',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />,
        children:[
          {
            path:'detail/:id/:title/:content',
            element: <Detail />,
          }
        ]
      },
    ]
  },

  {
    path: '/about',
    element: <About />
  },

]
