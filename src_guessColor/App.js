import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

export default function App() {
  const colorList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  const [myColor, setMyColor] = useState('');
  const [colors, setColors] = useState([]);

  const getColor = () => {
    const color = Array(6).fill().map(() => {
      return colorList[Math.floor(Math.random() * colorList.length)]
    });
    return '#' + color.join('');
  }

  // const initialColors = (myColor = myColor) => {
  //   return (
  //     [myColor, getColor(), getColor()].sort(
  //       () => Math.random() - 0.5
  //     )
  //   )
  // }

  const handleChoose = (idx) => {
    if (colors[idx] === myColor) {
      alert('success');
      initial();
    }
    else alert('wrong')
  }

  const initial = () => {
    const color = getColor();
    setMyColor(color);
    const colorList = [color, getColor(), getColor()].sort(
      () => Math.random() - 0.5
    );
    setColors(colorList);
  }

  useEffect(() => {
    initial();
  }, [])

  return (
    <>
      <div className='app'>
        <h3> Guess Color </h3>
        <div className='color-panel' style={{ background: myColor }}></div>
        <div className='button-group'>
          {
            colors.map((color, idx) =>
              <button key={idx} onClick={() => handleChoose(idx)}>
                {color}
              </button>
            )
          }
        </div>
      </div>
    </>
  )
}
