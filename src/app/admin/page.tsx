"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, Users, ShoppingBag, LayoutDashboard, Settings, Layers, Plus, Trash2 } from "lucide-react";
import "./page.css";
import "./forms.css";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  // Category Form
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  
  // Product Form
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdImage, setNewProdImage] = useState("");

  useEffect(() => {
    // @ts-ignore
    if (status === "unauthenticated" || (session && session.user?.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    // @ts-ignore
    if (status === "authenticated" && session.user?.role === "ADMIN") {
      fetchCategories();
      fetchProducts();
    }
  }, [status, session]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    if (res.ok) {
      setCategories(await res.json());
    }
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (res.ok) {
      setProducts(await res.json());
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName, description: newCatDesc })
    });
    if (res.ok) {
      setNewCatName("");
      setNewCatDesc("");
      fetchCategories();
    } else {
      alert("Failed to create category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure? This will fail if products exist in this category.")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) fetchCategories();
    else alert("Failed to delete category");
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProdName,
        price: newProdPrice,
        categoryId: newProdCategory,
        description: newProdDesc,
        images: newProdImage
      })
    });
    if (res.ok) {
      setNewProdName("");
      setNewProdPrice("");
      setNewProdDesc("");
      setNewProdImage("");
      fetchProducts();
    } else {
      alert("Failed to create product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
    else alert("Failed to delete product");
  };

  if (status === "loading") {
    return <div className="admin-loading">Loading Dashboard...</div>;
  }

  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return null; // Redirecting...
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-user-profile">
          <div className="avatar">{session.user?.name?.charAt(0) || "A"}</div>
          <div className="user-info">
            <h4>{session.user?.name}</h4>
            <span className="badge-admin">Administrator</span>
          </div>
        </div>

        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Layers size={20} /> Categories
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} /> Products
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} /> Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <header className="admin-header">
          <h1>Dashboard</h1>
        </header>

        {activeTab === 'overview' && (
          <div className="admin-overview animate-fade-in-up">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><ShoppingBag size={24} /></div>
                <div className="stat-details">
                  <h3>Total Orders</h3>
                  <p>0</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Package size={24} /></div>
                <div className="stat-details">
                  <h3>Products</h3>
                  <p>{products.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Layers size={24} /></div>
                <div className="stat-details">
                  <h3>Categories</h3>
                  <p>{categories.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header">
              <h2>Manage Categories</h2>
            </div>
            
            <div className="admin-form-card">
              <h3>Create New Category</h3>
              <form onSubmit={handleCreateCategory} className="admin-form">
                <div className="form-group">
                  <input type="text" placeholder="Category Name" value={newCatName} onChange={e => setNewCatName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Description (Optional)" value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary"><Plus size={16} /> Add Category</button>
              </form>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(c => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.description}</td>
                      <td>
                        <button onClick={() => handleDeleteCategory(c.id)} className="btn-icon-danger"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && <tr><td colSpan={3}>No categories found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header">
              <h2>Manage Products</h2>
            </div>

            <div className="admin-form-card">
              <h3>Create New Product</h3>
              <form onSubmit={handleCreateProduct} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="Product Name" value={newProdName} onChange={e => setNewProdName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <input type="number" placeholder="Price (Ugx)" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <select value={newProdCategory} onChange={e => setNewProdCategory(e.target.value)} required>
                    <option value="" disabled>Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Image URL (e.g. https://example.com/sofa.jpg)" value={newProdImage} onChange={e => setNewProdImage(e.target.value)} />
                </div>
                <div className="form-group">
                  <textarea placeholder="Description" value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)} rows={3} required />
                </div>
                <button type="submit" className="btn-primary" disabled={!newProdCategory}><Plus size={16} /> Add Product</button>
              </form>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.category?.name}</td>
                      <td>Ugx {p.price}</td>
                      <td>
                        <button onClick={() => handleDeleteProduct(p.id)} className="btn-icon-danger"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && <tr><td colSpan={4}>No products found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header">
              <h2>Manage Orders</h2>
            </div>
            <div className="empty-state">
              <ShoppingBag size={48} opacity={0.2} />
              <p>No orders yet.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
