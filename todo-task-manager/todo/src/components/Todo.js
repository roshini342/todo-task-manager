import React from 'react';

export default function Todo({ task, toggleComplete, deleteTodo, editTask }) {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(task.id)}
        className={`todo-text ${task.completed ? 'completed' : ''}`}
      >
        {task.task}
      </p>
      <div>
        <button onClick={() => editTask(task.id)}>✏️</button>
        <button onClick={() => deleteTodo(task.id)}>🗑️</button>
      </div>
    </div>
  );
}
