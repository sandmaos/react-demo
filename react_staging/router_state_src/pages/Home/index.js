import React from 'react';
import { useRoutes, NavLink, Outlet } from 'react-router-dom';
import { routes } from '../../routes';

export default function Home() {
  return (
    <>
      <div>
        <h2>Home组件内容</h2>
        <ul className="nav nav-tabs">
          <li>
            <NavLink className={'list-group-item'} to="/home/news">News</NavLink>
          </li>
          <li>
            <NavLink className={'list-group-item'} to="/home/message">Message</NavLink>
          </li>
        </ul>
        {useRoutes(routes)}
        <Outlet />
      </div>
    </>
  )
}