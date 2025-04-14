import React from 'react';

function ProductItem({ product, onAddToCart }) {
  return (
    <div className="product-item">
      <img className="product-image" src={product.image} alt={product.name} />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <button className="btn" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;