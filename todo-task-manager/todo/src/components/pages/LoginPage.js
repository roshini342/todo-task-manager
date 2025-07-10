// ✅ LoginPage.js (multi-user login)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem('loggedInUser', matchedUser.username);
      alert('Login successful!');
      navigate('/todo');
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">Login</button>
      </form>
      <p className="auth-link">
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}
