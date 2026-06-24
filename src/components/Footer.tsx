import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2>The Furniture Store UG</h2>
          <p>Elevating Ugandan homes with premium, handcrafted furniture. Quality that lasts a lifetime.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>Shop</h3>
            <Link href="/categories">All Categories</Link>
            <Link href="/shop">All Products</Link>
          </div>
          <div className="link-group">
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login">Account</Link>
          </div>
          <div className="link-group">
            <h3>Get In Touch</h3>
            <ul>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: '4px' }} />
                <span>Kampala, Uganda</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Phone size={18} />
                <span>0765245921 / 0701079360</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} />
                <span>princehenrykimbugwe8@gmail.com</span>
              </li>
            </ul>
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
