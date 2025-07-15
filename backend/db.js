import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './budget.db',
  driver: sqlite3.Database
});

async function init() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      purpose TEXT,
      time TEXT,
      day TEXT
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}

async function addExpense({ amount, purpose, time, day }) {
  const db = await dbPromise;
  await db.run(
    'INSERT INTO expenses (amount, purpose, time, day) VALUES (?, ?, ?, ?)',
    amount, purpose, time, day
  );
}

async function getExpenses() {
  const db = await dbPromise;
  return db.all('SELECT * FROM expenses ORDER BY id DESC');
}

async function setSetting(key, value) {
  const db = await dbPromise;
  await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', key, value);
}

async function getSetting(key) {
  const db = await dbPromise;
  const row = await db.get('SELECT value FROM settings WHERE key = ?', key);
  return row ? row.value : null;
}

export default { init, addExpense, getExpenses, setSetting, getSetting }; 