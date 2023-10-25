import React from 'react'
// import Count from "./component/Count";
import Count from "./containers/Count";
import Person from './containers/Person';
// import store from "./redux/store.js"

export default function App() {
  return (
    <div>
      <Count />
      <hr />
      <Person />
    </div>
  )
}
