<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Your Cart</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f6ff;
            margin: 0;
            padding: 0;
        }

        .header {
            background-color: #0047b3;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .header a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
            font-weight: bold;
        }

        .container {
            padding: 30px;
        }

        h2 {
            color: #0047b3;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: center;
        }

        th {
            background-color: #0066cc;
            color: white;
        }

        img {
            width: 80px;
            height: auto;
            border-radius: 5px;
        }

        input[type="submit"] {
            background-color: #cc0000;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #b30000;
        }

        .empty-message {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            text-align: center;
        }
    </style>
</head>
<body>

<div class="header">
    <h2>Your Cart</h2>
    <a href="welcome.php">Back to Products</a> |
    <a href="logout.php">Logout</a>
</div>

<div class="container">
    <?php
    if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
        echo "<div class='empty-message'><p>Your cart is empty.</p></div>";
    } else {
        echo "<table>";
        echo "<tr><th>Image</th><th>Product Name</th><th>Quantity</th><th>Action</th></tr>";

        foreach ($_SESSION['cart'] as $id => $item) {
            echo "<tr>";
            echo "<td><img src='" . htmlspecialchars($item['image']) . "' alt='product image'></td>";
            echo "<td>" . htmlspecialchars($item['name']) . "</td>";
            echo "<td>" . $item['quantity'] . "</td>";
            echo "<td>
                    <form method='post' action='remove_from_cart.php'>
                        <input type='hidden' name='product_id' value='" . $id . "'>
                        <input type='submit' value='Remove'>
                    </form>
                  </td>";
            echo "</tr>";
        }

        echo "</table>";
    }
    ?>
</div>

</body>
</html>
