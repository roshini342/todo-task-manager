// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-full">
      <div className="home-hero">
        <h1 className="glow-title">Welcome to TaskMate</h1>
        <p className="home-tagline">
          Organize. Track. Complete.<br />
          Your all-in-one To-Do Manager 🚀
        </p>

        <ul className="home-feature-list">
          <li>✅ Add, edit, and complete tasks</li>
          <li>🔎 Filter by active or completed</li>
          <li>🤝 Collaborate with others</li>
        </ul>

        <div className="home-cta">
          <button onClick={() => navigate('/signup')}>Sign Up</button>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
}
