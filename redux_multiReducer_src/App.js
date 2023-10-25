import React, { useState } from 'react'
import { createAddAction, createMultiAction } from './action'
import { useDispatch, useSelector } from "react-redux"

const App = () => {
  const [val, setVal] = useState(2);
  const addState = useSelector(state => state.addReducer);
  const multiState = useSelector(state => state.multiReducer);
  const dispatch = useDispatch();

  const handleOption = (e) => {
    setVal(() => parseInt(e.target.value), 10);
  }
  const handleAddClick = () => {
    dispatch(createAddAction(val));
  }
  const handleMultiClick = () => {
    dispatch(createMultiAction(val));
  }

  return (
    <div>
      <select value={val} onChange={handleOption}>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      &nbsp;
      <button onClick={handleAddClick}>add</button>
      &nbsp;
      <button onClick={handleMultiClick}>multi</button>
      <p>Add: {addState.addVal}</p>
      <p>Multi: {multiState.multiVal}</p>
    </div>
  )
}

export default App;