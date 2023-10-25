import { connect } from 'react-redux'
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/actions/count'

import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import store from '../../redux/store'

function Count(props) {
    const [selectNumber, setSelectNumber] = useState(1);

    const increment = () => {
        props.addNumber(selectNumber * 1)
        // setCount(count + value * 1);
    }
    const decrement = () => {
        props.subNumber(selectNumber * 1)
        // setCount(count - value * 1);
    }
    const oddIncrement = () => {
        if(props.state%2!==0)
            props.addNumber(selectNumber * 1)
    }

    const asyncIncrement = () => {
        props.addAsyncNumber(selectNumber * 1, 500)

    }

    return (
        <div>
            <h1>Sum: {props.state} Persons: {props.test}</h1>
            <select value={selectNumber} onChange={(e) => { setSelectNumber(e.target.value) }} >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select> &nbsp;
            <button onClick={increment}>+</button> &nbsp;
            <button onClick={decrement}>-</button> &nbsp;
            <button onClick={oddIncrement}>odd +</button> &nbsp;
            <button onClick={asyncIncrement}>async +</button>
        </div >
    )
}


function mapStateToProps(state) {
    return ({ state:state.COUNT, test:state.PERSONS.length})
}

function mapDispatchToProps(dispatch) {
    return {
        addNumber: (data) => {
            dispatch(createIncrementAction(data))
        },
        subNumber: (data) => {
            dispatch(createDecrementAction(data))
        },
        addAsyncNumber: (data, time) => {
            dispatch(createIncrementAsyncAction(data, time))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count);
