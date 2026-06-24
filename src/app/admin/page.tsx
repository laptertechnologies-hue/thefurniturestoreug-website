"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, Users, ShoppingBag, LayoutDashboard, Settings } from "lucide-react";
import "./page.css";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // @ts-ignore
    if (status === "unauthenticated" || (session && session.user?.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [session, status, router]);

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
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} /> Users
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} /> Settings
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
                  <p>15</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Package size={24} /></div>
                <div className="stat-details">
                  <h3>Products</h3>
                  <p>24</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Users size={24} /></div>
                <div className="stat-details">
                  <h3>Customers</h3>
                  <p>8</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Orders</h2>
              <div className="empty-state">
                <ShoppingBag size={48} opacity={0.2} />
                <p>No new orders yet.</p>
              </div>
            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab === 'products' && (
          <div className="admin-products animate-fade-in-up">
            <div className="tab-header">
              <h2>Manage Products</h2>
              <button className="btn-primary">Add Product</button>
            </div>
            <div className="empty-state">
              <Package size={48} opacity={0.2} />
              <p>No products added yet.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
