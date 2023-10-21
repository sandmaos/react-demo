import {createStore} from 'redux';
import {userReducer} from './reducer';
import thunk from 'redux-thunk'
import { applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const allReducers=combineReducers({
    userReducer
})

export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))