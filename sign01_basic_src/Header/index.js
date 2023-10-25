import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const userState = useSelector(state => state.userReducer);
  const navigate = useNavigate();

  const uername = userState.username;
  const handleSignIn = () => {
    navigate('signin');
  }
  const handleSignUp = () => {
    navigate('signup');
  }

  return (
    <div>
      <h1>Header</h1>
      {
        uername === '' ?
          <>
            <button onClick={handleSignUp}>SignUp</button>
            <button onClick={handleSignIn}>SignIn</button>
          </>
          : <></>
      }

    </div>
  )
}
