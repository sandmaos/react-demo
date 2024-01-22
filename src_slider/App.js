import React from 'react';
import './App.css';
import Slider from './Slider';

export default function App() {
  const imgList = Array(5).fill();

  const containerStyle = {
    transform: 'translateY(10%)',
    width: '600px',
    height: '600px',
    margin: '0 auto'
  }
  return (
    <div style={containerStyle}>
      <Slider imgList={imgList}/>
    </div>
  )
}
