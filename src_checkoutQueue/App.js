import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [item, setItem] = useState(1);
  const [checkoutQueue, setCheckoutQueue] = useState([[4, 7, 3, 2], [12, 2, 6], [9], [3, 11], [7]]);

  const handleClick = () => {
    if (item < 1)
      return setItem(1);
    const copyQueue = [...checkoutQueue];
    let index = 0;
    let minTotal = Math.min(); //infinite
    for (let idx = 0; idx < copyQueue.length; ++idx) {
      const total = copyQueue[idx].reduce((acc, item) => (acc + item), 0);
      index = total < minTotal ? idx : index;
      minTotal = Math.min(minTotal, total);
    }
    copyQueue[index].push(item);
    setCheckoutQueue(copyQueue);
  }

  useEffect(() => {
    const timeId = setInterval(() => {
      setCheckoutQueue(prevQueue =>
        prevQueue.map((queue) =>
          [queue[0] - 1, ...queue.slice(1)].filter(item => item > 0)
        )
        // prevQueue.map((item) => {
        //   if (item.length !== 0) {
        //     if (item[0] > 1) item[0]--;
        //     else item.shift();
        //   }
        //   return item;
        // })
      )
    }, 1000);
    return () => {
      clearInterval(timeId);
    }
  }, [])

  return (
    <>
      <div className="app">
        <h3>Checkout Queue</h3>
        <div className='checkout'>
          <input value={item} onChange={(e) => setItem(e.target.value)} />
          <button onClick={handleClick}>Checkout</button>
        </div>
        <div className='checkout-box'>
          {
            checkoutQueue.map((queue, queueIdx) =>
              <div key={queueIdx} className='item'>
                {
                  queue.map((item, itemIdx) =>
                    <div key={itemIdx}>{item}</div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;