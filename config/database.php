<?php
require_once "constants.php";

$conn = new mysqli(HOST, USERNAME, PASSWORD, DB_NAME, PORT);

if (mysqli_connect_error()) {
    die("Connection Failed! " . mysqli_connect_error());
}

// echo "Connection Successful!";
