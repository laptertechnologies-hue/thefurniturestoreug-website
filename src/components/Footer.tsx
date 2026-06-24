import Link from "next/link";
import { ShoppingBag, Instagram, Facebook, Youtube } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-icon"><ShoppingBag size={24} /></span>
            <span className="logo-text">The Furniture Store UG</span>
          </Link>
          <p className="footer-description">
            Premium handcrafted furniture designed for modern living. Elevate your space with our exclusive collections.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link"><Facebook size={20} /></a>
            <a href="#" className="social-link"><Youtube size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>Shop</h3>
            <Link href="/categories">All Categories</Link>
            <Link href="/category/living-room">Living Room</Link>
            <Link href="/category/bedroom">Bedroom</Link>
            <Link href="/category/dining">Dining</Link>
          </div>
          <div className="link-group">
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/admin">Admin Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} The Furniture Store UG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
