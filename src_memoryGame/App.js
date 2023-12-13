import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

export default function App() {
  const length = 16;
  const halfArray = Array(length / 2).fill().map((_, idx) => idx + 1);
  const array = [...halfArray, ...halfArray];
  const [myArray, setMyArray] = useState([]);
  const [revealed, setRevealed] = useState([false]);
  const [prevIdx, setPrevIdx] = useState(-1);

  const initial = () => {
    setMyArray(
      [...array].sort(() => Math.random() - 0.5)
    );
    setRevealed(Array(length).fill(false));
  }

  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const handleClick = async (idx) => {
    const revealedCopy = [...revealed];
    revealedCopy[idx] = true;
    setRevealed(revealedCopy);
    setTimeout(() => {
      let prevIdxCopy = prevIdx; //issue
      if (prevIdxCopy === -1) {
        revealedCopy[idx] = true;
        prevIdxCopy = idx;
      }
      else if (myArray[prevIdxCopy] === myArray[idx]) {
        revealedCopy[idx] = true;
        prevIdxCopy = -1;
      }
      else {
        revealedCopy[prevIdxCopy] = false;
        revealedCopy[idx] = false;
        prevIdxCopy = -1;
      }
      setRevealed(revealedCopy);
      setPrevIdx(prevIdxCopy);

      if (revealedCopy.every(ele => ele === true)) {
        alert('Success');
        initial();
      }
    }, 300);
  }

  useEffect(() => {
    initial();
  }, [])


  return (
    <>
      <div className='app'>
        <h3>Memory Game</h3>
        <div className='grid'>
          {
            myArray.map((number, idx) =>
              <button disabled={revealed[idx]} className='item' key={idx} onClick={() => handleClick(idx)}>
                {revealed[idx] ? number : '*'}
              </button>
            )
          }
        </div>
      </div>
    </>
  )
}
