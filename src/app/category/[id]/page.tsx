import Link from "next/link";
import { ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import "../../shop/page.css";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="shop-wrapper">
      <div className="container">
        <Link href="/categories" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-brown-light)', marginBottom: '24px', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Categories
        </Link>
        <header className="page-header" style={{ marginBottom: '40px' }}>
          <h1>{category.name}</h1>
          <p className="subtitle">{category.description || `Explore our collection of ${category.name} furniture.`}</p>
        </header>

        {category.products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-brown-light)' }}>
            <ShoppingBag size={48} opacity={0.2} style={{ margin: '0 auto 16px' }} />
            <h2>No products in this category yet.</h2>
            <p>Please check back later.</p>
          </div>
        ) : (
          <div className="shop-grid">
            {category.products.map((product) => (
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
