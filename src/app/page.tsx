import Link from "next/link";
import { ArrowRight, Star, Quote, ShieldCheck, Truck, Sparkles, Hammer, MessageCircle, ShoppingBag } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/prisma";
import "./page.css";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [categories, featuredProducts, testimonials, siteSettings] = await Promise.all([
    prisma.category.findMany({ take: 6, orderBy: { name: 'asc' } }),
    prisma.product.findMany({
      where: { isAvailable: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.testimonial.findMany({ take: 6, orderBy: { createdAt: 'desc' } }),
    prisma.siteSetting.findMany()
  ]);

  const settingsMap: Record<string, string> = {};
  for (const s of siteSettings) {
    if (s.value) settingsMap[s.key] = s.value;
  }

  const heroBadge = settingsMap.hero_badge || "Premium Quality • Made in Uganda";
  const heroTitle = settingsMap.hero_title || "Elevate Your Space with";
  const heroHighlight = settingsMap.hero_highlight || "Timeless Furniture";
  const heroSubtitle =
    settingsMap.hero_subtitle ||
    "Discover our curated collection of handcrafted hardwood sofas, beds, dining sets, and office furniture designed for comfort, style, and lasting durability.";
  const heroImage = settingsMap.hero_image || "/hero.png";
  const heroReviewQuote =
    settingsMap.hero_review_quote || "Absolutely stunning craftsmanship. Transformed my living room!";
  const heroReviewAuthor = settingsMap.hero_review_author || "Sarah M., Kampala";
  const promoBanner = settingsMap.promo_banner_text || "";
  const whatsappNumber = (settingsMap.store_whatsapp || "256700000000").replace(/[^0-9]/g, "");

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

      {promoBanner && (
        <div className="promo-top-banner">
          <div className="container promo-banner-inner">
            <Sparkles size={15} />
            <span>{promoBanner}</span>
            <Link href="/shop" className="promo-banner-link">Shop Now &rarr;</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-slide-in-left">
            <span className="badge">{heroBadge}</span>
            <h1 className="hero-title">
              {heroTitle} <span>{heroHighlight}</span>
            </h1>
            <p className="hero-subtitle">{heroSubtitle}</p>
            <div className="hero-actions">
              <Link href="/shop" className="btn-primary">
                Shop Collection <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="btn-secondary">
                Our Story
              </Link>
            </div>

            <div className="hero-quick-stats">
              <div>
                <strong>100% Hardwood</strong>
                <span>Kiln-Dried Timber</span>
              </div>
              <div className="stat-divider" />
              <div>
                <strong>Custom Orders</strong>
                <span>Built to Your Size</span>
              </div>
              <div className="stat-divider" />
              <div>
                <strong>Fast Delivery</strong>
                <span>Kampala &amp; Nationwide</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper animate-fade-in-up">
            <div className="hero-image-placeholder">
              <img
                src={heroImage}
                alt={`${heroTitle} ${heroHighlight}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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
              <p className="review">&ldquo;{heroReviewQuote}&rdquo;</p>
              <p className="reviewer">- {heroReviewAuthor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value / Trust Strip */}
      <section className="trust-strip">
        <div className="container trust-strip-grid">
          <div className="trust-item">
            <div className="trust-icon"><Hammer size={22} /></div>
            <div>
              <h4>Master Craftsmanship</h4>
              <p>Handcrafted from select Ugandan hardwoods</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Sparkles size={22} /></div>
            <div>
              <h4>Bespoke Custom Design</h4>
              <p>Bring any photo or dimension—we build it</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Truck size={22} /></div>
            <div>
              <h4>Safe Doorstep Delivery</h4>
              <p>Careful handling &amp; assembly at your home</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><ShieldCheck size={22} /></div>
            <div>
              <h4>Showroom Quality</h4>
              <p>Inspect ready pieces or order custom finishes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-preview">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Curated Spaces</span>
              <h2>Shop by Category</h2>
            </div>
            <Link href="/categories" className="link-arrow">View All Categories <ArrowRight size={16} /></Link>
          </div>
          <div className="category-grid">
            {categories.map((cat, i) => (
              <Link href={`/category/${cat.id}`} key={cat.id} className="category-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="category-image">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="category-fallback-icon"><ShoppingBag size={32} /></div>
                  )}
                </div>
                <h3>{cat.name}</h3>
                {cat.description && <p className="category-card-desc">{cat.description}</p>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / New Arrival Products */}
      {featuredProducts.length > 0 && (
        <section className="featured-products-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">Fresh From Our Workshop</span>
                <h2>Featured Collection</h2>
              </div>
              <Link href="/shop" className="link-arrow">Explore Full Catalog <ArrowRight size={16} /></Link>
            </div>

            <div className="home-products-grid">
              {featuredProducts.map((product) => {
                const hasDiscount = product.discountPrice && product.discountPrice < product.price;
                const displayPrice = hasDiscount ? product.discountPrice! : product.price;
                return (
                  <div key={product.id} className="home-product-card">
                    <Link href={`/product/${product.id}`} className="home-product-img-wrap">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} loading="lazy" />
                      ) : (
                        <div className="home-product-no-img"><ShoppingBag size={36} /></div>
                      )}
                      {hasDiscount && <span className="home-discount-badge">Sale</span>}
                      {product.category?.name && (
                        <span className="home-category-pill">{product.category.name}</span>
                      )}
                    </Link>

                    <div className="home-product-body">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="home-product-title">{product.name}</h3>
                      </Link>
                      <div className="home-product-price-row">
                        <div>
                          <span className="home-price-current">UGX {displayPrice.toLocaleString()}</span>
                          {hasDiscount && (
                            <span className="home-price-old">UGX {product.price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="home-product-actions">
                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Custom Order Banner */}
      <section className="custom-order-cta">
        <div className="container">
          <div className="custom-order-box">
            <div className="custom-order-text">
              <span className="badge" style={{ marginBottom: 12 }}>Bespoke Workshop</span>
              <h2>Have a Custom Furniture Design in Mind?</h2>
              <p>
                Send us a photo, sketch, or room dimensions. Our craftsmen will build your sofa set, bed, dining table, or office furniture in your exact fabric and wood finish.
              </p>
            </div>
            <div className="custom-order-buttons">
              <Link href="/contact" className="btn-primary">
                Request Custom Quote <ArrowRight size={18} />
              </Link>
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello The Furniture Store UG, I would like to inquire about a custom furniture order.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-eyebrow">Verified Buyers</span>
            <h2>What Our Customers Say</h2>
            <p>Don&apos;t just take our word for it. Here is what homeowners and offices are saying about The Furniture Store UG.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.map((test) => (
                <div key={test.id} className="testimonial-card">
                  <div className="quote-icon"><Quote size={32} /></div>
                  <div className="rating">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} fill={idx < test.rating ? "var(--color-accent)" : "none"} color={idx < test.rating ? "var(--color-accent)" : "var(--color-brown-light)"} />
                    ))}
                  </div>
                  <p className="review-text">&ldquo;{test.content}&rdquo;</p>
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
