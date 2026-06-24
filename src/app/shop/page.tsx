import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { prisma } from "@/lib/prisma";
import "./page.css";

export const dynamic = 'force-dynamic';

export default async function Shop() {
  const [products, slides] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.slide.findMany({ orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="shop-wrapper">
      <HeroSlider slides={slides} />
      <div className="container">
        <header className="page-header">
          <h1>All Products</h1>
          <p className="subtitle">Discover our complete collection of premium furniture.</p>
        </header>

        <div className="shop-toolbar">
          <div className="toolbar-left">
            <span>Showing {products.length} products</span>
          </div>
          <div className="toolbar-right">
            <select className="sort-select" defaultValue="newest">
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-brown-light)' }}>
            <ShoppingBag size={48} opacity={0.2} style={{ margin: '0 auto 16px' }} />
            <h2>No products available right now.</h2>
            <p>Please check back later or contact us for inquiries.</p>
          </div>
        ) : (
          <div className="shop-grid">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="product-card">
                <div className="product-image">
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="img-placeholder">No Image</div>
                  )}
                  {product.discountPrice && (
                    <div className="product-badge sale">Sale</div>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category?.name || "Uncategorized"}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {product.discountPrice ? (
                        <>
                          <span style={{ textDecoration: 'line-through', fontSize: '0.9rem', color: 'var(--color-brown-light)' }}>
                            Ugx {product.price.toLocaleString()}
                          </span>
                          <span>Ugx {product.discountPrice.toLocaleString()}</span>
                        </>
                      ) : (
                        <span>Ugx {product.price.toLocaleString()}</span>
                      )}
                    </span>
                    <button className="add-to-cart-btn" aria-label="Add to cart">
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
