import React, { useState } from 'react'

export default function Count() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(1);
    const increment = () => {
        setCount(count + value * 1);
    }
    const decrement = () => {
        setCount(count - value * 1);
    }
    const oddIncrement = () => {
        if (count % 2 !== 0)
            setCount(count + value * 1);
    }
    const asyncIncrement = () => {
        setTimeout(() => {
            setCount(count + value * 1);
        }, 500)
    }

    return (
        <div>
            <h1>Sum: {count}</h1>
            <select onChange={(e) => { setValue(e.target.value) }}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select> &nbsp;
            <button onClick={increment}>+</button>&nbsp;
            <button onClick={decrement}>-</button>&nbsp;
            <button onClick={oddIncrement}>odd +</button>&nbsp;
            <button onClick={asyncIncrement}>async +</button>
        </div>
    )
}
