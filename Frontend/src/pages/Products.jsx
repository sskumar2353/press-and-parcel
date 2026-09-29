import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { getProductMeta, productGroups } from "../data/catalog";

export default function Products() {
  const [term, setTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(productGroups[0].products[0]);
  const selectedGroup = productGroups.find((group) => group.products.includes(selectedProduct)) || productGroups[0];
  const SelectedIcon = selectedGroup.icon;
  const meta = getProductMeta(selectedProduct, selectedGroup.title);

  const filtered = productGroups
    .map((group) => ({
      ...group,
      products: group.products.filter((product) => product.toLowerCase().includes(term.toLowerCase()))
    }))
    .filter((group) => group.title.toLowerCase().includes(term.toLowerCase()) || group.products.length);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const group = productGroups.find((item) => item.id === hash);
      if (group) setSelectedProduct(group.products[0]);
    }
  }, []);

  return (
    <>
      <PageHero eyebrow="PRODUCT CATALOGUE" title="Print it. Brand it. Package it." text="Explore every product Press & Parcel can provide. Select a product to see its use, typical applications and a visual sample preview." />
      <section className="section products-page">
        <div className="container">
          <div className="searchbar large"><Search size={19} /><input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search the complete catalogue..." /></div>
          <div className="product-explorer">
            <aside className="product-browser">
              {filtered.map((group) => {
                const Icon = group.icon;
                return (
                  <div className="product-browser-group" key={group.id}>
                    <div className="product-browser-title"><Icon size={17} /><span>{group.title}</span></div>
                    <div className="product-browser-list">
                      {group.products.map((product) => (
                        <button key={product} className={selectedProduct === product ? "product-item active" : "product-item"} onClick={() => setSelectedProduct(product)}>
                          {product}<ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </aside>

            <article className="product-detail-panel">
              <div className="product-detail-head">
                <div className="icon-box"><SelectedIcon size={23} /></div>
                <div><div className="eyebrow">{selectedGroup.title}</div><h2>{selectedProduct}</h2></div>
              </div>
              <p className="product-detail-description">{meta.description}</p>
              <div className="sample-preview" aria-label={`${selectedProduct} sample preview`}>
                <div className="sample-top"><span>PRESS & PARCEL</span><span>SAMPLE</span></div>
                <div className={`sample-art sample-${selectedGroup.id}`}>
                  <div className="sample-shape main"><span>{selectedProduct}</span></div>
                  <div className="sample-shape small one"></div><div className="sample-shape small two"></div>
                </div>
                <div className="sample-bottom"><span>Custom branding</span><span>Made to order</span></div>
              </div>
              <div className="detail-columns">
                <div><h4>Typical uses</h4><div className="detail-list">{meta.uses.map((item) => <span key={item}><Check size={15} />{item}</span>)}</div></div>
                <div><h4>Production / finish</h4><p>{meta.finish}</p></div>
              </div>
              <div className="detail-actions"><Link className="button primary" to={`/quote?product=${encodeURIComponent(selectedProduct)}`}>Request {selectedProduct} <ArrowRight size={16} /></Link><span>Need a custom size, quantity or material? Tell us in the quote.</span></div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
