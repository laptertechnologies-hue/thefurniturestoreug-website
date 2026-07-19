import "./page.css";

export const metadata = {
  title: "Privacy Policy | The Furniture Store UG",
  description: "Privacy Policy and terms of data usage for The Furniture Store UG.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-container">
      <div className="container">
        <div className="privacy-header animate-fade-in-up">
          <h1>Privacy Policy</h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="privacy-content animate-fade-in-up">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to The Furniture Store UG. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. The Data We Collect About You</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your order).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Cookies</h2>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
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
