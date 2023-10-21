import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    pwd: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/signin', formData)
      .then((msg) => {
        if (msg.data.flag)
          console.log(msg.data.message);
        else throw (msg.data.message);
      })
      .then(() => {
        localStorage.setItem('username', formData.username);
        dispatch({ type: 'signin', data: formData.username })
        navigate('/')
      })
      .catch((err) => {
        alert(`sign in failed: ${err}`);
      })
  }

  return (
    <div>
      <p>Sign In</p>
      <form type='submit'>
        <p>username:</p>
        <input name='username'
          value={formData.username}
          onChange={handleChange}>
        </input>

        <p>pwd:</p>
        <input name='pwd'
          value={formData.pwd}
          onChange={handleChange}>
        </input>

        <button onClick={handleSubmit}> submit</button>
      </form>
    </div>
  )
}
