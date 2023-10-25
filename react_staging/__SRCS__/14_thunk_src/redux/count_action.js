import { INCREMENT, DECREMENT } from './constant';
// import store from "./store";

export const createIncrementAction = data =>
    ({ type: INCREMENT, data })

export function createDecrementAction(data) {
    return { type: DECREMENT, data };
}

export function createIncrementAsyncAction(...props) {
    const [data, time]=props;
    return ((dispatch) => {
        setTimeout(() => {
            //thunk
            dispatch(createIncrementAction(data))
        }, time)
    })
}