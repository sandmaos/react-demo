import React, { useState } from 'react'
import { NavLink,Outlet } from 'react-router-dom'

export default function Message() {
  const [messages] = useState([
    { id: '001', title: 'msg1', content: 'hamas1' },
    { id: '002', title: 'msg2', content: 'hamas2' },
    { id: '003', title: 'msg3', content: 'hamas3' }
  ])
  return (
    <div>
      <ul>
        {
          messages.map((msg) => {
            return (
              <li key={msg.id}>
                <NavLink to={`detail/${msg.id}/${msg.title}/${msg.content}`}>{msg.title}</NavLink>
              </li>
            )
          })
        }
        <hr/>
      </ul>
      <Outlet />
    </div>
  )
}
