import React, { useState } from 'react'
import { createAddAction, createMultiAction } from './action'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const App = () => {
  const [val, setVal] = useState(2);
  const addState = useSelector(state => state.addReducer);
  const multiState = useSelector(state => state.multiReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOption = (e) => {
    setVal(() => parseInt(e.target.value), 10);
  }
  const handleAddClick = () => {
    dispatch(createAddAction(val));
    navigate('/show')
  }
  const handleMultiClick = () => {
    dispatch(createMultiAction(val));
    navigate('/show')
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
    </div>
  )
}

export default App;