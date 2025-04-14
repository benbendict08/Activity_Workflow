import React, { useState } from 'react';
import LoginForm from './Components/LoginForm';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: 'Product 1', price: 10.0, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20.0, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30.0, image: 'https://via.placeholder.com/150' },
  ];

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Welcome, {user.email}</h2>
          <ProductList products={products} onAddToCart={handleAddToCart} />
          <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
        </div>
      )}
    </div>
  );
}

export default App;
