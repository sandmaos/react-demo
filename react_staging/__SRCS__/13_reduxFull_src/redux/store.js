import { createStore } from 'redux';
import countReducer from "./count_reducer";

const store = createStore(countReducer);

// import { configureStore } from '@reduxjs/toolkit';
// const store = configureStore({
//     reducer:{
//         countReducer
//     }
// });

export default store;