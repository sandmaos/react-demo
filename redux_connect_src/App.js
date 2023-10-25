import React, { useState } from 'react'
import { createAddAction } from './action'
import { connect } from "react-redux"

const App = (props) => {
  const [val, setVal] = useState(1);

  const handleOption = (e) => {
    setVal(() => parseInt(e.target.value), 10);
  }
  const handleClick = () => {
    props.addNumber(val);
  }
  return (
    <div>
      <select value={val} onChange={handleOption}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={handleClick}>add</button>
      <p>state: {props.state}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({ state })
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (data) => { dispatch(createAddAction(data)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
