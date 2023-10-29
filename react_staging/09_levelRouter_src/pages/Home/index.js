import React from 'react';
import {Outlet, Routes, Route} from "react-router-dom"
import Message from "./Message";
import News from './News';
import MyNavLink from '../../components/MyNavLink';

export default function Home() {
  return (
    <div>
      <h2>Home组件内容</h2>
      <ul className="nav nav-tabs">
        <li>
          <MyNavLink to="/home/news">News</MyNavLink>
        </li>
        <li>
          <MyNavLink to="/home/message">Message</MyNavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/home/news" element={<News />} ></Route>
      </Routes>
      <Outlet />
    </div>
  )
}    
