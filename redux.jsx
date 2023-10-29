import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Input } from "antd";
import { Provider, connect, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import "./hw1.css";

const {
  configureStore,
  createReducer,
  createAction,
  createSlice,
} = require("@reduxjs/toolkit");

const initialState = [
  { id: 0, value: "todo1", done: false },
  { id: 1, value: "todo2", done: true },
];

// Newer way createReducer
// const AddTodo = createAction("AddTodo");
// const ToggleTodo = createAction("ToggleTodo");
// const ToggleAllTodo = createAction("ToggleAllTodo");
// const ClearCompletedTodos = createAction("ClearCompletedTodos");

// Recent way createSlice
const todoSlice = createSlice({
  name: "todor",
  initialState,
  reducers: {
    AddTodo: (state, action) => {
      state.push({
        id: action.payload.id,
        value: action.payload.value,
        done: action.payload.done,
      });
    },
    ToggleTodo: (state, action) => {
      state[action.payload.id] = {
        id: state[action.payload.id].id,
        value: state[action.payload.id].value,
        done: !state[action.payload.id].done,
      };
    },
    ToggleAllTodo: (state) => {
      let checked = state.every((todo) => todo.done === true);
      state.forEach((todo) => {
        todo.done = !checked;
      });
    },
    ClearCompletedTodos: (state) => {
      for (let i = state.length - 1; i >= 0; i--) {
        if (state[i].done === true) state.splice(i, 1);
      }
      for (let i = 0; i < state.length; i++) {
        state[i].id = i;
      }
    },
  },
});
const { AddTodo, ToggleTodo, ToggleAllTodo, ClearCompletedTodos } =
  todoSlice.actions;

// Newer way createReducer
// const todoReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(AddTodo, (state, action) => {
//       state.push({ id: action.id, value: action.value, done: action.done });
//     })
//     .addCase(ToggleTodo, (state, action) => {
//       state[action.id] = {
//         id: state[action.id].id,
//         value: state[action.id].value,
//         done: !state[action.id].done,
//       };
//     })
//     .addCase(ToggleAllTodo, (state) => {
//       let checked = state.every((todo) => todo.done === true);
//       state.forEach((todo) => {
//         todo.done = !checked;
//       });
//     })
//     .addCase(ClearCompletedTodos, (state) => {
//       for (let i = state.length - 1; i >= 0; i--) {
//         if (state[i].done === true) state.splice(i, 1);
//       }
//       for (let i = 0; i < state.length; i++) {
//         state[i].id = i;
//       }
//     });
// });

// legacy way
// const todoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "AddTodo":
//       return [
//         ...state,
//         { id: action.id, value: action.value, done: action.done },
//       ];
//     case "ToggleTodo":
//       return state.map((todo) => {
//         if (todo.id === action.id) {
//           return { id: todo.id, value: todo.value, done: !todo.done };
//         }
//         return todo;
//       });
//     case "ToggleAllTodo":
//       var checked = state.every((todo) => todo.done === true);
//       return state.map((todo) => {
//         todo.done = !checked;
//         return todo;
//       });
//     case "ClearCompletedTodos":
//       return state
//         .filter((todo) => todo.done === false)
//         .map((todo, idx) => {
//           todo.id = idx;
//           return todo;
//         });
//     default:
//       return state;
//   }
// };
// const mapStateToProps = (state) => ({
//   id: state.id,
//   value: state.value,
//   todos: state.todos,
// });
// const mapDispatchToProps = (dispatch) => {
//   return {
//     AddTodo: () => dispatch({ type: "AddTodo" }),
//     ToggleTodo: () => dispatch({ type: "ToggleTodo" }),
//     ToggleAllTodo: () => dispatch({ type: "ToggleAllTodo" }),
//     ClearCompletedTodo: () => dispatch({ type: "ClearCompletedTodo" }),
//   };
// };

// legacy
// const store = createStore(todoReducer);

// Modern all in one
const store = configureStore({ reducer: todoSlice.reducer });

store.subscribe(() => {
  console.log(store.getState());
});

const Todos = () => {
  const [todoInfo, setTodoInfo] = useState("");
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();
  const inputOnChange = (e) => {
    setTodoInfo(e.target.value);
  };
  const addTodo = (event) => {
    if (event.key === "Enter" && todoInfo !== "") {
      dispatch(
        AddTodo({
          id: todos.length,
          value: event.target.value,
          done: false,
        })
      );
    }
  };
  const handleAllChange = () => {
    dispatch(ToggleAllTodo());
  };
  const handleChange = (id) => {
    dispatch(ToggleTodo({ id: id }));
  };
  const clearCompletedTodos = () => {
    dispatch(ClearCompletedTodos());
  };

  return (
    <div className="bodypage">
      <div>
        <h1 style={{ fontSize: "30px" }}>Todos - ReactJs</h1>
        <Input
          value={todoInfo}
          onChange={(e) => inputOnChange(e)}
          placeholder="Type a todo and hit Enter"
          onKeyUp={(e) => addTodo(e)}
        />
        <div className="remain-clear">
          <span>
            {todos.filter((todo) => todo.done === false).length} remaining
          </span>
          <button onClick={clearCompletedTodos}>Clear Completed Todos</button>
        </div>
        <div>
          <div className="checkbox-group">
            <input
              className="input-checkbox"
              type="checkbox"
              checked={todos.every((todo) => todo.done === true)}
              onChange={handleAllChange}
            />
            <label>Mark All Done</label>
          </div>
          <div className="todo-list">
            {todos.map((todo, index) => (
              <div key={index} className="todo-item">
                <input
                  className="input-checkbox"
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleChange(todo.id)}
                />
                <label>{todo.value}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// legacy connect component to redux
// connect(mapStateToProps, mapDispatchToProps)(Todos);

const dom = (
  <Provider store={store}>
    <Todos />
  </Provider>
);

const root = createRoot(document.getElementById("root"));
root.render(dom);
