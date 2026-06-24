"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import "./page.css";

export default function Cart() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.getSubtotal());
  
  // Hydration fix for zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch on first render

  const delivery = subtotal > 0 ? 50000 : 0; // Mock delivery fee Ugx 50,000
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <div className="cart-wrapper animate-fade-in">
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
    <div className="cart-wrapper animate-fade-in">
      <div className="container">
        <header className="page-header">
          <h1>Shopping Cart</h1>
        </header>

        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item animate-slide-in-left">
                <div className="item-image">
                  {item.image ? (
                     <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="img-placeholder">Img</div>
                  )}
                </div>
                
                <div className="item-details">
                  <span className="item-category">{item.category || "Uncategorized"}</span>
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
          <aside className="cart-summary animate-slide-in-right">
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

            <Link href="/checkout" className="btn-primary w-100 mt-4 checkout-btn" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
            
            <Link href="/shop" className="continue-shopping">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
