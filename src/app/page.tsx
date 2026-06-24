import Link from "next/link";
import { ArrowRight, Star, Quote } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { prisma } from "@/lib/prisma";
import "./page.css";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data dynamically
  const [slides, categories, testimonials] = await Promise.all([
    prisma.slide.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.category.findMany({ take: 4, orderBy: { name: 'asc' } }),
    prisma.testimonial.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="home-wrapper">
      {/* Dynamic Hero Slider */}
      <HeroSlider slides={slides} />

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
