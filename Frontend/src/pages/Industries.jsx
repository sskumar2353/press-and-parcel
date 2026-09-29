import { Check, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PageHero from "../components/PageHero";
import { industries, industryUseCases } from "../data/catalog";

export default function Industries() {
  const [selected, setSelected] = useState("Corporate");
  const current = industryUseCases[selected] || [];

  return (
    <>
      <PageHero eyebrow="INDUSTRIES" title="Designed around your field." text="Different industries need different combinations of print, branding, packaging, signage and merchandise. Choose a field to see the typical requirements." />
      <section className="section">
        <div className="container industry-layout">
          <aside className="industry-sidebar">
            {Object.entries(industries).map(([category, list]) => (
              <div key={category} className="industry-category">
                <h4>{category}</h4>
                {list.map((item) => (
                  <button key={item} className={selected === item ? "industry-btn active" : "industry-btn"} onClick={() => setSelected(item)}>
                    {item}<ChevronRight size={15} />
                  </button>
                ))}
              </div>
            ))}
          </aside>

          <div className="industry-detail">
            <div className="eyebrow">WHAT WE CAN SUPPORT</div>
            <h2>{selected}</h2>
            <p>Press & Parcel can become a single print and branding partner for the physical requirements of a <strong>{selected}</strong> customer.</p>
            <div className="usecase-grid">{current.map((item) => <div className="usecase" key={item}><Check size={18} /><span>{item}</span></div>)}</div>
            <div className="industry-cta"><div><strong>Need something not listed?</strong><span>Tell us the requirement and we can build it into the request.</span></div><Link className="button primary" to={`/quote?industry=${encodeURIComponent(selected)}`}>Request for {selected} <ArrowRight size={16} /></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
