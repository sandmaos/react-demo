import React from 'react'

export default function App() {
  const handleClick = async () => {
    try {
      const returnedNum = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const num = Math.floor(Math.random() * 100) + 1;
          if (num % 2 !== 0) {
            resolve(num);
          } else {
            reject(num);
          }
        }, 500);
      });
      console.log('success', returnedNum);
      console.log(returnedNum)
    } catch (error) {
      console.log('failed', error)
    }
  }

  return (
    <div>
      <p>Get Odd Number</p>
      <button onClick={handleClick}>Draw</button>
    </div>
  )
}