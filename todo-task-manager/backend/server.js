const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Todo = require('./models/Todo');

dotenv.config(); // Load .env variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes

// GET todos by user
app.get('/api/todos', async (req, res) => {
  try {
    const user = req.query.user;
    const todos = await Todo.find({ user });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { task, user } = req.body;
    const newTodo = new Todo({ task, user });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// PUT toggle completed
app.put('/api/todos/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle status' });
  }
});

// PUT update task
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { task } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
