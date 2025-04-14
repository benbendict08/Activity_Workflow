import React, { useState } from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';

function App() {
  // App state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Sample products. In a real app, you might fetch these from an API.
  const products = [
    { id: 1, name: 'Product 1', price: 10.0, image: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Zip22Right.jpg'},
    { id: 2, name: 'Product 2', price: 20.0, image: 'https://i.imgur.com/ep3gv.jpg'},
    { id: 3, name: 'Product 3', price: 30.0, image: 'https://ca-times.brightspotcdn.com/dims4/default/19c894c/2147483647/strip/true/crop/600x481+0+0/resize/1200x962!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fef%2Fc2%2Fcdaadf9dc59232d07e1b806905fe%2Fla-fi-tn-chinese-iphone-knockoffs-20120425-001'}
  ];

  // Handle login and authentication
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Cart handling
  const handleAddToCart = (product) => {
    // Optionally check for duplicate product entries
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <header className="header">
            <h1>Welcome, {user.email}!</h1>
          </header>
          <main className="main-content">
            <section className="products-section">
              <ProductList products={products} onAddToCart={handleAddToCart} />
            </section>
            <aside className="cart-section">
              <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
            </aside>
          </main>
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Your Lab eCommerce. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
