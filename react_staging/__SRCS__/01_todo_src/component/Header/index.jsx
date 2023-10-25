import React from 'react'
import "./index.css"

export default function Header(props) {
  const handleKeyUp=(e)=>{
    if(e.keyCode!==13 || e.target.value.trim()==="")
      return;
    const newTodo={id:Date.now(),name:e.target.value,done:false}
    props.addTodo(newTodo);
    e.target.value='';
  }
  return (
    <div className="todo-header">
      <input onKeyUp={handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
    </div>
  )
}
