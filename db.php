<?php
$host = '127.0.0.1:1024';
$user = "root"; // default for XAMPP
$pass = "";     // default for XAMPP
$db   = "e-commerce";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
