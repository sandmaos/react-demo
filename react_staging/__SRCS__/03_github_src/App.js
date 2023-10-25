import React,{useState} from 'react';
import Search from './component/Search'
import List from './component/List'

export default function App() {
  // const [users,setUsers]=useState([]);
  // const setAllUsers=(users)=>{
  //   setUsers(users);
  // }

  const [states,setStates]=useState({
    users:[],
    isFirst:true,
    isLoading:false,
    error:''
  })
  const setAllStates=(statesObj)=>{
    setStates((states)=> {
      return {...states, ...statesObj}
    });
  }

  return (
    <div className="container">
      <Search setAllStates={setAllStates}/>
      <List states={states}/>
    </div>
  )
}
