// Initialize cart from localStorage or create an empty array if no cart exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count in the navigation bar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
}

// Function to add product to the cart
function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // If product exists, increase quantity
        existingProduct.quantity++;
    } else {
        // If product does not exist, add it to the cart
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();
}

// Function to open the cart sidebar and display products in the sidebar
function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear current cart items in the sidebar
    cartItemsContainer.innerHTML = '';

    // Calculate total price
    let totalPrice = 0;
    
    // Add each product in the cart to the sidebar
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsContainer.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    cartTotal.textContent = totalPrice.toFixed(2);

    // Show the cart sidebar
    cartSidebar.style.display = 'block';
}

// Close cart sidebar
function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.style.display = 'none';
}

// Event listener for cart button
document.getElementById('cart-btn').addEventListener('click', openCart);

// Event listener for closing the cart sidebar
document.getElementById('close-cart').addEventListener('click', closeCart);

// Initialize the cart count on page load
updateCartCount();
