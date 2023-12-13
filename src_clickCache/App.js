import React from 'react'
import { useState } from 'react'
import './App.css'

export default function App() {
  const [points, setPoints] = useState([]);
  const [stack, setStack] = useState([]);

  const handleClick = (e) => {
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      { x: clientX, y: clientY }
    ]);
  }

  const handleUndo = () => {
    const newPoints = [...points];
    const temp = newPoints.pop();
    setPoints(newPoints);
    setStack([
      ...stack,
      temp,
    ])
  }

  const handleRedo = () => {
    const newPoints = [...stack];
    const temp = newPoints.pop();
    setStack(newPoints);
    setPoints([
      ...points,
      temp,
    ])
  }

  return (
    <>
      <button disabled={points.length === 0} onClick={handleUndo}>
        Undo
      </button>
      <button disabled={stack.length === 0} onClick={handleRedo}>
        Redo
      </button>
      &nbsp;
      <button disabled={points.length === 0 && stack.length === 0}
        onClick={() => {
          setPoints([]);
          setStack([]);
        }}>
        Clear
      </button>
      <div>
        points:{points.length}  stack:{stack.length}
      </div>
      <div className='App' onClick={handleClick}>
        {
          points.map((point, idx) =>
            <span className='point' key={idx} style={{ left: point.x - 5 + 'px', top: point.y - 10 + 'px' }}>
              o
            </span>
          )
        }
      </div>
    </>
  )
}
