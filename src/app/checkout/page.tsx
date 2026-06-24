"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import "./page.css";

export default function Checkout() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const cartItems = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const delivery = subtotal > 0 ? 50000 : 0;
  const total = subtotal + delivery;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customerInfo: formData,
          subtotal,
          deliveryFee: delivery,
          totalAmount: total
        })
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      
      // Clear the cart on successful order
      clearCart();
      
      // Redirect to success page with order ID
      router.push(`/checkout/success?orderId=${data.orderId}`);
      
    } catch (err) {
      console.error(err);
      setError("There was a problem placing your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-wrapper animate-fade-in">
      <div className="container">
        <header className="page-header">
          <Link href="/cart" className="back-link">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <h1>Checkout</h1>
          <p className="subtitle">Provide your delivery details to complete your order request.</p>
        </header>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        <div className="checkout-layout">
          {/* Checkout Form */}
          <div className="checkout-form-container">
            <h2>Delivery Details</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0700000000"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <textarea 
                  id="address" 
                  name="address" 
                  required 
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street name, Neighborhood, Kampala"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Order Notes (Optional)</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions for delivery..."
                ></textarea>
              </div>

              <div className="checkout-notice">
                <CheckCircle2 size={18} color="var(--color-accent)" />
                <p>Payment will be processed upon delivery or via direct contact after you place this order request.</p>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-100 place-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Checkout Summary */}
          <aside className="checkout-summary">
            <h3>Your Order</h3>
            
            <div className="checkout-items">
              {cartItems.map(item => (
                <div key={item.id} className="checkout-item">
                  <div className="item-info">
                    <span className="item-qty">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">Ugx {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>
            
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
          </aside>
        </div>
      </div>
    </div>
  );
}
