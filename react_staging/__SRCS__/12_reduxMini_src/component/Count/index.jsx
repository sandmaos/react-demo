import React, { Component } from 'react'
// import { useSelector } from 'react-redux'
import store from '../../redux/store'

export default class Count extends Component {
    // const [count, setCount] = useState(0);
    // const [value, setValue] = useState(1);

    componentDidMount() {
        store.subscribe(() => {
            this.setState({})
        })
    }

    increment = () => {
        const { value } = this.selectNumber;
        store.dispatch({ type: 'increment', data: value * 1 })
        // setCount(count + value * 1);
    }
    decrement = () => {
        const { value } = this.selectNumber;
        store.dispatch({ type: 'decrement', data: value * 1 })
        // setCount(count - value * 1);
    }
    oddIncrement = () => {
        const { value } = this.selectNumber;
        const count = store.getState();
        if (count % 2 !== 0)
            store.dispatch({ type: 'increment', data: value * 1 })

    }
    asyncIncrement = () => {
        const { value } = this.selectNumber;
        setTimeout(() => {
            store.dispatch({ type: 'increment', data: value * 1 })
        }, 500)
    }
    render() {
        return (
            <div>
                <h1>Sum: {store.getState()}</h1>
                <select ref={(c => this.selectNumber = c)} >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select> &nbsp;
                <button onClick={this.increment}>+</button> & nbsp;
                <button onClick={this.decrement}>-</button> & nbsp;
                <button onClick={this.oddIncrement}>odd +</button> & nbsp;
                <button onClick={this.asyncIncrement}>async +</button>
            </div >
        )
    }
}
