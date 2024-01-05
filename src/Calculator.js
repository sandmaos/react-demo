import { useReducer } from 'react';
import './Calculator.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    DELETE_DIGIT: 'delete-digit',
    CHOOSE_OPERATION: 'choose-operation',
    EVALUATE: 'evaluate',
    CLEAR: 'clear',
}

function evaluate({ currentOperand, previousOperand, operation }) {
    const preVal = parseFloat(previousOperand);
    const currVal = parseFloat(currentOperand);
    if (isNaN(preVal) || isNaN(currVal)) return ''
    switch (operation) {
        case '+':
            return (preVal + currVal).toString();
        case '-':
            return (preVal - currVal).toString();
        case '*':
            return (preVal * currVal).toString();
        case '÷':
            return (preVal / currVal).toString();
    }
}
// const initialState={
//     previousOperand:null,
//     currentOperand:null,
//     operation:null,
//     overwrite:false
// }

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite === true) return { ...state, overwrite: false, currentOperand: payload.digit }
            if (payload.digit === '0' && state.currentOperand === '0') return state;
            if (payload.digit === '.' && state.currentOperand?.includes('.')) return state;
            if (state.currentOperand?.length > 0 && state.currentOperand.charAt(0) === '0' && !state.currentOperand.includes('0.') && payload.digit !== '.')
                return { ...state, currentOperand: payload.digit }
            return { ...state, currentOperand: (state.currentOperand || '') + payload.digit };

        case ACTIONS.CHOOSE_OPERATION:
            if (state.previousOperand == null && state.currentOperand == null)
                return state;
            if (state.previousOperand == null)
                return { ...state, operation: payload.operation, previousOperand: state.currentOperand, currentOperand: null }
            if (state.operation !== null)
                return { ...state, operation: payload.operation }
            return { ...state, operation: payload.operation, previousOperand: evaluate(state), currentOperand: null }

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite === true)
                return { ...state, overwrite: false, currentOperand: null }
            if (state.currentOperand == null)
                return state;
            if (state.currentOperand.length === 1)
                return { ...state, currentOperand: null }
            return { ...state, currentOperand: state.currentOperand.slice(0, -1) }

        case ACTIONS.EVALUATE:
            if (state.previousOperand == null || state.currentOperand == null || state.operation == null)
                return state
            return { ...state, overwrite: true, operation: null, currentOperand: evaluate(state), previousOperand: null };

        case ACTIONS.CLEAR:
            return {}
    }
}

export default function Calculator() {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

    const integer_formater = new Intl.NumberFormat("en-us", {
        maximumFractionDigits: 0,
    })

    function formatOperand(operand) {
        if (operand == null) return;
        const [integer, decimal] = operand.split('.');
        if (decimal == null)
            return integer_formater.format(integer);
        return `${integer_formater.format(integer)}.${decimal}`
    }

    return (
        <>
            <div className='calculator-grid'>
                <div className='output'>
                    <div className='previous-output'>{formatOperand(previousOperand)} {operation}</div>
                    <div className='current-output'>{formatOperand(currentOperand)}</div>
                </div>
                <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
                <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
                <OperationButton operation={'÷'} dispatch={dispatch} />
                <DigitButton digit={'1'} dispatch={dispatch} />
                <DigitButton digit={'2'} dispatch={dispatch} />
                <DigitButton digit={'3'} dispatch={dispatch} />
                <OperationButton operation={'*'} dispatch={dispatch} />
                <DigitButton digit={'4'} dispatch={dispatch} />
                <DigitButton digit={'5'} dispatch={dispatch} />
                <DigitButton digit={'6'} dispatch={dispatch} />
                <OperationButton operation={'+'} dispatch={dispatch} />
                <DigitButton digit={'7'} dispatch={dispatch} />
                <DigitButton digit={'8'} dispatch={dispatch} />
                <DigitButton digit={'9'} dispatch={dispatch} />
                <OperationButton operation={'-'} dispatch={dispatch} />
                <DigitButton digit={'.'} dispatch={dispatch} />
                <DigitButton digit={'0'} dispatch={dispatch} />
                <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            </div >
        </>
    )
}
