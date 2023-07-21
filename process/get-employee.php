<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once "../config/database.php";

    $id = isset($_GET['id']) ? $_GET['id'] : -1;

    $sql = "SELECT * FROM employees WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $employee = $result->fetch_assoc();
    $response['data'] = $employee;

    $stmt->close();
    $conn->close();
}

echo json_encode($response);
