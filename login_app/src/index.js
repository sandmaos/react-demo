import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from "./router"
//npm install --save redux react-redux
//npm install --save-dev redux-devtools-extension

import {Provider} from "react-redux"
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <AppRouter/>
    </Provider>
 
);
