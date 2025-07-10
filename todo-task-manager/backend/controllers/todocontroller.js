const Todo = require('../models/Todo');

// Get todos by user
exports.getTodos = async (req, res) => {
  const user = req.query.user;
  try {
    const todos = await Todo.find({ user });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new todo
exports.createTodo = async (req, res) => {
  const { task, user } = req.body;
  try {
    const newTodo = await Todo.create({ task, user });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, { task }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle complete
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
