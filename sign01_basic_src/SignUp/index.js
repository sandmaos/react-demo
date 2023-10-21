import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export default function App() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    pwd: ''
  })

  const handleChange = (e) => {
    const {name,value}= e.target
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/register',formData)
      .then((msg) => {
        console.log(1,msg);
      })
      .then(()=>{
        navigate('/')
      })
      .catch((err) => {
        console.log(2,err);
      })
  }

  return (
    <div>
      <p>Sign Up</p>
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

        <p>pwd confirm:</p>
        <input name='pwd'
          value={formData.pwd}
          onChange={handleChange}>
        </input>

        <button onClick={handleSubmit}> submit</button>
      </form>
    </div>
  )
}
