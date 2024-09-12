import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapperLocalStorage = () => {
    // Initialize todos from localStorage on first render
    const [todos, setTodos] = useState(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        return savedTodos || [];
    });

    // UseEffect to sync the todos with localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const editTodo = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const editTask = (task, id) => {
        const newTodos = todos.map((todo) => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
    };

    return (
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    );
};
