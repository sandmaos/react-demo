import React, { useState, useRef } from 'react'

export default function App() {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const myRef = useRef()

  const handleStart = () => {
    clearInterval(intervalId);
    const id = setInterval(() => {
      setCount(count => count + 1)
    }, 500);
    setIntervalId(id);
  }

  const handlePause = () => {
    clearInterval(intervalId);
  }

  const handleStop = () => {
    clearInterval(intervalId);
    setCount(0);
  }

  const handleAlert = () => {
    alert(myRef.current.value)
  }

  return (
    <>
      <div>
        <input type='text' ref={myRef}></input>
      </div>
      <button onClick={handleStart}>start</button>
      <button onClick={handlePause}>pause</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleAlert}>alert</button>
      <p> {count} </p>
    </>
  )
}