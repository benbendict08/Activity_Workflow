<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

include "db.php";
?>

<!DOCTYPE html>
<html>
<head>
    <title>E-commerce - Welcome</title>
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
            margin: 0 10px;
            text-decoration: none;
            font-weight: bold;
        }

        .container {
            padding: 30px;
        }

        h3 {
            color: #0047b3;
            text-align: center;
        }

        .product-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }

        .product-card {
            background-color: white;
            border-radius: 10px;
            width: 260px; /* enlarged width */
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease;
            text-align: center;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 400px; /* fixed height for uniformity */
        }

        .product-card:hover {
            transform: translateY(-5px);
        }

        .product-card img {
            width: 100%;
            height: 280px; /* fixed height */
            object-fit: cover;
            border-radius: 6px;
            margin-bottom: 10px;
        }

        .product-card h4 {
            color: #0047b3;
            margin: 10px 0 5px 0;
        }

        .product-card p {
            font-size: 14px;
            color: #333;
            flex-grow: 1; /* fills available vertical space */
            margin: 0 0 10px;
        }

        .product-card form input[type="submit"] {
            background-color: #0066cc;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            margin-top: auto;
        }

        .product-card form input[type="submit"]:hover {
            background-color: #005bb5;
        }


        @media (max-width: 600px) {
            .product-card {
                width: 90%;
            }
        }
    </style>
</head>
<body>

<div class="header">
    <h2>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
    <a href="logout.php">Logout</a> | <a href="cart.php">View Cart</a>
</div>

<div class="container">
    <h3>Explore Our Products</h3>
    <div class="product-grid">

        <?php
        $result = $conn->query("SELECT * FROM products");

        while ($row = $result->fetch_assoc()) {
            echo "<div class='product-card'>";
            echo "<img src='" . htmlspecialchars($row['image']) . "' alt='" . htmlspecialchars($row['name']) . "'>";
            echo "<h4>" . htmlspecialchars($row['name']) . "</h4>";
            echo "<p>" . htmlspecialchars($row['description']) . "</p>";
            
            echo "<form method='post' action='add_to_cart.php'>";
            echo "<input type='hidden' name='product_id' value='" . $row['id'] . "'>";
            echo "<input type='hidden' name='product_name' value='" . htmlspecialchars($row['name']) . "'>";
            echo "<input type='hidden' name='product_image' value='" . htmlspecialchars($row['image']) . "'>";
            echo "<input type='submit' value='Add to Cart'>";
            echo "</form>";

            echo "</div>";
        }
        ?>

    </div>
</div>

</body>
</html>
