<?php
require 'db.php';
$db = getDb();
$db->exec("
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
");
echo 'Setup complete!';
?> 