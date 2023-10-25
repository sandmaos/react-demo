import React from 'react'

export default function App() {

  setTimeout(() => {  // macro task
    console.log(1);
  }, 0); 

  new Promise((resolve, _) => {  // micro task
    console.log(5);
    resolve();
  })
    .then(() => console.log(3))
    .then(() => console.log(4))

  console.log(2);   // sync task

  const handleClick = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const num = Math.floor(Math.random() * 100) + 1;
        if (num % 2 !== 0) {
          resolve(num);
        } else {
          reject(num);
        }
      }, 500);
    });

    promise
      .then((num) => {
        console.log('success', num);
        return 'Congrats!';
      })
      .then((msg) => console.log(msg))
      .catch((num) => console.log('failed', num))
  }

  return (
    <div>
      <p>Get Odd Number</p>
      <button onClick={handleClick}>Draw</button>
    </div>
  )
}