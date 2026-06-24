import Image from "next/image";
import Link from "next/link";
import { Award, Layers, PenTool, Truck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import "./page.css";

export const dynamic = 'force-dynamic';

export default async function About() {
  const showroomSetting = await prisma.siteSetting.findUnique({
    where: { key: "about_showroom_image" }
  });
  const showroomImage = showroomSetting?.value;

  return (
    <div className="about-wrapper">
      <div className="container">
        <header className="page-header">
          <h1>About The Furniture Store</h1>
        </header>

        <section className="about-hero">
          <div className="about-content">
            <p className="lead-text">
              We have ready to take furniture and we also make on orders. Looking for Sofa sets, Dining Tables, Beds, Cushions, Center tables, Carpets, you are in the right place.
            </p>
            <p>
              With Innovation and continuous search for better materials, The Furniture Store delivers unparalleled quality furniture for your home and office including Sofa sets, beds, dining tables, office and outdoor furniture. Check out for yourself our quality furniture at any of our showrooms.
            </p>
            <Link href="/shop" className="btn-primary mt-4">
              Shop Now
            </Link>
          </div>
          <div className="about-image">
            {showroomImage ? (
              <img src={showroomImage} alt="The Furniture Store Showroom" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            ) : (
              <div className="placeholder-image">
                <span style={{color: 'var(--color-brown)'}}>Showroom Image</span>
              </div>
            )}
          </div>
        </section>

        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Award size={48} /></div>
            <h3>Quality</h3>
            <p>We offer high quality products from well renowned wood types.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Layers size={48} /></div>
            <h3>Variety</h3>
            <p>Choose from a wide range of furniture and unique designs.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><PenTool size={48} /></div>
            <h3>Custom Design</h3>
            <p>Bring a picture and we shall bring the picture to life.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><Truck size={48} /></div>
            <h3>Transportation</h3>
            <p>We offer transportation to All our clients at a reduced cost.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
