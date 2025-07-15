import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Initialize DB
await db.init();

// Add a new expense
app.post('/api/expenses', async (req, res) => {
  const { amount, purpose, time, day } = req.body;
  if (!amount || !time || !day) return res.status(400).json({ error: 'Missing fields' });
  await db.addExpense({ amount, purpose, time, day });
  res.json({ success: true });
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  const expenses = await db.getExpenses();
  res.json(expenses);
});

// Set a setting (salary, limit, goal)
app.post('/api/settings', async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'Missing key' });
  await db.setSetting(key, value);
  res.json({ success: true });
});

// Get a setting
app.get('/api/settings/:key', async (req, res) => {
  const value = await db.getSetting(req.params.key);
  res.json({ value });
});

app.listen(PORT, () => {
  console.log(`Budget backend running on http://localhost:${PORT}`);
});