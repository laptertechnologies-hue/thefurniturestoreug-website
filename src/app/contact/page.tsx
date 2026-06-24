import { Mail, Phone, MapPin, Clock } from "lucide-react";
import "./page.css";

export default function Contact() {
  return (
    <div className="contact-wrapper">
      <div className="container">
        <header className="page-header">
          <h1>Contact Us</h1>
          <p className="subtitle">We'd love to hear from you. Get in touch with our team.</p>
        </header>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon"><Phone size={24} /></div>
              <div>
                <h3>Phone Numbers</h3>
                <p>0765245921</p>
                <p>0701079360</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon"><Mail size={24} /></div>
              <div>
                <h3>Email Address</h3>
                <p>princehenrykimbugwe8@gmail.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon"><MapPin size={24} /></div>
              <div>
                <h3>Our Workshop</h3>
                <p>Kampala, Uganda</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon"><Clock size={24} /></div>
              <div>
                <h3>Working Hours</h3>
                <p>Monday to Saturday: 8:00am to 6:00pm</p>
                <p>Sunday: 10:00am to 4:00pm</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Send us a message</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="How can we help?" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} placeholder="Type your message here..." required></textarea>
              </div>

              <button type="button" className="btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
