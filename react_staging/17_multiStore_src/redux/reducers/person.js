import { ADD_PERSON } from '../constant'

const initState = [{ id: '001', name: 'jay', age: 20 }];
function personReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case ADD_PERSON:{
            // return { data, ...preState };
            return  [data, ...preState] ;
        }
            
        default:
            return preState;
    }
}
export default personReducer;