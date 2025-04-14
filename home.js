// Sample product data
const products = [
    { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/150?text=Laptop" },
    { id: 2, name: "Smartphone", price: 699, image: "https://via.placeholder.com/150?text=Smartphone" },
    { id: 3, name: "Headphones", price: 99, image: "https://via.placeholder.com/150?text=Headphones" },
    { id: 4, name: "Tablet", price: 499, image: "https://via.placeholder.com/150?text=Tablet" },
];

// Initialize cart and user
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = localStorage.getItem('currentUser') || null;

// DOM elements
const productList = document.getElementById('product-list');
const cartModal = document.getElementById('cart-modal');
const confirmModal = document.getElementById('confirm-modal');
const cartBtn = document.getElementById('cart-btn');
const accountBtn = document.getElementById('account-btn');
const closeCart = document.getElementById('close-cart');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutCartBtn = document.getElementById('checkout-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const confirmTitle = document.getElementById('confirm-title');
const confirmMessage = document.getElementById('confirm-message');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');

// Display products
function displayProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="showAddToCartConfirm(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

// Show confirmation modal
function showConfirmModal(title, message, onConfirm) {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmModal.style.display = 'flex';

    // Clear existing listeners
    confirmYes.onclick = null;
    confirmNo.onclick = null;

    // Add new listeners
    confirmYes.onclick = () => {
        onConfirm();
        confirmModal.style.display = 'none';
    };
    confirmNo.onclick = () => {
        confirmModal.style.display = 'none';
    };
}

// Add to cart confirmation
function showAddToCartConfirm(productId) {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    showConfirmModal(
        'Add to Cart',
        `Do you want to add ${product.name} to your cart?`,
        () => addToCart(productId)
    );
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Update cart UI and local storage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    checkoutCartBtn.disabled = itemCount === 0;
}

// Clear cart confirmation
function showClearCartConfirm() {
    showConfirmModal(
        'Clear Cart',
        'Are you sure you want to clear your cart?',
        clearCart
    );
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
}

// Checkout confirmation
function showCheckoutConfirm() {
    showConfirmModal(
        'Confirm Checkout',
        'Do you want to proceed with checkout?',
        checkout
    );
}

// Checkout
function checkout() {
    alert('Checkout successful! Your order has been placed.');
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
}

// Account button (login/logout)
function handleAccountAction() {
    if (currentUser) {
        showConfirmModal(
            'Confirm Logout',
            'Are you sure you want to log out? This will clear your cart.',
            () => {
                currentUser = null;
                localStorage.removeItem('currentUser');
                cart = [];
                updateCart();
                window.location.href = 'login.html';
            }
        );
    } else {
        window.location.href = 'login.html';
    }
}

// Event listeners
cartBtn.addEventListener('click', () => {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    cartModal.style.display = 'flex';
});

accountBtn.addEventListener('click', handleAccountAction);

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

clearCartBtn.addEventListener('click', showClearCartConfirm);

checkoutCartBtn.addEventListener('click', showCheckoutConfirm);

// Initialize page
displayProducts();
updateCart();