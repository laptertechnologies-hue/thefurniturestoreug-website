"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner-overlay animate-slide-up">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <h3>We Value Your Privacy</h3>
          <p>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/privacy" className="cookie-link">Privacy Policy</Link> for more information.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button className="btn-cookie-decline" onClick={declineCookies}>Decline</button>
          <button className="btn-cookie-accept" onClick={acceptCookies}>Accept All</button>
        </div>
        <button className="cookie-close-icon" onClick={declineCookies} aria-label="Close">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
