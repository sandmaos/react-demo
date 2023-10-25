import { INCREMENT, DECREMENT } from './constant'

const initState = 0;
function countReducer(preState = initState, action) {
    // preState === undefined ? 0 : preState;
    const { type, data } = action;
    switch (type) {
        case INCREMENT:
            return preState + data;
        case DECREMENT:
            return preState - data;
        default:
            return preState;
    }
}
export default countReducer;