<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once "../config/database.php";

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];

    $sql = "INSERT INTO employees(first_name, last_name) VALUES(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $first_name, $last_name);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $response['result'] = 1;
    } else {
        $response['result'] = 0;
    }

    $stmt->close();
    $conn->close();
}

echo json_encode($response);
