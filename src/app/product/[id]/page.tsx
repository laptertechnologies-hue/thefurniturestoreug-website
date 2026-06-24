import Link from "next/link";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import "./page.css";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="product-page-wrapper">
      <div className="container">
        <Link href="/shop" className="back-link">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
        
        <div className="product-layout">
          {/* Image Gallery (Simplistic for now) */}
          <div className="product-gallery">
            <div className="main-image">
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} />
              ) : (
                <div className="img-placeholder">No Image Available</div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-list">
                {product.images.map((img, idx) => (
                  <div key={idx} className="thumbnail">
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-details">
            <div className="product-category-label">{product.category?.name || "Uncategorized"}</div>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing">
              {product.discountPrice ? (
                <>
                  <span className="price current">Ugx {product.discountPrice.toLocaleString()}</span>
                  <span className="price original">Ugx {product.price.toLocaleString()}</span>
                  <span className="discount-badge">Sale</span>
                </>
              ) : (
                <span className="price current">Ugx {product.price.toLocaleString()}</span>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <button className="btn-primary add-to-cart-large">
                <ShoppingBag size={20} /> Add to Cart
              </button>
            </div>

            <div className="product-features">
              <div className="feature">
                <Truck size={20} />
                <div>
                  <h4>Delivery Available</h4>
                  <p>Fast delivery within Kampala</p>
                </div>
              </div>
              <div className="feature">
                <ShieldCheck size={20} />
                <div>
                  <h4>Quality Guarantee</h4>
                  <p>1 year warranty on all furniture</p>
                </div>
              </div>
              <div className="feature">
                <Clock size={20} />
                <div>
                  <h4>Support 24/7</h4>
                  <p>Dedicated customer service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
