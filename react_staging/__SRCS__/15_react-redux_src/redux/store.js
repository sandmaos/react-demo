import { createStore, applyMiddleware } from 'redux';
import countReducer from "./count_reducer";
import thunk from 'redux-thunk';

const store = createStore(countReducer,applyMiddleware(thunk));

// import { configureStore } from '@reduxjs/toolkit';
// const store = configureStore({
//     reducer:{
//         countReducer
//     }
// });

export default store;