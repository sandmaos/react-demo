import { createStore, applyMiddleware, combineReducers } from 'redux';
import countReducer from "./reducers/count";
import personReducer from "./reducers/person";

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension'

const allReducer = combineReducers({
    COUNT: countReducer,
    PERSONS: personReducer
})
const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore(allReducer, applyMiddleware(thunk));


// import { configureStore } from '@reduxjs/toolkit';
// const store = configureStore({
//     reducer:{
//         countReducer
//     }
// });

export default store;