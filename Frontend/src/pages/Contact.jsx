import { ArrowRight, Check, Package, Phone, Send, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="CONTACT PRESS & PARCEL" title="Let’s talk about your next project." text="Have a question, need production guidance or want to discuss a recurring business requirement? Reach out to the Press & Parcel team." />
      <section className="section contact-page">
        <div className="container contact-layout">
          <div className="contact-main">
            <div className="eyebrow">GET IN TOUCH</div>
            <h2>Choose the easiest way to reach us.</h2>
            <p>For a specific printing requirement, use the separate quote form. For general questions or partnership discussions, contact us directly.</p>
            <div className="contact-method-grid">
              <div className="contact-card"><Phone size={22} /><div><strong>Phone</strong><span>+91 78158 62707</span><small>Business enquiries & support</small></div></div>
              <div className="contact-card"><Send size={22} /><div><strong>Email</strong><span>pressndparcel@gmail.com</span><small>General enquiries & partnerships</small></div></div>
              <div className="contact-card"><Package size={22} /><div><strong>Business Hours</strong><span>Mon – Sat • 10:00 AM – 10:00 PM</span><small>Sunday by prior appointment</small></div></div>
              <div className="contact-card"><Users size={22} /><div><strong>Customer Support</strong><span>Order & production assistance</span><small>We can help refine specifications</small></div></div>
            </div>
            <div className="contact-actions"><Link className="button primary" to="/quote">Start a Quote <ArrowRight size={17} /></Link><a className="button ghost" href="mailto:pressndparcel@gmail.com">Email Us <Send size={17} /></a></div>
          </div>
          <div className="contact-side">
            <div className="contact-panel"><div className="eyebrow">PRESS & PARCEL</div><h3>Print • Brand • Package • Promote</h3><p>One partner for business stationery, packaging, apparel, signage, event materials and personalised products.</p><div className="contact-service-list">{["Custom printing", "Branding & signage", "Packaging", "Corporate merchandise", "Event materials"].map((item) => <span key={item}><Check size={15} />{item}</span>)}</div></div>
            <div className="contact-panel light"><div className="eyebrow">FOR PROJECTS</div><h3>Need pricing?</h3><p>Send the product, quantity, deadline and any artwork details. The dedicated quote page is built for project enquiries.</p><Link className="text-link" to="/quote">Go to Get a Quote <ArrowRight size={15} /></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
