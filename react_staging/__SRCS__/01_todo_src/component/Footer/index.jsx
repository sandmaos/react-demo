import React from 'react'
import "./index.css"

export default function Footer(props) {
  const todos = props.todos;
  const total = todos.length;
  const finished = todos.reduce((prev, todo) => ( todo.done ? prev + 1 : prev ), 0)
  const handleCheckAll = (e) => {
    props.checkAll(e.target.checked);
  }
  const handleClearAll = () => {
    props.clearAll();
  }

  return (
    <div className="todo-footer">
      <label>
        <input type="checkbox" onChange={handleCheckAll} checked={total === finished && total!==0 ? true : false} />
      </label>
      <span>
        <span>已完成{finished}</span> / 全部{total}
      </span>
      <button className="btn btn-danger" onClick={handleClearAll}>清除已完成任务</button>
    </div>
  )
}
