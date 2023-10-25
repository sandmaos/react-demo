import React, { useState } from 'react'
import "./index.css"

export default function Item(props) {
  const todo = props.todo;
  const [mouse, setMouse] = useState(false);
  const handleClick=()=>{
    if(window.confirm("Are you sure?"))
      props.handleDelete(todo.id);
  }

  const handleCheckTodo=()=>{
    props.handleCheck(todo.id);
  }

  return (
    <div>
      <li style={{ backgroundColor: mouse === false ? '#fff' : '#ddd' }} onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
        <label>
          <input type="checkbox" checked={todo.done} onChange={handleCheckTodo} />
          <span>{todo.name}</span>
        </label>
        <button className="btn btn-danger" style={{ display: mouse ? "block" : "none" }} onClick={handleClick}>删除</button>
      </li>
    </div>
  )
}
