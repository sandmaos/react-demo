import React, { useEffect, useState } from 'react';
import './App.css';
import giftImg from './gift.png'
import giftData from './data'

export default function App() {
  const [giftObj, setGiftObj] = useState(giftData);

  useEffect(() => {
    if (giftObj.length === 0)
      setTimeout(() => {
        setGiftObj(giftData);
      }, 500)
  }, [giftObj])

  function handleOnClick(idx) {
    setGiftObj(preVal => {
      return preVal.flatMap((item, giftIdx) => {
        if (idx === giftIdx) {
          return item.gift.map((obj) =>
            ({ ...obj, scale: !item.scale ? 1 * 0.8 : item.scale > 0.4 ? item.scale * 0.8 : item.scale - item.scale ** 3 })
          )
        }
        else return item
      })
    })
  }

  return (
    <>
      <div className='app'>
        <div>
          {
            giftObj.map((child, idx) =>
              <button style={{ scale: `${child.scale ?? 1}` }} key={idx} onClick={() => handleOnClick(idx)}>
                <img src={giftImg} />
              </button>
            )
          }
        </div>
      </div >
    </>
  )
}
