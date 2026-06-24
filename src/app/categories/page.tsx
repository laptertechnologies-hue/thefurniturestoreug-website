import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "../shop/page.css";

const CATEGORIES = [
  { name: "Living Room", slug: "living-room", description: "Sofas, armchairs, coffee tables, and more." },
  { name: "Bedroom", slug: "bedroom", description: "Beds, dressers, nightstands, and wardrobes." },
  { name: "Dining", slug: "dining", description: "Dining tables, chairs, and cabinets." },
  { name: "Office", slug: "office", description: "Desks, office chairs, and bookshelves." },
  { name: "Outdoor", slug: "outdoor", description: "Patio furniture, outdoor seating." },
];

export default function Categories() {
  return (
    <div className="shop-wrapper">
      <div className="container">
        <header className="page-header">
          <h1>Categories</h1>
          <p className="subtitle">Browse our furniture by room and collection.</p>
        </header>

        <div className="shop-grid">
          {CATEGORIES.map((cat, i) => (
            <Link href={`/category/${cat.slug}`} key={i} className="product-card">
              <div className="product-image" style={{ aspectRatio: '16/9' }}>
                <div className="img-placeholder">{cat.name} Image</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{cat.name}</h3>
                <p style={{ color: 'var(--color-brown-light)', fontSize: '0.9rem', marginBottom: '16px' }}>
                  {cat.description}
                </p>
                <span className="link-arrow" style={{ fontSize: '0.9rem' }}>
                  View Category <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
