<?php
require 'db.php';
header('Content-Type: application/json');
$db = getDb();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $db->prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    $stmt->execute([$data['key'], $data['value']]);
    echo json_encode(['success' => true]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['key'])) {
    $stmt = $db->prepare('SELECT value FROM settings WHERE key = ?');
    $stmt->execute([$_GET['key']]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['value' => $row ? $row['value'] : null]);
    exit;
}
?> 