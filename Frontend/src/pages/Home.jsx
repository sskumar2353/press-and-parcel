import { useState } from "react";
import { ArrowRight, ArrowUpRight, Package, Palette, Printer, Search, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { industries, productGroups } from "../data/catalog";

export default function Home() {
  const [search, setSearch] = useState("");
  const filtered = productGroups.filter((group) =>
    group.title.toLowerCase().includes(search.toLowerCase()) ||
    group.products.some((product) => product.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <section className="hero">
        <div className="hero-shape one"></div>
        <div className="hero-shape two"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> PRINT • BRAND • PACKAGE • PROMOTE</div>
            <h1>Everything your brand needs, <em>under one roof.</em></h1>
            <p className="hero-text">From business cards and packaging to apparel, signage and event displays — Press & Parcel brings your physical brand to life.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/quote">Start a Project <ArrowRight size={18} /></Link>
              <Link className="button ghost" to="/products">Explore Products</Link>
            </div>
            <div className="trust-row">
              <div><strong>14</strong><span>Product groups</span></div>
              <div><strong>60+</strong><span>Product options</span></div>
              <div><strong>6</strong><span>Industry segments</span></div>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top"><span>PRESS & PARCEL</span><span>01 / 04</span></div>
            <div className="hero-card-art">
              <div className="paper paper-a"></div>
              <div className="paper paper-b"></div>
              <div className="paper paper-c"></div>
              <div className="parcel"><Package size={64} /><span>YOUR BRAND</span></div>
            </div>
            <div className="hero-card-bottom">
              <span>Print</span><span>Brand</span><span>Package</span><span>Promote</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="container narrow center">
          <div className="eyebrow">ONE PARTNER. MANY POSSIBILITIES.</div>
          <h2>From first impression to final package.</h2>
          <p>Press & Parcel is built for businesses, institutions, events, hospitality, retail and service professionals that need physical branding without coordinating multiple vendors.</p>
        </div>
        <div className="container capability-grid">
          {[
            ["Print", "Stationery, marketing collateral, documents and display graphics.", Printer],
            ["Brand", "Signage, labels, tags, apparel and identity materials.", Palette],
            ["Package", "Boxes, sleeves, bags, labels and product presentation.", Package],
            ["Promote", "Merchandise, gifts, event materials and campaigns.", Sparkles]
          ].map(([title, text, Icon]) => (
            <div className="capability" key={title}>
              <div className="icon-box"><Icon size={22} /></div>
              <h3>{title}</h3><p>{text}</p>
              <Link to="/products">Explore <ArrowRight size={15} /></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section tinted">
        <div className="container">
          <div className="section-head">
            <div><div className="eyebrow">PRODUCT CATALOGUE</div><h2>Built around how you buy.</h2></div>
            <Link className="text-link" to="/products">View all products <ArrowRight size={15} /></Link>
          </div>
          <div className="searchbar">
            <Search size={19} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or categories..." />
          </div>
          <div className="product-grid">
            {filtered.slice(0, 6).map((group, index) => {
              const Icon = group.icon;
              return (
                <Link className="product-card" to="/products" key={group.id}>
                  <div className="card-number">0{index + 1}</div>
                  <div className="icon-box"><Icon size={21} /></div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="chip-row">{group.products.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
                  <span className="card-arrow"><ArrowUpRight size={18} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section industries-preview">
        <div className="container split">
          <div>
            <div className="eyebrow">BUILT FOR REAL BUSINESSES</div>
            <h2>One platform for every kind of customer.</h2>
            <p>Whether it’s a new startup, a church event, a restaurant launch, a school function or a corporate office, the same platform can turn requirements into a clear print and branding order.</p>
            <Link className="button dark" to="/industries">Explore industries <ArrowRight size={17} /></Link>
          </div>
          <div className="industry-cloud">
            {Object.values(industries).flat().map((item, index) => <span key={item} className={index % 5 === 0 ? "featured-pill" : ""}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="section quote-banner">
        <div className="container quote-box">
          <div><div className="eyebrow">READY WHEN YOU ARE</div><h2>Tell us what you want to print.</h2><p>Share the product, quantity, artwork and deadline. We’ll structure the requirement into a quote-ready request.</p></div>
          <Link className="button light" to="/quote">Request a Quote <Send size={17} /></Link>
        </div>
      </section>
    </>
  );
}
