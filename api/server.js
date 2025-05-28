const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,

});

const User = mongoose.model('User', userSchema);

const incomeSchema = new mongoose.Schema({
  username: String,
  salary: Number,
  business: Number,
  grant: Number,
  otherIncome: Number,
  totalIncome: Number,
  createdAt: { type: Date, default: Date.now }
});

const Income = mongoose.model('Income', incomeSchema);

const expenseSchema = new mongoose.Schema({
  username: String,
  rent: Number,
  groceries: Number,
  loans: Number,
  utilities: Number,
  otherExpenses: Number,
  totalExpense: Number,
  createdAt: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Get latest total income for a user
app.get('/api/income/:username/total', async (req, res) => {
  const { username } = req.params;
  const latest = await Income.findOne({ username }).sort({ createdAt: -1 });
  res.json({ totalIncome: latest ? latest.totalIncome : 0 });
});

// Get latest total expense for a user
app.get('/api/expense/:username/total', async (req, res) => {
  const { username } = req.params;
  const latest = await Expense.findOne({ username }).sort({ createdAt: -1 });
  res.json({ totalExpense: latest ? latest.totalExpense : 0 });
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashed });
    await user.save();
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  // Optionally, create a JWT token here
  res.json({ status: 'ok' });
});

// Income endpoint
app.post('/api/income', async (req, res) => {
  const { username, salary, business, grant, otherIncome } = req.body;
  const totalIncome = salary + business + grant + otherIncome;
  try {
    const income = new Income({
      username,
      salary,
      business,
      grant,
      otherIncome,
      totalIncome
    });
    await income.save();
    res.json({ status: 'ok', totalIncome });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save income' });
  }
});

// Expense endpoint
app.post('/api/expense', async (req, res) => {
  const { username, rent, groceries, loans, utilities, otherExpenses } = req.body;
  const totalExpense = rent + groceries + loans + utilities + otherExpenses;
  try {
    const expense = new Expense({
      username,
      rent,
      groceries,
      loans,
      utilities,
      otherExpenses,
      totalExpense
    });
    await expense.save();
    res.json({ status: 'ok', totalExpense });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save expense' });
  }
});

//const PORT = process.env.PORT || 4000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;