import React from 'react';
import { NavLink,useRoutes } from 'react-router-dom'
import Header from './components/Header'
import {routes} from './routes'

function App() {
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            <NavLink className={'list-group-item'} to="/home">Home</NavLink>
            <NavLink className={'list-group-item'} to="/about">About</NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {useRoutes(routes)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
