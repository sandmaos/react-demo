import {createStore} from 'redux';
import {userReducer} from './userSlice';
import {cardReducer} from './cardSlice';
import thunk from 'redux-thunk'
import { applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const allReducers=combineReducers({
    userReducer,
    cardReducer
})

export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))