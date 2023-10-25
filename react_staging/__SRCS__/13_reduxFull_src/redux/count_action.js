import { INCREMENT, DECREMENT } from './constant';

export const createIncrementAction = data => 
({ type: INCREMENT, data })

export function createDecrementAction(data) {
    return { type: DECREMENT, data };
}
