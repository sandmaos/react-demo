import React, { Component } from 'react'
// import { useSelector } from 'react-redux'
import store from '../../redux/store'

export default class Count extends Component {

    increment = () => {
        const { value } = this.selectNumber;
        this.props.addNumber(value * 1)
        // setCount(count + value * 1);
    }
    decrement = () => {
        const { value } = this.selectNumber;
        this.props.subNumber(value * 1)
        // setCount(count - value * 1);
    }
    oddIncrement = () => {
        const { value } = this.selectNumber;
        if (this.props.state % 2 !== 0) {
            this.props.addNumber(value * 1)
        }

    }
    asyncIncrement = () => {
        const { value } = this.selectNumber;
        this.props.addAsyncNumber(value * 1, 500)

    }
    render() {
        return (
            <div>
                <h1>Sum: {this.props.state}</h1>
                <select ref={(c => this.selectNumber = c)} >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select> &nbsp;
                <button onClick={this.increment}>+</button> &nbsp;
                <button onClick={this.decrement}>-</button> &nbsp;
                <button onClick={this.oddIncrement}>odd +</button> &nbsp;
                <button onClick={this.asyncIncrement}>async +</button>
            </div >
        )
    }
}
