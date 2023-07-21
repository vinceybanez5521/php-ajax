<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once "../config/database.php";

    $id = isset($_POST['id']) ? $_POST['id'] : -1;

    $sql = "DELETE FROM employees WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $response['result'] = 1;
    } else {
        $response['result'] = 0;
    }

    $stmt->close();
    $conn->close();
}

echo json_encode($response);
