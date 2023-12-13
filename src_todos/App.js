import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid, Input, Button } from '@mui/material';
import Todo from './Todo';

export default function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const count = todos.length;
    if (count !== 0) {
      const check = todos.reduce((preVal, todo) => {
        return preVal + (todo.done ? 1 : 0);
      }, 0)
      setAllChecked(check === count ? true : false);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos])

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    })
    setTodos(newTodos);
  }

  const handleFinish = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done }
      }
      return todo;
    })
    setTodos(newTodos);
  }

  const handleAllCheck = () => {
    const checked = !allChecked;
    setAllChecked(checked);
    const newTodos = todos.map((todo) => {
      return { ...todo, done: checked }
    });
    setTodos(newTodos);
  }

  const handleDeleteAllChecked = () => {
    const newTodos = todos.filter((todo) => {
      return todo.done === false;
    })
    setTodos(newTodos);
    setAllChecked(false);
  }

  const handleAdd = () => {
    if (newTodo === '')
      return
    const id = Date.now();
    const myTodo = { id, name: newTodo, done: false };
    const newTodos = [...todos];
    newTodos.push(myTodo);
    setTodos(newTodos)
    setNewTodo('');
  }

  return (
    <>
      <Container
        sx={{ padding: '10px' }}
      >
        <Paper sx={{
          boxShadow: 3,
          padding: '10px',
        }}>
          <Grid item xs={4} textAlign='center'>
            <Typography variant="h5" component="h1">
              Todo List
            </Typography>
          </Grid>
        </Paper>

        <Paper sx={{
          boxShadow: 3,
          marginTop: 1,
          padding: '10px',
        }}>
          <Grid container item alignItems='center'>
            <Grid item xs={4}></Grid>
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add" />
            <Button
              variant="contained"
              onClick={handleAdd}>Add</Button>
          </Grid>
          {
            todos.map((item) =>
              <div key={item.id}>
                <Todo {...item} handleFinish={handleFinish} handleDelete={handleDelete} />
              </div>
            )
          }
          <input
            type='checkbox'
            checked={allChecked}
            onChange={handleAllCheck}
          /> check all
          <button onClick={handleDeleteAllChecked}>delete all checked</button>
        </Paper>
      </Container >
    </>
  )
}