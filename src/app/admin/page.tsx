"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, Users, ShoppingBag, LayoutDashboard, Settings, Layers, Plus, Trash2, Edit, MessageSquare, Image as ImageIcon } from "lucide-react";
import "./page.css";
import "./forms.css";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  
  // Category Form
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatImage, setNewCatImage] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  
  // Product Form
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdDiscount, setNewProdDiscount] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdImage, setNewProdImage] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // Slide Form
  const [newSlideTitle, setNewSlideTitle] = useState("");
  const [newSlideSub, setNewSlideSub] = useState("");
  const [newSlideLink, setNewSlideLink] = useState("");
  const [newSlideImage, setNewSlideImage] = useState("");
  const [editingSlide, setEditingSlide] = useState<string | null>(null);

  // Testimonial Form
  const [newTestAuthor, setNewTestAuthor] = useState("");
  const [newTestRole, setNewTestRole] = useState("");
  const [newTestContent, setNewTestContent] = useState("");
  const [newTestRating, setNewTestRating] = useState("5");

  // Settings Form
  const [aboutImage, setAboutImage] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (status === "unauthenticated" || (session && session.user?.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    // @ts-ignore
    if (status === "authenticated" && session.user?.role === "ADMIN") {
      fetchData();
    }
  }, [status, session]);

  const fetchData = async () => {
    fetchCategories();
    fetchProducts();
    fetchSlides();
    fetchTestimonials();
    fetchOrders();
    fetchSettings();
  };

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    if (res.ok) setOrders(await res.json());
  };

  const fetchSettings = async () => {
    const res = await fetch("/api/settings?key=about_showroom_image");
    if (res.ok) {
      const data = await res.json();
      if (data.value) setAboutImage(data.value);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    if (res.ok) setCategories(await res.json());
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (res.ok) setProducts(await res.json());
  };

  const fetchSlides = async () => {
    const res = await fetch("/api/slides");
    if (res.ok) setSlides(await res.json());
  };

  const fetchTestimonials = async () => {
    const res = await fetch("/api/testimonials");
    if (res.ok) setTestimonials(await res.json());
  };

  // Base64 Uploader helper
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFunction: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFunction(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // CATEGORY LOGIC
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingCategory ? "PUT" : "POST";
    const url = editingCategory ? `/api/categories/${editingCategory}` : "/api/categories";
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName, description: newCatDesc, image: newCatImage })
    });
    if (res.ok) {
      setNewCatName(""); setNewCatDesc(""); setNewCatImage(""); setEditingCategory(null);
      fetchCategories();
    } else alert("Failed to save category");
  };

  const editCategory = (c: any) => {
    setEditingCategory(c.id);
    setNewCatName(c.name);
    setNewCatDesc(c.description || "");
    setNewCatImage(c.image || "");
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) fetchCategories();
  };

  // PRODUCT LOGIC
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `/api/products/${editingProduct}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProdName,
        price: newProdPrice,
        discountPrice: newProdDiscount || null,
        categoryId: newProdCategory,
        description: newProdDesc,
        images: newProdImage ? [newProdImage] : []
      })
    });
    if (res.ok) {
      setNewProdName(""); setNewProdPrice(""); setNewProdDiscount(""); setNewProdDesc(""); setNewProdImage(""); setEditingProduct(null);
      fetchProducts();
    } else alert("Failed to save product");
  };

  const editProduct = (p: any) => {
    setEditingProduct(p.id);
    setNewProdName(p.name);
    setNewProdPrice(p.price.toString());
    setNewProdDiscount(p.discountPrice ? p.discountPrice.toString() : "");
    setNewProdCategory(p.categoryId);
    setNewProdDesc(p.description);
    setNewProdImage(p.images?.[0] || "");
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
  };

  // SLIDES LOGIC
  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingSlide ? "PUT" : "POST";
    const url = editingSlide ? `/api/slides/${editingSlide}` : "/api/slides";
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageData: newSlideImage || undefined, title: newSlideTitle, subtitle: newSlideSub, link: newSlideLink })
    });
    if (res.ok) {
      setNewSlideImage(""); setNewSlideTitle(""); setNewSlideSub(""); setNewSlideLink(""); setEditingSlide(null);
      fetchSlides();
    } else alert("Failed to save slide");
  };

  const editSlide = (s: any) => {
    setEditingSlide(s.id);
    setNewSlideTitle(s.title || "");
    setNewSlideSub(s.subtitle || "");
    setNewSlideLink(s.link || "");
    setNewSlideImage("");
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    const res = await fetch(`/api/slides/${id}`, { method: "DELETE" });
    if (res.ok) fetchSlides();
  };

  // TESTIMONIALS LOGIC
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: newTestAuthor, role: newTestRole, content: newTestContent, rating: newTestRating })
    });
    if (res.ok) {
      setNewTestAuthor(""); setNewTestRole(""); setNewTestContent(""); setNewTestRating("5");
      fetchTestimonials();
    } else alert("Failed to save testimonial");
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Delete testimonial?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) fetchTestimonials();
  };

  // SETTINGS LOGIC
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "about_showroom_image", value: aboutImage })
    });
    if (res.ok) {
      alert("Settings saved successfully!");
    } else {
      alert("Failed to save settings");
    }
    setIsSavingSettings(false);
  };

  if (status === "loading") {
    return <div className="admin-loading">Loading Dashboard...</div>;
  }

  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return null;
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
          <button className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><LayoutDashboard size={20} /> Overview</button>
          <button className={`admin-nav-item ${activeTab === 'slides' ? 'active' : ''}`} onClick={() => setActiveTab('slides')}><ImageIcon size={20} /> Slideshow</button>
          <button className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}><Layers size={20} /> Categories</button>
          <button className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><Package size={20} /> Products</button>
          <button className={`admin-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`} onClick={() => setActiveTab('testimonials')}><MessageSquare size={20} /> Testimonials</button>
          <button className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><ShoppingBag size={20} /> Orders</button>
          <button className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> Settings</button>
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
                <div className="stat-details"><h3>Total Orders</h3><p>{orders.length}</p></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Package size={24} /></div>
                <div className="stat-details"><h3>Products</h3><p>{products.length}</p></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Layers size={24} /></div>
                <div className="stat-details"><h3>Categories</h3><p>{categories.length}</p></div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDESHOW TAB */}
        {activeTab === 'slides' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Home Slideshow</h2></div>
            <div className="admin-form-card">
              <h3>{editingSlide ? "Edit Slide" : "Add New Slide"}</h3>
              <form onSubmit={handleSaveSlide} className="admin-form">
                <div className="form-group">
                  <label>Slide Image {editingSlide && "(Leave empty to keep existing)"}</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewSlideImage)} required={!editingSlide} />
                  {newSlideImage && <img src={newSlideImage} style={{height: 60, marginTop: 10}} alt="preview" />}
                </div>
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Title (Optional)" value={newSlideTitle} onChange={e => setNewSlideTitle(e.target.value)} /></div>
                  <div className="form-group"><input type="text" placeholder="Subtitle (Optional)" value={newSlideSub} onChange={e => setNewSlideSub(e.target.value)} /></div>
                </div>
                <div style={{display: 'flex', gap: 10}}>
                  <button type="submit" className="btn-primary" disabled={!editingSlide && !newSlideImage}>{editingSlide ? "Update Slide" : "Add Slide"}</button>
                  {editingSlide && <button type="button" className="btn-secondary" onClick={() => {setEditingSlide(null); setNewSlideTitle(""); setNewSlideSub(""); setNewSlideLink(""); setNewSlideImage("")}}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Image</th><th>Title</th><th>Actions</th></tr></thead>
                <tbody>
                  {slides.map(s => (
                    <tr key={s.id}>
                      <td><img src={s.imageData} style={{height: 50}} alt="slide" /></td>
                      <td>{s.title || '-'}</td>
                      <td>
                        <button onClick={() => editSlide(s)} className="btn-icon-secondary" style={{marginRight: 8}}><Edit size={16} /></button>
                        <button onClick={() => handleDeleteSlide(s.id)} className="btn-icon-danger"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {slides.length === 0 && <tr><td colSpan={3}>No slides added</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Categories</h2></div>
            <div className="admin-form-card">
              <h3>{editingCategory ? "Edit Category" : "Create Category"}</h3>
              <form onSubmit={handleSaveCategory} className="admin-form">
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Name" value={newCatName} onChange={e => setNewCatName(e.target.value)} required /></div>
                  <div className="form-group"><input type="text" placeholder="Description" value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)} /></div>
                </div>
                <div className="form-group">
                  <label>Category Image (Optional)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewCatImage)} />
                  {newCatImage && <img src={newCatImage} style={{height: 60, marginTop: 10}} alt="preview" />}
                </div>
                <div style={{display: 'flex', gap: 10}}>
                  <button type="submit" className="btn-primary">{editingCategory ? "Update" : "Add Category"}</button>
                  {editingCategory && <button type="button" className="btn-secondary" onClick={() => {setEditingCategory(null); setNewCatName(""); setNewCatDesc(""); setNewCatImage("")}}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Image</th><th>Name</th><th>Actions</th></tr></thead>
                <tbody>
                  {categories.map(c => (
                    <tr key={c.id}>
                      <td>{c.image ? <img src={c.image} style={{height: 40}} alt="cat" /> : "-"}</td>
                      <td>{c.name}</td>
                      <td>
                        <button onClick={() => editCategory(c)} className="btn-icon-secondary" style={{marginRight: 8}}><Edit size={16} /></button>
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

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Products</h2></div>
            <div className="admin-form-card">
              <h3>{editingProduct ? "Edit Product" : "Create Product"}</h3>
              <form onSubmit={handleSaveProduct} className="admin-form">
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Name" value={newProdName} onChange={e => setNewProdName(e.target.value)} required /></div>
                  <div className="form-group">
                    <select value={newProdCategory} onChange={e => setNewProdCategory(e.target.value)} required>
                      <option value="" disabled>Select Category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><input type="number" placeholder="Regular Price (Ugx)" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} required /></div>
                  <div className="form-group"><input type="number" placeholder="Discount Price (Optional)" value={newProdDiscount} onChange={e => setNewProdDiscount(e.target.value)} /></div>
                </div>
                <div className="form-group">
                  <label>Product Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewProdImage)} />
                  {newProdImage && <img src={newProdImage} style={{height: 60, marginTop: 10}} alt="preview" />}
                </div>
                <div className="form-group"><textarea placeholder="Description" value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)} rows={3} required /></div>
                <div style={{display: 'flex', gap: 10}}>
                  <button type="submit" className="btn-primary" disabled={!newProdCategory}>{editingProduct ? "Update" : "Add Product"}</button>
                  {editingProduct && <button type="button" className="btn-secondary" onClick={() => {setEditingProduct(null); setNewProdName(""); setNewProdPrice(""); setNewProdDiscount(""); setNewProdDesc(""); setNewProdImage("")}}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Discount</th><th>Actions</th></tr></thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>{p.images?.[0] ? <img src={p.images[0]} style={{height: 40}} alt="prod" /> : "-"}</td>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>{p.discountPrice || "-"}</td>
                      <td>
                        <button onClick={() => editProduct(p)} className="btn-icon-secondary" style={{marginRight: 8}}><Edit size={16} /></button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="btn-icon-danger"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && <tr><td colSpan={5}>No products found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Testimonials</h2></div>
            <div className="admin-form-card">
              <h3>Add Testimonial</h3>
              <form onSubmit={handleSaveTestimonial} className="admin-form">
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Author Name" value={newTestAuthor} onChange={e => setNewTestAuthor(e.target.value)} required /></div>
                  <div className="form-group"><input type="text" placeholder="Role/Title (e.g. CEO)" value={newTestRole} onChange={e => setNewTestRole(e.target.value)} /></div>
                </div>
                <div className="form-group">
                  <select value={newTestRating} onChange={e => setNewTestRating(e.target.value)}>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
                <div className="form-group"><textarea placeholder="Testimonial Quote" value={newTestContent} onChange={e => setNewTestContent(e.target.value)} rows={3} required /></div>
                <button type="submit" className="btn-primary"><Plus size={16} /> Add Testimonial</button>
              </form>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Author</th><th>Quote</th><th>Rating</th><th>Actions</th></tr></thead>
                <tbody>
                  {testimonials.map(t => (
                    <tr key={t.id}>
                      <td>{t.author}</td>
                      <td>{t.content.substring(0, 30)}...</td>
                      <td>{t.rating}/5</td>
                      <td><button onClick={() => handleDeleteTestimonial(t.id)} className="btn-icon-danger"><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                  {testimonials.length === 0 && <tr><td colSpan={4}>No testimonials added</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Orders</h2></div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{fontFamily: 'monospace'}}>{o.id.substring(o.id.length - 6).toUpperCase()}</td>
                      <td>{o.customerName}<br/><small style={{color: 'var(--color-brown-light)'}}>{o.customerPhone}</small></td>
                      <td>Ugx {o.totalAmount.toLocaleString()}</td>
                      <td>
                        <span style={{
                          padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                          backgroundColor: o.status === 'PENDING' ? '#fff3cd' : '#d1e7dd',
                          color: o.status === 'PENDING' ? '#856404' : '#0f5132'
                        }}>
                          {o.status}
                        </span>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan={5}>No orders found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Site Settings</h2></div>
            <div className="admin-form-card">
              <h3>About Us Page</h3>
              <form onSubmit={handleSaveSettings} className="admin-form">
                <div className="form-group">
                  <label>Showroom Image (Displayed on About Us page)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAboutImage)} />
                  {aboutImage && <img src={aboutImage} style={{height: 120, marginTop: 10, borderRadius: 8, objectFit: 'cover'}} alt="preview" />}
                </div>
                <button type="submit" className="btn-primary" disabled={isSavingSettings}>{isSavingSettings ? "Saving..." : "Save Settings"}</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
