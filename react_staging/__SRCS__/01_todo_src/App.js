import React, { useState } from 'react';
import Header from './component/Header';
import List from './component/List';
import Footer from './component/Footer';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    // localStorage.getItem("todos") || []
    { id: '001', name: 'eat', done: true },
    { id: '002', name: 'sleep', done: true },
    { id: '003', name: 'play', done: false },
  ]);
  const handleDelete = (id) => {
    const todoCopy = todos.filter(item => item.id !== id);
    setTodos(todoCopy);
  }
  const handleCheck = (id) => {
    const todoCopy = todos.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done }
      }
      else return item;
    })
    setTodos(todoCopy);
  }
  const addTodo = (newTodo) => {
    const todoCopy = [...todos, newTodo];
    setTodos(todoCopy);
    // console.log(todos);
    // localStorage.setItem('todos',todos)
  }
  const checkAll = (flag) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        return { ...todo, done: flag };
      });
    });
  }

  const clearAll = () => {
    setTodos((todos) => {
      return todos.filter((todo) => { return !todo.done })
    });
  }

  return (
    <div className="App">
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={addTodo} />
          <List todos={todos}
            handleDelete={handleDelete}
            handleCheck={handleCheck} />
          <Footer todos={todos} checkAll={checkAll} clearAll={clearAll} />
        </div>
      </div>
    </div>
  );
}

export default App;