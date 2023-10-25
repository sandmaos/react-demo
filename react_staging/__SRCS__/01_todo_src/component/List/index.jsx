import Item from "../Item";
import React from 'react'
import "./index.css"

export default function List(props) {
  const todos = props.todos;
  return (
    <>
      <ul className="todo-main">
        {
          todos.map((todo) => {
            return <Item key={todo.id} 
            todo={todo} 
            handleDelete={props.handleDelete}
            handleCheck={props.handleCheck}/>
          })
        }
      </ul>
    </>
  )
}
