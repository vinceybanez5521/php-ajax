<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once "../config/database.php";

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $id = $_POST['id'];

    $sql = "UPDATE employees SET first_name = ?, last_name = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $first_name, $last_name, $id);

    if ($stmt->execute()) {
        $response['result'] = 1;
    } else {
        $response['result'] = 0;
    }

    $stmt->close();
    $conn->close();
}

echo json_encode($response);
