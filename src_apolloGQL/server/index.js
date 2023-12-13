const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const cors = require('cors');

// Define your GraphQL schema
const schema = buildSchema(`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(text: String!): Todo
  }
`);

// Dummy data for demonstration
const todos = [
    { id: '1', text: 'Learn GraphQL', completed: false },
    { id: '2', text: 'Build a GraphQL server', completed: true },
];

// Define resolver functions
const root = {
    todos: () => todos,
    addTodo: ({ text }) => {
        const newTodo = { id: String(todos.length + 1), text, completed: false };
        todos.push(newTodo);
        return newTodo;
    },
};

// Create an Express server
const app = express();

// Set up the GraphQL endpoint
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true, // Enable GraphiQL for easy testing
    })
);

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`GraphQL server running at http://localhost:${port}/graphql`);
});
