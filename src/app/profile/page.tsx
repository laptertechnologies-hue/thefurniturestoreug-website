"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Mail, LogOut, Package, Clock, MapPin } from "lucide-react";
import "./page.css";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="profile-loading">Loading Profile...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="profile-wrapper">
      <div className="container">
        <header className="page-header">
          <h1>My Profile</h1>
        </header>

        <div className="profile-layout">
          {/* Sidebar / User Info */}
          <aside className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <h2 className="profile-name">{session?.user?.name}</h2>
              <p className="profile-email">
                <Mail size={16} /> {session?.user?.email}
              </p>
              
              {/* @ts-ignore */}
              {session?.user?.role === "ADMIN" && (
                <div className="admin-badge-profile">Administrator</div>
              )}

              <div className="profile-actions">
                <button className="btn-secondary w-100 mb-3" onClick={() => router.push('/cart')}>
                  View Cart
                </button>
                <button className="btn-danger w-100" onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content / Order History */}
          <main className="profile-content">
            <div className="content-section">
              <h3 className="section-title"><Package size={20} /> Order History</h3>
              
              <div className="orders-empty">
                <Package size={48} opacity={0.2} />
                <p>You haven't placed any orders yet.</p>
                <button className="btn-primary mt-3" onClick={() => router.push('/shop')}>
                  Start Shopping
                </button>
              </div>

              {/* Example of how an order would look */}
              {/* 
              <div className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #1024</span>
                    <span className="order-date"><Clock size={14} /> June 24, 2026</span>
                  </div>
                  <span className="order-status pending">Pending</span>
                </div>
                <div className="order-body">
                  <div className="order-item">
                    <div className="item-details">
                      <h4>Modern Leather Sofa</h4>
                      <p>Qty: 1</p>
                    </div>
                    <span className="item-price">Ugx 1,200,000</span>
                  </div>
                </div>
                <div className="order-footer">
                  <div className="delivery-info">
                    <MapPin size={16} /> Deliver to Kampala, Uganda
                  </div>
                  <div className="order-total">
                    Total: <span>Ugx 1,200,000</span>
                  </div>
                </div>
              </div> 
              */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
