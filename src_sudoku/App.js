import React, { useState } from 'react'
import './App.css';

export default function App() {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('.')));
  const handleOnChange = (e, row, col) => {
    let { value } = e.target;
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
  }

  const handleSolve = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/sudoku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: grid }),
      });
      if (response.ok) {
        const result = await response.json();
        setGrid(result);
      }
      else {
        const error = await response.text();
        alert(error);
        handleClear();
      }
    } catch (err) {
      console.log(err);
    }

  }

  const handleClear = () => {
    const grid = Array(9).fill().map(() => Array(9).fill('.'));
    setGrid(grid);
  }

  return (
    <>
      <div className='app'>
        <h2>Sudoku</h2>
        <div className='grid'>
          {
            grid.map((row, rowIdx) =>
              <div key={rowIdx} className='row'>
                {
                  row.map((number, colIdx) =>
                    <div key={colIdx} className='column'>
                      <input onChange={(e) => handleOnChange(e, rowIdx, colIdx)} value={number} className='num-input' />
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
        <div className='handle-group'>
          <button onClick={handleSolve}>Solve</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </>
  )
}
