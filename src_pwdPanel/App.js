import React, { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const wheel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const password = '1111';
  const [pwd, setPwd] = useState([]);
  const [error, setError] = useState(false);

  const handlePwd = (number) => {
    const copy = [...pwd];
    copy.push(number);
    setPwd(copy);
    // console.log(copy.join(''));
  }

  useEffect(() => {
    if (pwd.length === password.length) {
      if (pwd.join('') !== password)
        setError(true);
      else
        setError(false);
    }
    else
      setError(false);
  }, [pwd])

  return (
    <div className='app'>
      <div className='panel'>
        {
          pwd.join('') + Array(password.length - pwd.length).fill('*').join('')
        }
        {
          error ?
            <div> Wrong password! </div> :
            password.length === pwd.length ?
              <div> Success! </div> : <></>
        }
        <button className='btn-clear' disabled={pwd.length === 0} onClick={() => setPwd([])}>
          clear
        </button>
      </div>
      <div className='number-pad'>
        {
          wheel.map((number, key) =>
            <button disabled={password.length === pwd.length}
              className={'pwd-button ' + (number === 0 ? 'zero' : '')}
              onClick={() => handlePwd(number)} key={key}>
              {number}
            </button>)
        }
      </div>
    </div>
  )
}
