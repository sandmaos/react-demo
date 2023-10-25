import {createStore} from 'redux';
import {reducer} from './reducer'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

