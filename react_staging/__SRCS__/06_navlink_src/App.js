import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import About from './pages/About'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <Header/>
        </div>
      </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <NavLink activeClassName='myActive' className='list-group-item' to="/home">Home</NavLink>
              <NavLink activeClassName='myActive' className='list-group-item' to="/about">About</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                <Routes>
                  <Route path='/home' element={<Home />}></Route>
                  <Route path='/about' element={<About />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App;
