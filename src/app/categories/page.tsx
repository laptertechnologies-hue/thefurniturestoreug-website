import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { prisma } from "@/lib/prisma";
import "../shop/page.css";

export const dynamic = 'force-dynamic';

export default async function Categories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="shop-wrapper">
      <div className="container">
        <header className="page-header">
          <h1>Categories</h1>
          <p className="subtitle">Browse our furniture by room and collection.</p>
        </header>

        {categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-brown-light)' }}>
            <Layers size={48} opacity={0.2} style={{ margin: '0 auto 16px' }} />
            <h2>No categories available right now.</h2>
          </div>
        ) : (
          <div className="shop-grid">
            {categories.map((cat) => (
              <Link href={`/category/${cat.id}`} key={cat.id} className="product-card">
                <div className="product-image" style={{ aspectRatio: '16/9' }}>
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="img-placeholder">{cat.name} Image</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{cat.name}</h3>
                  <p style={{ color: 'var(--color-brown-light)', fontSize: '0.9rem', marginBottom: '16px' }}>
                    {cat.description || "Explore this collection"}
                  </p>
                  <span className="link-arrow" style={{ fontSize: '0.9rem' }}>
                    View Category <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
