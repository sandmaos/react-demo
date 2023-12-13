import React from 'react';
import TodoList from './TodoList.js';
import AddTodo from './AddTodo.js';

import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;