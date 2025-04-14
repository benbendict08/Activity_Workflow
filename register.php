<?php
include "db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        $message = "<p class='success'>Registered successfully. <a href='login.php'>Login here</a></p>";
    } else {
        $message = "<p class='error'>Error: " . $stmt->error . "</p>";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
    <style>
        body {
            background-color: #e6f0ff;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .register-box {
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

        .login-link {
            margin-top: 20px;
        }

        .login-link button {
            background-color: white;
            color: #0066cc;
            border: 1px solid #0066cc;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
        }

        .login-link button:hover {
            background-color: #e6f0ff;
        }

        .success {
            color: green;
            margin-bottom: 10px;
        }

        .error {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="register-box">
        <?php echo $message; ?>
        <form method="post">
            <h2>Register</h2>
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <input type="submit" value="Register">
        </form>

        <div class="login-link">
            <p>Already have an account?</p>
            <a href="login.php">
                <button type="button">Go to Login</button>
            </a>
        </div>
    </div>
</body>
</html>
