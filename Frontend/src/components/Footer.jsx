import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <img src="/press-and-parcel-logo.png" alt="" />
            <div>
              <strong>Press & Parcel</strong>
              <span>Print. Brand. Deliver.</span>
            </div>
          </Link>
          <p>One partner for printing, branding, packaging, merchandise and event materials.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/products">Products</Link>
          <Link to="/industries">Industries</Link>
          <Link to="/about">About us</Link>
        </div>

        <div>
          <h4>Services</h4>
          <span>Print</span>
          <span>Brand</span>
          <span>Package</span>
          <span>Promote</span>
        </div>

        <div>
          <h4>Start a project</h4>
          <p>Tell us what you need and we’ll prepare a quote around your quantity, material and finish.</p>
          <Link className="text-link" to="/quote">
            Request a quote <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Press & Parcel. All rights reserved.</span>
        <span>Print • Brand • Package • Promote</span>
      </div>
    </footer>
  );
}
