"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus } from "lucide-react";
import "./page.css";

// Temporary mock cart items
const initialCart = [
  { id: 1, name: "Modern Leather Sofa", price: 1200000, quantity: 1, category: "Living Room" },
  { id: 2, name: "Oak Dining Table", price: 850000, quantity: 1, category: "Dining" }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 0 ? 50000 : 0; // Mock delivery fee Ugx 50,000
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <div className="cart-wrapper">
        <div className="container">
          <header className="page-header">
            <h1>Shopping Cart</h1>
          </header>
          <div className="cart-empty">
            <ShoppingBag size={64} opacity={0.2} />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any furniture to your cart yet.</p>
            <Link href="/shop" className="btn-primary mt-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="container">
        <header className="page-header">
          <h1>Shopping Cart</h1>
        </header>

        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <div className="img-placeholder">Img</div>
                </div>
                
                <div className="item-details">
                  <span className="item-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p className="item-price">Ugx {item.price.toLocaleString()}</p>
                </div>
                
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="btn-remove">
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Ugx {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Ugx {delivery.toLocaleString()}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>Ugx {total.toLocaleString()}</span>
            </div>

            <button className="btn-primary w-100 mt-4 checkout-btn">
              Proceed to Checkout <ArrowRight size={20} />
            </button>
            
            <Link href="/shop" className="continue-shopping">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
