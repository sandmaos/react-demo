// src/components/AddTodo.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const GET_TODOS = gql`
  query {
    todos {
      id
      text
      completed
    }
  }
`;

const AddTodo =  () => {
  const [text, setText] = useState('');
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const handleAddTodo = () => {
    addTodo({
      variables: { text },
    });
    setText('');
  };

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
