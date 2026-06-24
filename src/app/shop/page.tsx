import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import "./page.css";

// Mock products for the UI
const MOCK_PRODUCTS = [
  { id: 1, name: "Modern Leather Sofa", category: "Living Room", price: "Ugx 1,200,000" },
  { id: 2, name: "Oak Dining Table", category: "Dining", price: "Ugx 850,000" },
  { id: 3, name: "King Size Bed Frame", category: "Bedroom", price: "Ugx 1,500,000" },
  { id: 4, name: "Ergonomic Office Chair", category: "Office", price: "Ugx 450,000" },
  { id: 5, name: "Minimalist Coffee Table", category: "Living Room", price: "Ugx 300,000" },
  { id: 6, name: "Plush Armchair", category: "Living Room", price: "Ugx 600,000" },
];

export default function Shop() {
  return (
    <div className="shop-wrapper">
      <div className="container">
        <header className="page-header">
          <h1>Shop All Furniture</h1>
          <p className="subtitle">Discover our complete collection of premium furniture.</p>
        </header>

        <div className="shop-layout">
          <aside className="shop-filters">
            <div className="filter-header">
              <h3><Filter size={18} /> Filters</h3>
            </div>
            <div className="filter-group">
              <h4>Categories</h4>
              <label><input type="checkbox" /> Living Room</label>
              <label><input type="checkbox" /> Bedroom</label>
              <label><input type="checkbox" /> Dining</label>
              <label><input type="checkbox" /> Office</label>
            </div>
          </aside>

          <main className="shop-grid">
            {MOCK_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {/* Placeholder for actual image */}
                  <div className="img-placeholder">Image</div>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <Link href={`/product/${product.id}`} className="btn-secondary w-100 mt-3" style={{ padding: '8px', fontSize: '0.9rem' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
