"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Package,
  ShoppingBag,
  LayoutDashboard,
  Settings,
  Layers,
  Plus,
  Trash2,
  Edit,
  MessageSquare,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  Search,
  RotateCcw
} from "lucide-react";
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
  const [productSearch, setProductSearch] = useState("");

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
  const [newProdAvailable, setNewProdAvailable] = useState(true);
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

  // Hero & Site Settings State
  const [heroImage, setHeroImage] = useState("");
  const [heroBadge, setHeroBadge] = useState("Premium Quality • Made in Uganda");
  const [heroTitle, setHeroTitle] = useState("Elevate Your Space with");
  const [heroHighlight, setHeroHighlight] = useState("Timeless Furniture");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Discover our curated collection of handcrafted hardwood sofas, beds, dining sets, and office furniture designed for comfort, style, and lasting durability."
  );
  const [heroReviewQuote, setHeroReviewQuote] = useState(
    "Absolutely stunning craftsmanship. Transformed my living room!"
  );
  const [heroReviewAuthor, setHeroReviewAuthor] = useState("Sarah M., Kampala");
  const [promoBannerText, setPromoBannerText] = useState("");
  const [storeWhatsapp, setStoreWhatsapp] = useState("256700000000");
  const [aboutImage, setAboutImage] = useState("");
  const [aboutLeadText, setAboutLeadText] = useState("");
  const [aboutBodyText, setAboutBodyText] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

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
    const res = await fetch("/api/settings");
    if (res.ok) {
      const list = await res.json();
      if (Array.isArray(list)) {
        const map: Record<string, string> = {};
        for (const item of list) {
          if (item.key && item.value !== null) map[item.key] = item.value;
        }
        if (map.hero_image !== undefined) setHeroImage(map.hero_image);
        if (map.hero_badge) setHeroBadge(map.hero_badge);
        if (map.hero_title) setHeroTitle(map.hero_title);
        if (map.hero_highlight) setHeroHighlight(map.hero_highlight);
        if (map.hero_subtitle) setHeroSubtitle(map.hero_subtitle);
        if (map.hero_review_quote) setHeroReviewQuote(map.hero_review_quote);
        if (map.hero_review_author) setHeroReviewAuthor(map.hero_review_author);
        if (map.promo_banner_text !== undefined) setPromoBannerText(map.promo_banner_text);
        if (map.store_whatsapp) setStoreWhatsapp(map.store_whatsapp);
        if (map.about_showroom_image !== undefined) setAboutImage(map.about_showroom_image);
        if (map.about_lead_text) setAboutLeadText(map.about_lead_text);
        if (map.about_body_text) setAboutBodyText(map.about_body_text);
      }
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

  // Fast client-side image compressor (resizes large phone photos to max 1280px WebP/JPEG so pages load 10x faster)
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunction: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const MAX_DIM = 1280;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/webp", 0.82);
          setFunction(compressed.length < rawDataUrl.length ? compressed : rawDataUrl);
        } else {
          setFunction(rawDataUrl);
        }
      };
      img.onerror = () => setFunction(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
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
      setNewCatName("");
      setNewCatDesc("");
      setNewCatImage("");
      setEditingCategory(null);
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
        isAvailable: newProdAvailable,
        images: newProdImage ? [newProdImage] : []
      })
    });
    if (res.ok) {
      setNewProdName("");
      setNewProdPrice("");
      setNewProdDiscount("");
      setNewProdDesc("");
      setNewProdImage("");
      setNewProdAvailable(true);
      setEditingProduct(null);
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
    setNewProdAvailable(p.isAvailable !== false);
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
      body: JSON.stringify({
        imageData: newSlideImage || undefined,
        title: newSlideTitle,
        subtitle: newSlideSub,
        link: newSlideLink
      })
    });
    if (res.ok) {
      setNewSlideImage("");
      setNewSlideTitle("");
      setNewSlideSub("");
      setNewSlideLink("");
      setEditingSlide(null);
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
      body: JSON.stringify({
        author: newTestAuthor,
        role: newTestRole,
        content: newTestContent,
        rating: newTestRating
      })
    });
    if (res.ok) {
      setNewTestAuthor("");
      setNewTestRole("");
      setNewTestContent("");
      setNewTestRating("5");
      fetchTestimonials();
    } else alert("Failed to save testimonial");
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Delete testimonial?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) fetchTestimonials();
  };

  // ORDERS LOGIC
  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) fetchOrders();
    else alert("Failed to update order status");
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this order?")) return;
    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    if (res.ok) fetchOrders();
    else alert("Failed to delete order");
  };

  // SAVE ALL HERO & SITE SETTINGS
  const handleSaveAllSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsMsg("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            hero_image: heroImage,
            hero_badge: heroBadge,
            hero_title: heroTitle,
            hero_highlight: heroHighlight,
            hero_subtitle: heroSubtitle,
            hero_review_quote: heroReviewQuote,
            hero_review_author: heroReviewAuthor,
            promo_banner_text: promoBannerText,
            store_whatsapp: storeWhatsapp,
            about_showroom_image: aboutImage,
            about_lead_text: aboutLeadText,
            about_body_text: aboutBodyText
          }
        })
      });
      if (res.ok) {
        setSettingsMsg("All Hero & Page Settings saved and published live!");
      } else {
        alert("Failed to save settings");
      }
    } finally {
      setIsSavingSettings(false);
    }
  };

  if (status === "loading") {
    return <div className="admin-loading">Loading Dashboard...</div>;
  }

  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return null;
  }

  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  const filteredProducts = products.filter(
    (p) =>
      !productSearch.trim() ||
      p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(productSearch.toLowerCase())
  );

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
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button
            className={`admin-nav-item ${activeTab === "hero" ? "active" : ""}`}
            onClick={() => setActiveTab("hero")}
          >
            <Sparkles size={20} /> Hero &amp; Pages
          </button>
          <button
            className={`admin-nav-item ${activeTab === "categories" ? "active" : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            <Layers size={20} /> Categories ({categories.length})
          </button>
          <button
            className={`admin-nav-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={20} /> Products ({products.length})
          </button>
          <button
            className={`admin-nav-item ${activeTab === "slides" ? "active" : ""}`}
            onClick={() => setActiveTab("slides")}
          >
            <ImageIcon size={20} /> Shop Slideshow
          </button>
          <button
            className={`admin-nav-item ${activeTab === "testimonials" ? "active" : ""}`}
            onClick={() => setActiveTab("testimonials")}
          >
            <MessageSquare size={20} /> Testimonials
          </button>
          <button
            className={`admin-nav-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag size={20} /> Orders ({orders.length})
          </button>
          <button
            className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} /> Store Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <header className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <h1>Admin Control Center</h1>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", fontSize: "0.9rem" }}>
            View Live Website <ExternalLink size={16} />
          </a>
        </header>

        {activeTab === "overview" && (
          <div className="admin-overview animate-fade-in-up">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><ShoppingBag size={24} /></div>
                <div className="stat-details">
                  <h3>Total Orders</h3>
                  <p>{orders.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Package size={24} /></div>
                <div className="stat-details">
                  <h3>Products Listed</h3>
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
              <div className="stat-card">
                <div className="stat-icon"><Sparkles size={24} /></div>
                <div className="stat-details">
                  <h3>Order Value</h3>
                  <p>UGX {totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="admin-form-card" style={{ marginTop: 28 }}>
              <h3>Quick Actions</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
                <button className="btn-primary" onClick={() => setActiveTab("products")}>
                  <Plus size={16} /> Add New Product
                </button>
                <button className="btn-secondary" onClick={() => setActiveTab("categories")}>
                  <Plus size={16} /> Add Category
                </button>
                <button className="btn-secondary" onClick={() => setActiveTab("hero")}>
                  <Sparkles size={16} /> Edit Home Hero Image &amp; Text
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HERO & PAGES EDITOR TAB */}
        {activeTab === "hero" && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header">
              <h2>Customize Home Hero Section &amp; About Page</h2>
            </div>

            {settingsMsg && (
              <div style={{ background: "#d1e7dd", color: "#0f5132", padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontWeight: 600 }}>
                {settingsMsg}
              </div>
            )}

            <form onSubmit={handleSaveAllSettings} className="admin-form">
              <div className="admin-form-card">
                <h3>1. Homepage Hero Image &amp; Headlines</h3>
                <div className="form-group" style={{ marginBottom: 18 }}>
                  <label>Main Hero Image (Replaces the right-side hero photo on the Homepage)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setHeroImage)} />
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
                    <img
                      src={heroImage || "/hero.png"}
                      style={{ height: 140, width: 115, borderRadius: 10, objectFit: "cover", border: "1px solid #d7ccc8" }}
                      alt="Hero Preview"
                    />
                    {heroImage && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setHeroImage("")}
                        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px" }}
                      >
                        <RotateCcw size={15} /> Reset to Default Image
                      </button>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Hero Badge Text</label>
                    <input type="text" value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} placeholder="Premium Quality • Made in Uganda" />
                  </div>
                  <div className="form-group">
                    <label>Top Announcement Bar (Optional — leave blank to hide)</label>
                    <input type="text" value={promoBannerText} onChange={(e) => setPromoBannerText(e.target.value)} placeholder="e.g. Easter Sale: Up to 15% Off Custom Sofa Sets!" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Hero Main Headline (Line 1)</label>
                    <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Elevate Your Space with" />
                  </div>
                  <div className="form-group">
                    <label>Hero Highlighted Headline (Line 2)</label>
                    <input type="text" value={heroHighlight} onChange={(e) => setHeroHighlight(e.target.value)} placeholder="Timeless Furniture" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Hero Subtitle / Description</label>
                  <textarea rows={3} value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Floating Glass Card Review Quote</label>
                    <input type="text" value={heroReviewQuote} onChange={(e) => setHeroReviewQuote(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Floating Glass Card Reviewer Name</label>
                    <input type="text" value={heroReviewAuthor} onChange={(e) => setHeroReviewAuthor(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="admin-form-card" style={{ marginTop: 24 }}>
                <h3>2. About Us Page Image &amp; Story</h3>
                <div className="form-group">
                  <label>Showroom Image (Displayed on About Us page)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAboutImage)} />
                  <img
                    src={aboutImage || "/hero.png"}
                    style={{ height: 120, marginTop: 10, borderRadius: 8, objectFit: "cover" }}
                    alt="Showroom preview"
                  />
                </div>
                <div className="form-group">
                  <label>About Lead Paragraph</label>
                  <textarea
                    rows={2}
                    value={aboutLeadText}
                    onChange={(e) => setAboutLeadText(e.target.value)}
                    placeholder="We have ready to take furniture and we also make on orders..."
                  />
                </div>
                <div className="form-group">
                  <label>About Main Story Paragraph</label>
                  <textarea
                    rows={3}
                    value={aboutBodyText}
                    onChange={(e) => setAboutBodyText(e.target.value)}
                    placeholder="With Innovation and continuous search for better materials..."
                  />
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <button type="submit" className="btn-primary" disabled={isSavingSettings}>
                  {isSavingSettings ? "Saving & Publishing..." : "Save All Hero & Page Changes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SLIDESHOW TAB */}
        {activeTab === "slides" && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Shop Banner Slideshow</h2></div>
            <div className="admin-form-card">
              <h3>{editingSlide ? "Edit Slide" : "Add New Slide"}</h3>
              <form onSubmit={handleSaveSlide} className="admin-form">
                <div className="form-group">
                  <label>Slide Image {editingSlide && "(Leave empty to keep existing)"}</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewSlideImage)} required={!editingSlide} />
                  {newSlideImage && <img src={newSlideImage} style={{ height: 60, marginTop: 10 }} alt="preview" />}
                </div>
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Title (Optional)" value={newSlideTitle} onChange={(e) => setNewSlideTitle(e.target.value)} /></div>
                  <div className="form-group"><input type="text" placeholder="Subtitle (Optional)" value={newSlideSub} onChange={(e) => setNewSlideSub(e.target.value)} /></div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn-primary" disabled={!editingSlide && !newSlideImage}>{editingSlide ? "Update Slide" : "Add Slide"}</button>
                  {editingSlide && <button type="button" className="btn-secondary" onClick={() => { setEditingSlide(null); setNewSlideTitle(""); setNewSlideSub(""); setNewSlideLink(""); setNewSlideImage(""); }}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Image</th><th>Title</th><th>Actions</th></tr></thead>
                <tbody>
                  {slides.map((s) => (
                    <tr key={s.id}>
                      <td><img src={s.imageData} style={{ height: 50 }} alt="slide" /></td>
                      <td>{s.title || "-"}</td>
                      <td>
                        <button onClick={() => editSlide(s)} className="btn-icon-secondary" style={{ marginRight: 8 }}><Edit size={16} /></button>
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
        {activeTab === "categories" && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Categories</h2></div>
            <div className="admin-form-card">
              <h3>{editingCategory ? "Edit Category" : "Create Category"}</h3>
              <form onSubmit={handleSaveCategory} className="admin-form">
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Category Name (e.g. Sofa Sets, Beds, Dining)" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} required /></div>
                  <div className="form-group"><input type="text" placeholder="Short Description" value={newCatDesc} onChange={(e) => setNewCatDesc(e.target.value)} /></div>
                </div>
                <div className="form-group">
                  <label>Category Image (Auto-compressed for fast loading)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewCatImage)} />
                  {newCatImage && <img src={newCatImage} style={{ height: 60, marginTop: 10, borderRadius: 6 }} alt="preview" />}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn-primary">{editingCategory ? "Update" : "Add Category"}</button>
                  {editingCategory && <button type="button" className="btn-secondary" onClick={() => { setEditingCategory(null); setNewCatName(""); setNewCatDesc(""); setNewCatImage(""); }}>Cancel</button>}
                </div>
              </form>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Image</th><th>Name</th><th>Description</th><th>Actions</th></tr></thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td>{c.image ? <img src={c.image} style={{ height: 44, width: 44, objectFit: "cover", borderRadius: 6 }} alt="cat" /> : "-"}</td>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.description || "-"}</td>
                      <td>
                        <button onClick={() => editCategory(c)} className="btn-icon-secondary" style={{ marginRight: 8 }}><Edit size={16} /></button>
                        <button onClick={() => handleDeleteCategory(c.id)} className="btn-icon-danger"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && <tr><td colSpan={4}>No categories found. Create your first category above!</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Products</h2></div>
            <div className="admin-form-card">
              <h3>{editingProduct ? "Edit Product" : "Upload New Product"}</h3>
              {categories.length === 0 && (
                <div style={{ background: "#fff3cd", color: "#856404", padding: "10px 14px", borderRadius: 8, marginBottom: 14 }}>
                  Please create at least one Category first in the <strong>Categories</strong> tab before uploading products.
                </div>
              )}
              <form onSubmit={handleSaveProduct} className="admin-form">
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Product Name (e.g. L-Shaped Velvet Sofa)" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} required /></div>
                  <div className="form-group">
                    <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)} required>
                      <option value="" disabled>Select Category</option>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><input type="number" placeholder="Regular Price (UGX)" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} required /></div>
                  <div className="form-group"><input type="number" placeholder="Discount / Sale Price (Optional)" value={newProdDiscount} onChange={(e) => setNewProdDiscount(e.target.value)} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Photo (Auto-optimized for fast loading)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewProdImage)} />
                    {newProdImage && <img src={newProdImage} style={{ height: 70, marginTop: 10, borderRadius: 8 }} alt="preview" />}
                  </div>
                  <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 24 }}>
                    <input
                      type="checkbox"
                      id="prodAvailable"
                      checked={newProdAvailable}
                      onChange={(e) => setNewProdAvailable(e.target.checked)}
                      style={{ width: 18, height: 18 }}
                    />
                    <label htmlFor="prodAvailable" style={{ marginBottom: 0, cursor: "pointer" }}>In Stock / Available for Order</label>
                  </div>
                </div>
                <div className="form-group"><textarea placeholder="Detailed Description (dimensions, wood type, fabric options...)" value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} rows={3} required /></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn-primary" disabled={!newProdCategory}>{editingProduct ? "Update Product" : "Publish Product"}</button>
                  {editingProduct && <button type="button" className="btn-secondary" onClick={() => { setEditingProduct(null); setNewProdName(""); setNewProdPrice(""); setNewProdDiscount(""); setNewProdDesc(""); setNewProdImage(""); setNewProdAvailable(true); }}>Cancel</button>}
                </div>
              </form>
            </div>

            <div className="data-table-container">
              <div style={{ padding: "14px 16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: 10 }}>
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  style={{ border: "none", outline: "none", width: "100%", fontSize: "0.95rem" }}
                />
              </div>
              <table className="data-table">
                <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Discount</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.images?.[0] ? <img src={p.images[0]} style={{ height: 44, width: 44, objectFit: "cover", borderRadius: 6 }} alt="prod" /> : "-"}</td>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.category?.name || "-"}</td>
                      <td>UGX {Number(p.price).toLocaleString()}</td>
                      <td>{p.discountPrice ? `UGX ${Number(p.discountPrice).toLocaleString()}` : "-"}</td>
                      <td>
                        <button onClick={() => editProduct(p)} className="btn-icon-secondary" style={{ marginRight: 8 }}><Edit size={16} /></button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="btn-icon-danger"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && <tr><td colSpan={6}>No products found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === "testimonials" && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Testimonials</h2></div>
            <div className="admin-form-card">
              <h3>Add Customer Testimonial</h3>
              <form onSubmit={handleSaveTestimonial} className="admin-form">
                <div className="form-row">
                  <div className="form-group"><input type="text" placeholder="Customer Name" value={newTestAuthor} onChange={(e) => setNewTestAuthor(e.target.value)} required /></div>
                  <div className="form-group"><input type="text" placeholder="Location or Role (e.g. Kololo, Kampala)" value={newTestRole} onChange={(e) => setNewTestRole(e.target.value)} /></div>
                </div>
                <div className="form-group">
                  <select value={newTestRating} onChange={(e) => setNewTestRating(e.target.value)}>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
                <div className="form-group"><textarea placeholder="Testimonial Quote" value={newTestContent} onChange={(e) => setNewTestContent(e.target.value)} rows={3} required /></div>
                <button type="submit" className="btn-primary"><Plus size={16} /> Add Testimonial</button>
              </form>
            </div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Author</th><th>Quote</th><th>Rating</th><th>Actions</th></tr></thead>
                <tbody>
                  {testimonials.map((t) => (
                    <tr key={t.id}>
                      <td>{t.author}</td>
                      <td>{t.content.substring(0, 50)}...</td>
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

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Manage Customer Orders</h2></div>
            <div className="data-table-container">
              <table className="data-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td style={{ fontFamily: "monospace" }}>{o.id.substring(o.id.length - 6).toUpperCase()}</td>
                      <td>{o.customerName}<br /><small style={{ color: "var(--color-brown-light)" }}>{o.customerPhone} {o.customerAddress ? `• ${o.customerAddress}` : ""}</small></td>
                      <td>UGX {o.totalAmount.toLocaleString()}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          style={{
                            padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer",
                            backgroundColor: o.status === "PENDING" ? "#fff3cd" : o.status === "PROCESSED" ? "#cfe2ff" : o.status === "COMPLETED" ? "#d1e7dd" : "#f8d7da",
                            color: o.status === "PENDING" ? "#856404" : o.status === "PROCESSED" ? "#084298" : o.status === "COMPLETED" ? "#0f5132" : "#842029"
                          }}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSED">PROCESSED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleDeleteOrder(o.id)} className="btn-icon-danger" title="Delete Order"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan={6}>No orders found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header"><h2>Store &amp; WhatsApp Settings</h2></div>
            {settingsMsg && (
              <div style={{ background: "#d1e7dd", color: "#0f5132", padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontWeight: 600 }}>
                {settingsMsg}
              </div>
            )}
            <div className="admin-form-card">
              <h3>WhatsApp Concierge &amp; Showroom Settings</h3>
              <form onSubmit={handleSaveAllSettings} className="admin-form">
                <div className="form-group">
                  <label>Store WhatsApp Number (International format without +, e.g. 256763821042)</label>
                  <input
                    type="text"
                    value={storeWhatsapp}
                    onChange={(e) => setStoreWhatsapp(e.target.value)}
                    placeholder="256763821042"
                  />
                </div>
                <div className="form-group">
                  <label>Showroom Image (Displayed on About Us page)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAboutImage)} />
                  {aboutImage && <img src={aboutImage} style={{ height: 120, marginTop: 10, borderRadius: 8, objectFit: "cover" }} alt="preview" />}
                </div>
                <button type="submit" className="btn-primary" disabled={isSavingSettings}>
                  {isSavingSettings ? "Saving..." : "Save Settings"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
