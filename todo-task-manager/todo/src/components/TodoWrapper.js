// File: src/components/TodoWrapper.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './todo.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function TodoWrapper() {
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) setUsername(storedUser);
    else navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (username) {
      axios
        .get(`${API_BASE}/api/todos?user=${username}`)
        .then(res => setTodos(res.data))
        .catch(err => {
          console.error(err);
          setTodos([]);
        });
    }
  }, [username]);

const addTodo = (text) => {
  if (!text.trim()) return;

  axios
    .post(`${API_BASE}/api/todos`, { task: text, user: username })
    .then(res => {
      console.log('POST response:', res.data); // 👈 This is the new todo!
      setTodos([...todos, res.data]);
    })
    .catch(err => console.error(err));
};

  const toggleComplete = (id) => {
    axios
      .put(`${API_BASE}/api/todos/${id}/toggle`)
      .then(() => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${API_BASE}/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)));
  };

  const editTodo = (id) => {
    setTodos(todos.map(todo =>
      todo._id === id ? { ...todo, isEditing: true } : todo
    ));
  };

  const updateTodo = (value, id) => {
    axios
      .put(`${API_BASE}/api/todos/${id}`, { task: value })
      .then(res => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...res.data, isEditing: false } : todo
        ));
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      if (value.trim()) {
        addTodo(value);
        setValue('');
      }
    };
    return (
      <form onSubmit={handleSubmit} className="TodoForm">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What needs to be done today?"
          className="todo-input"
        />
        <button type="submit" className="todo-btn">Add ➕</button>
      </form>
    );
  };

  const EditTodoForm = ({ task, editTodo }) => {
    const [value, setValue] = useState(task.task);
    const handleSubmit = (e) => {
      e.preventDefault();
      if (value.trim()) editTodo(value, task._id);
    };
    return (
      <form onSubmit={handleSubmit} className="TodoForm">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-btn">Update</button>
      </form>
    );
  };

  const TodoItem = ({ task, toggleComplete, deleteTodo, editTodo }) => (
    <div className="Todo">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task._id)}
      />
      <span className={task.completed ? 'completed' : 'incompleted'}>
        {task.task}
      </span>
      <div>
        <button className="edit-icon" onClick={() => editTodo(task._id)}>✏️</button>
        <button className="delete-icon" onClick={() => deleteTodo(task._id)}>❌</button>
      </div>
    </div>
  );

  return (
    <>
      <div className="navbar">
        <div className="navbar-brand">📋 TodoList</div>
        <div className="navbar-profile">
          <span className="username">Hi {username}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="TodoWrapper">
        <h5>Welcome to Your Task Manager</h5>
        <p style={{ color: "#ccc", marginBottom: "2rem" }}>
          Organize your day. Stay productive.
        </p>

        <TodoForm addTodo={addTodo} />

        <div className="filter-buttons">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>

        {filteredTodos.length === 0 ? (
          <p className="no-todo-msg">No tasks yet. Add one!</p>
        ) : (
          filteredTodos.map(todo =>
            todo.isEditing ? (
              <EditTodoForm key={todo._id} task={todo} editTodo={updateTodo} />
            ) : (
              <TodoItem
                key={todo._id}
                task={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )
          )
        )}
      </div>
    </>
  );
}
