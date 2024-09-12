import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  // Initialize todos by fetching from localStorage or defaulting to an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    return savedTodos || [];
  });

  // Whenever the todos change, update localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Let’s Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />

      {/* Conditionally render pending tasks */}
      {todos.some((todo) => !todo.completed) && (
        <>
         <h2 style={{ color: '#A7D39A' }} className="font-semibold">Pending Tasks</h2>
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) =>
              todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
              ) : (
                <Todo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                />
              )
            )}
        </>
      )}

      {/* Conditionally render completed tasks */}
      {todos.some((todo) => todo.completed) && (
        <>
          <h2 style={{ color: '#A7D39A' }} className="font-semibold">Completed Tasks</h2>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) =>
              todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
              ) : (
                <Todo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                />
              )
            )}
        </>
      )}
    </div>
  );
};
