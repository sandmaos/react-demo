import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './userSlice';
import { cardReducer } from './cardSlice';
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import storage from 'redux-persist/lib/storage';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const rootReducers = combineReducers({
    userReducer,
    cardReducer
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    },
    applyMiddleware(thunk)
);
const persistor = persistStore(store);
export { store, persistor };

// export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
// export const persistor = persistStore(store);