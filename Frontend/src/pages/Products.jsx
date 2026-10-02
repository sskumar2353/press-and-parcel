import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  getProductMeta,
  productGroups,
  productImages
} from "../data/catalog";

export default function Products() {
  const [term, setTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(
    productGroups[0].products[0]
  );
  const [currentImage, setCurrentImage] = useState(0);
  const [expandedGroup, setExpandedGroup] = useState(null);

  const selectedGroup =
    productGroups.find((group) =>
      group.products.includes(selectedProduct)
    ) || productGroups[0];

  const SelectedIcon = selectedGroup.icon;

  const meta = getProductMeta(
    selectedProduct,
    selectedGroup.title
  );

  const images = (productImages[selectedProduct] || []).filter(Boolean);

  /*
    ============================================================
    SEARCH FILTER
    ============================================================
  */

  const searchTerm = term.trim().toLowerCase();

  const filtered = productGroups
    .map((group) => {
      const titleMatches = group.title
        .toLowerCase()
        .includes(searchTerm);

      const matchingProducts = group.products.filter((product) =>
        product.toLowerCase().includes(searchTerm)
      );

      return {
        ...group,
        products:
          searchTerm && titleMatches
            ? group.products
            : matchingProducts
      };
    })
    .filter(
      (group) =>
        !searchTerm ||
        group.title.toLowerCase().includes(searchTerm) ||
        group.products.length > 0
    );

  /*
    ============================================================
    URL HASH
    ============================================================
  */

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (!hash) return;

    const group = productGroups.find(
      (item) => item.id === hash
    );

    if (group) {
      setSelectedProduct(group.products[0]);
      setExpandedGroup(group.id);
    }
  }, []);

  /*
    ============================================================
    SEARCH AUTO EXPANSION
    ============================================================
  */

  useEffect(() => {
    if (!searchTerm) return;

    const matchingGroup = productGroups.find(
      (group) =>
        group.title.toLowerCase().includes(searchTerm) ||
        group.products.some((product) =>
          product.toLowerCase().includes(searchTerm)
        )
    );

    if (matchingGroup) {
      setExpandedGroup(matchingGroup.id);
    }
  }, [searchTerm]);

  /*
    ============================================================
    RESET IMAGE WHEN PRODUCT CHANGES
    ============================================================
  */

  useEffect(() => {
    setCurrentImage(0);
  }, [selectedProduct]);

  /*
    ============================================================
    AUTO IMAGE SLIDER
    ============================================================
  */

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        (previous + 1) % images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedProduct, images.length]);

  /*
    ============================================================
    IMAGE NAVIGATION
    ============================================================
  */

  const previousImage = () => {
    if (!images.length) return;

    setCurrentImage(
      (previous) =>
        (previous - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    if (!images.length) return;

    setCurrentImage(
      (previous) =>
        (previous + 1) % images.length
    );
  };

  /*
    ============================================================
    CATEGORY ACCORDION
    ============================================================
  */

  const toggleGroup = (groupId) => {
    setExpandedGroup((previous) =>
      previous === groupId ? null : groupId
    );
  };

  /*
    ============================================================
    PRODUCT SELECTION
    ============================================================
  */

  const selectProduct = (product, groupId) => {
    setSelectedProduct(product);
    setCurrentImage(0);
    setExpandedGroup(groupId);
  };

  return (
    <>
      <PageHero
        eyebrow="PRODUCT CATALOGUE"
        title="Brand it. Print it. Package it."
        text="Explore every product Press & Parcel can provide. Select a product to see its details and visual samples."
      />

      <section className="section products-page">
        <div className="container">

          {/* ==================================================
              SEARCH
              ================================================== */}

          <div className="searchbar large">
            <Search size={19} />

            <input
              value={term}
              onChange={(event) =>
                setTerm(event.target.value)
              }
              placeholder="Search the complete catalogue..."
            />
          </div>

          {/* ==================================================
              PRODUCT EXPLORER
              ================================================== */}

          <div className="product-explorer">

            {/* =================================================
                LEFT SIDE
                ================================================= */}

            <aside className="product-browser">

              {filtered.map((group) => {
                const Icon = group.icon;
                const isExpanded =
                  expandedGroup === group.id;

                return (
                  <div
                    className={
                      isExpanded
                        ? "product-browser-group expanded"
                        : "product-browser-group"
                    }
                    key={group.id}
                  >

                    {/* CATEGORY HEADER */}

                    <button
                      type="button"
                      className={
                        isExpanded
                          ? "product-browser-title active"
                          : "product-browser-title"
                      }
                      onClick={() =>
                        toggleGroup(group.id)
                      }
                      aria-expanded={isExpanded}
                    >

                      <span className="product-browser-title-left">
                        <Icon size={17} />
                        <span>{group.title}</span>
                      </span>

                      <ChevronDown
                        size={18}
                        className={
                          isExpanded
                            ? "category-chevron rotated"
                            : "category-chevron"
                        }
                      />

                    </button>

                    {/* PRODUCT LIST */}

                    {isExpanded && (
                      <div className="product-browser-list">

                        {group.products.map((product) => (
                          <button
                            key={product}
                            type="button"
                            className={
                              selectedProduct === product
                                ? "product-item active"
                                : "product-item"
                            }
                            onClick={() =>
                              selectProduct(
                                product,
                                group.id
                              )
                            }
                          >

                            <span>{product}</span>

                            <ChevronRight
                              size={14}
                            />

                          </button>
                        ))}

                      </div>
                    )}

                  </div>
                );
              })}

              {/* NO SEARCH RESULTS */}

              {filtered.length === 0 && (
                <div className="product-search-empty">
                  No products found.
                </div>
              )}

            </aside>

            {/* =================================================
                RIGHT SIDE
                ================================================= */}

            <article className="product-detail-panel">

              {/* PRODUCT HEADER */}

              <div className="product-detail-head">

                <div className="icon-box">
                  <SelectedIcon size={23} />
                </div>

                <div>

                  <div className="eyebrow">
                    {selectedGroup.title}
                  </div>

                  <h2>{selectedProduct}</h2>

                </div>

              </div>

              {/* DESCRIPTION */}

              <p className="product-detail-description">
                {meta.description}
              </p>

              {/* =================================================
                  IMAGE SLIDER
                  ================================================= */}

              <div className="product-image-slider">

                {images.length > 0 ? (
                  <>

                    <div className="product-main-image">

                      <img
                        src={images[currentImage]}
                        alt={`${selectedProduct} ${
                          currentImage + 1
                        }`}
                      />

                      {images.length > 1 && (
                        <>
                          {/* PREVIOUS */}

                          <button
                            type="button"
                            className="product-slider-button product-slider-left"
                            onClick={previousImage}
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={22} />
                          </button>

                          {/* NEXT */}

                          <button
                            type="button"
                            className="product-slider-button product-slider-right"
                            onClick={nextImage}
                            aria-label="Next image"
                          >
                            <ChevronRight size={22} />
                          </button>
                        </>
                      )}

                    </div>

                    {/* DOTS */}

                    {images.length > 1 && (
                      <div className="product-slider-dots">

                        {images.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            className={
                              currentImage === index
                                ? "slider-dot active"
                                : "slider-dot"
                            }
                            onClick={() =>
                              setCurrentImage(index)
                            }
                            aria-label={`Show image ${
                              index + 1
                            }`}
                          />
                        ))}

                      </div>
                    )}

                  </>
                ) : (
                  <div className="product-no-image">
                    No image available
                  </div>
                )}

              </div>

              {/* =================================================
                  PRODUCT DETAILS
                  ================================================= */}

              <div className="detail-columns">

                {/* TYPICAL USES */}

                <div>

                  <h4>Typical uses</h4>

                  <div className="detail-list">

                    {meta.uses.map((item) => (
                      <span key={item}>

                        <Check size={15} />

                        {item}

                      </span>
                    ))}

                  </div>

                </div>

                {/* PRODUCTION / FINISH */}

                <div>

                  <h4>Production / finish</h4>

                  <p>{meta.finish}</p>

                </div>

              </div>

              {/* =================================================
                  ACTIONS
                  ================================================= */}

              <div className="detail-actions">

                <Link
                  className="button primary"
                  to={`/quote?product=${encodeURIComponent(
                    selectedProduct
                  )}`}
                >

                  Request {selectedProduct}

                  <ArrowRight size={16} />

                </Link>

                <span>
                  Need a custom size, quantity or material?
                  Tell us in the quote.
                </span>

              </div>

            </article>

          </div>
        </div>
      </section>
    </>
  );
}