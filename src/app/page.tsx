import Link from "next/link";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import "./page.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-slide-in-left">
            <span className="badge">Premium Quality</span>
            <h1 className="hero-title">
              Elevate Your Space with <span>Timeless Furniture</span>
            </h1>
            <p className="hero-subtitle">
              Discover our curated collection of handcrafted furniture designed to bring comfort, style, and durability to your home.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn-primary">
                Shop Collection <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="btn-secondary">
                Our Story
              </Link>
            </div>
          </div>
          
          <div className="hero-image-wrapper animate-fade-in-up">
            <div className="hero-image-placeholder">
              <img src="/hero.png" alt="Premium Furniture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            {/* Floating Glass Card */}
            <div className="floating-card glass">
              <div className="rating">
                <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
              </div>
              <p className="review">"Absolutely stunning craftsmanship. Transformed my living room!"</p>
              <p className="reviewer">- Sarah M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Preview) */}
      <section className="categories-preview">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <Link href="/categories" className="link-arrow">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="category-grid">
            {['Living Room', 'Bedroom', 'Dining', 'Office'].map((cat, i) => (
              <Link href={`/category/${cat.toLowerCase().replace(' ', '-')}`} key={i} className="category-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="category-image"></div>
                <h3>{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
