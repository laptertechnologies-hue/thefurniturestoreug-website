import Link from "next/link";
import { ArrowRight, Star, Quote } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { prisma } from "@/lib/prisma";
import "./page.css";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data dynamically
  const [categories, testimonials] = await Promise.all([
    prisma.category.findMany({ take: 4, orderBy: { name: 'asc' } }),
    prisma.testimonial.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="home-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "The Furniture Store Ug",
            "url": "https://www.thefurniturestoreug.com/"
          })
        }}
      />
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
            {categories.map((cat, i) => (
              <Link href={`/category/${cat.id}`} key={cat.id} className="category-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="category-image">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : null}
                </div>
                <h3>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <h2>What Our Customers Say</h2>
            <p>Don't just take our word for it. Here is what people are saying about The Furniture Store UG.</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.map((test, i) => (
                <div key={test.id} className="testimonial-card">
                  <div className="quote-icon"><Quote size={32} /></div>
                  <div className="rating">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} fill={idx < test.rating ? "var(--color-accent)" : "none"} color={idx < test.rating ? "var(--color-accent)" : "var(--color-brown-light)"} />
                    ))}
                  </div>
                  <p className="review-text">"{test.content}"</p>
                  <div className="reviewer-info">
                    <h4>{test.author}</h4>
                    {test.role && <span>{test.role}</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-testimonials">
                <p>No testimonials available yet. Be the first to review us!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
