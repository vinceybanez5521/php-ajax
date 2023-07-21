<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once "../config/database.php";

    $sql = "SELECT *, CONCAT(first_name, ' ', last_name) as full_name FROM employees ORDER BY first_name ASC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $employees = $result->fetch_all(MYSQLI_ASSOC);
    $response['data'] = $employees;

    $stmt->close();
    $conn->close();
}

echo json_encode($response);
