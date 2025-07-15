<?php
require 'db.php';
header('Content-Type: application/json');
$db = getDb();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $db->prepare('INSERT INTO expenses (amount, purpose, time, day) VALUES (?, ?, ?, ?)');
    $stmt->execute([
        $data['amount'],
        $data['purpose'],
        $data['time'],
        $data['day']
    ]);
    echo json_encode(['success' => true]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rows = $db->query('SELECT * FROM expenses ORDER BY id DESC')->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
    exit;
}
?> 