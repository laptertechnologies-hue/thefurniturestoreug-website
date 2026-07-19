import "../privacy/page.css";

export const metadata = {
  title: "Terms of Service | The Furniture Store UG",
  description: "Terms and conditions for using The Furniture Store UG website and purchasing our products.",
};

export default function TermsOfServicePage() {
  return (
    <div className="privacy-container">
      <div className="container">
        <div className="privacy-header animate-fade-in-up">
          <h1>Terms of Service</h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="privacy-content animate-fade-in-up">
          <section className="privacy-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website (The Furniture Store UG), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Products and Pricing</h2>
            <p>
              All products listed on the website are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section className="privacy-section">
            <h2>3. Orders and Payments</h2>
            <p>
              When you place an order on our website, you are offering to buy the product(s) for the price stated, subject to these Terms. We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. Shipping and Delivery</h2>
            <p>
              Delivery times and costs vary depending on your location within Uganda. We will make every effort to deliver your furniture within the estimated timeframe, but delays are occasionally inevitable due to unforeseen factors. We shall be under no liability for any delay or failure to deliver the products within estimated timescales.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Returns and Refunds</h2>
            <p>
              If you are not completely satisfied with your purchase, please contact us immediately upon delivery. Due to the nature of custom-made or heavy furniture, returns are accepted on a case-by-case basis. Items must be returned in their original, unused condition.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Liability</h2>
            <p>
              The Furniture Store UG does not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. In no case shall The Furniture Store UG, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at:
            </p>
            <address>
              <strong>The Furniture Store UG</strong><br />
              Kampala, Uganda<br />
              Email: thefurniturestoreug@gmail.com<br />
              Phone: 0765245921 / 0701079360
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
