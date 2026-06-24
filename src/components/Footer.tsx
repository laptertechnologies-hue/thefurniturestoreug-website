import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";

// Custom SVG Icons to avoid dependency bloat and build errors
const TiktokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.39-2.2 1.88-5.31 2.7-8.14 2.01-2.83-.67-5.18-2.65-6.22-5.35-1.04-2.7-.66-5.83.94-8.16 1.6-2.33 4.31-3.79 7.14-3.83v4.06c-1.39.06-2.76.62-3.76 1.63-1.01 1.02-1.58 2.45-1.55 3.89.02 1.45.64 2.87 1.68 3.86 1.05.99 2.51 1.53 3.95 1.5 1.45-.03 2.86-.64 3.85-1.7 1.01-1.08 1.54-2.55 1.54-4.04V.02h3.89z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);


export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        
        {/* Column 1: Brand & Socials */}
        <div className="footer-col brand-col">
          <h2>The Furniture Store UG</h2>
          <p>Elevating Ugandan homes with premium, handcrafted furniture. Quality that lasts a lifetime.</p>
          <div className="social-links">
            <a href="https://wa.me/256765245921" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsappIcon /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TiktokIcon /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><XIcon /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
        
        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h3>Quick Links</h3>
          <ul className="footer-links-list">
            <li><Link href="/shop">Shop All Products</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/login">My Account</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-col contact-col">
          <h3>Get In Touch</h3>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Kampala, Uganda</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>0765245921<br/>0701079360</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>princehenrykimbugwe8@gmail.com</span>
            </li>
          </ul>
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
