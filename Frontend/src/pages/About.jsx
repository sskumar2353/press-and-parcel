import PageHero from "../components/PageHero";

export default function About() {
  return (
    <>
      <PageHero eyebrow="ABOUT PRESS & PARCEL" title="A physical-branding partner, not just a printer." text="The idea behind Press & Parcel is simple: make it easier for organizations to get their print, packaging, merchandise and physical brand presence from one place." />
      <section className="section">
        <div className="container split about-split">
          <div><div className="eyebrow">THE IDEA</div><h2>From scattered vendors to one organized workflow.</h2></div>
          <div><p>Most customers don’t think in printing technologies. They think in outcomes: “I need 500 product labels”, “I need a new office branded”, “I need event material for Saturday”, or “I need packaging for my new product.”</p><p>Press & Parcel is designed around that reality. The platform connects products and industry needs into one simple quotation and order journey.</p></div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container value-grid">
          {[
            ["01", "One catalogue", "A structured catalogue across print, packaging, apparel, signage and merchandise."],
            ["02", "Industry-first discovery", "Customers can start with their field and discover what they typically need."],
            ["03", "Quote-led ordering", "Complex and custom jobs begin with a clear requirement instead of a confusing checkout."],
            ["04", "Scalable production", "The platform can support in-house production and external production partners as the business grows."]
          ].map(([number, title, description]) => <div className="value-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}
        </div>
      </section>
    </>
  );
}
