import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import About from './pages/About'
import Home from './pages/Home'
import Message from "./pages/Home/Message";
import News from './pages/Home/News';
import MyNavLink from './components/MyNavLink';
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
            <MyNavLink to='/home' >Home </MyNavLink>
            <MyNavLink to='/about' >About</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              <Routes>
                <Route path='/home/*' element={<Home />} />
                <Route path='/about' element={<About />} />

                <Route path='/home/news' element={<News />} />
                <Route path='/home/message' element={<Message />} />

                <Route path='*' element={<Navigate to='/home' />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
