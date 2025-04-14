<?php
include "db.php";
session_start();

$error = ""; // Initialize error message

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;
            header("Location: welcome.php");
            exit();
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "No user found.";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body {
            background-color: #e6f0ff;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-box {
            background-color: white;
            padding: 30px 40px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 80, 0.1);
            width: 300px;
            text-align: center;
        }

        h2 {
            color: #0047b3;
            margin-bottom: 20px;
        }

        input[type="text"],
        input[type="password"] {
            width: 90%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        input[type="submit"] {
            background-color: #0066cc;
            color: white;
            padding: 10px 20px;
            border: none;
            width: 100%;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        input[type="submit"]:hover {
            background-color: #005bb5;
        }

        .register-link {
            margin-top: 20px;
        }

        .register-link button {
            background-color: white;
            color: #0066cc;
            border: 1px solid #0066cc;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
        }

        .register-link button:hover {
            background-color: #e6f0ff;
        }

        .error {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="login-box">
        <?php if (!empty($error)) { echo "<p class='error'>$error</p>"; } ?>
        <form method="post">
            <h2>Login</h2>
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <input type="submit" value="Login">
        </form>

        <div class="register-link">
            <p>Don't have an account?</p>
            <a href="register.php">
                <button type="button">Go to Register</button>
            </a>
        </div>
    </div>
</body>
</html>
