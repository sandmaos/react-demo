import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Sum=5:to about</div>
      {count === 5 ? <Navigate to={'/about'} /> : <h2>Sum: {count}</h2>}
      <button onClick={() => { setCount(count + 1) }}>add</button>

    </>
  )
}