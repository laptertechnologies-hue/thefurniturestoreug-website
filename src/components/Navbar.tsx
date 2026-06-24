"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <span className="logo-icon"><ShoppingBag size={24} /></span>
          <span className="logo-text">The Furniture Store UG</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <Link href="/shop" className="nav-link">Shop</Link>
          <Link href="/categories" className="nav-link">Categories</Link>
          <Link href="/about" className="nav-link">About Us</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="nav-actions">
          <Link href="/cart" className="icon-btn">
            <ShoppingBag size={20} />
          </Link>
          {session ? (
            <>
              {/* @ts-ignore */}
              {session.user?.role === 'ADMIN' && (
                <Link href="/admin" className="icon-btn" title="Admin Dashboard">
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Admin</span>
                </Link>
              )}
              <Link href="/profile" className="icon-btn" title="My Profile">
                <User size={20} />
              </Link>
            </>
          ) : (
            <Link href="/login" className="icon-btn" title="Sign In">
              <User size={20} />
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="mobile-nav animate-fade-in">
          <Link href="/shop" className="mobile-link" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link href="/categories" className="mobile-link" onClick={() => setIsOpen(false)}>Categories</Link>
          <Link href="/about" className="mobile-link" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/contact" className="mobile-link" onClick={() => setIsOpen(false)}>Contact</Link>
          {session ? (
            <>
              {/* @ts-ignore */}
              {session.user?.role === 'ADMIN' && (
                <Link href="/admin" className="mobile-link" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
              )}
              <button className="mobile-link auth-link" onClick={() => { signOut(); setIsOpen(false); }}>Sign Out</button>
            </>
          ) : (
            <Link href="/login" className="mobile-link auth-link" onClick={() => setIsOpen(false)}>Login / Register</Link>
          )}
        </div>
      )}
    </header>
  );
}
