// src/components/TodoList.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query {
    todos {
      id
      text
      completed
    }
  }
`;

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
