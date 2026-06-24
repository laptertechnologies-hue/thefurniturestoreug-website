"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import "./HeroSlider.css";

export default function HeroSlider({ slides }: { slides: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 second auto-slide
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) {
    return (
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-slide-in-left">
            <span className="badge">Premium Quality</span>
            <h1 className="hero-title">Elevate Your Space with <span>Timeless Furniture</span></h1>
            <div className="hero-actions">
              <Link href="/shop" className="btn-primary">Shop Collection <ArrowRight size={20} /></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-slider-section">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.imageData})` }}
        >
          <div className="slide-overlay">
            <div className="container slide-content">
              <span className="badge">{slide.subtitle || "Premium Quality"}</span>
              
              {slide.title ? (
                <h1 className="hero-title">{slide.title}</h1>
              ) : (
                <h1 className="hero-title">Elevate Your Space with <span>Timeless Furniture</span></h1>
              )}
              
              <div className="hero-actions">
                <Link href={slide.link || "/shop"} className="btn-primary">
                  {slide.title ? "Explore" : "Shop Collection"} <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {slides.length > 1 && (
        <>
          <button className="slider-btn prev" onClick={prevSlide}><ChevronLeft size={24} /></button>
          <button className="slider-btn next" onClick={nextSlide}><ChevronRight size={24} /></button>
          <div className="slider-dots">
            {slides.map((_, i) => (
              <button key={i} className={`dot ${i === currentIndex ? "active" : ""}`} onClick={() => setCurrentIndex(i)} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
