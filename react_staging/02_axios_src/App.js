import React from 'react'
import axios from 'axios'

export default function App() {
  const getData=()=>{
    axios.get('http://localhost:3000/api/students').then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div>
      <button onClick={getData}>click </button>
    </div>
  )
}
