import { createStore, combineReducers } from 'redux';
import { addReducer, multiReducer } from './reducer'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const allReducer = combineReducers({
    addReducer: addReducer,
    multiReducer: multiReducer
})

export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))

