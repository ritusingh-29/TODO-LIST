import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <div className="todo-task flex">
        {/* Checkbox for marking task as complete */}
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleComplete(task.id)} 
        />
        <p 
          className={`${task.completed ? "completed" : "incompleted"}`} 
          onClick={() => toggleComplete(task.id)}
        >
          {task.task}
        </p>
      </div>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
