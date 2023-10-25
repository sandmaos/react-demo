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

  return (
    <div>
      <p>Add: {addState.addVal}</p>
      <p>Multi: {multiState.multiVal}</p>
      <button onClick={() => navigate('/add')}>to add</button>
    </div>
  )
}

export default App;