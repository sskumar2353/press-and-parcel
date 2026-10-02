import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductSlider from "./ProductSlider";

export default function ProductCard({
  product,
  category,
  images = [],
}) {
  return (
    <article className="product-card">
      <ProductSlider
        images={images}
        productName={product}
      />

      <div className="product-card-content">
        <div className="product-card-category">
          {category}
        </div>

        <h3>{product}</h3>

        <div className="product-card-actions">
          <Link
            to={`/quote?product=${encodeURIComponent(product)}`}
            className="product-card-quote"
          >
            Get Quote
            <ArrowRight size={15} />
          </Link>

          <Link
            to={`/quote?product=${encodeURIComponent(product)}`}
            className="product-card-details"
          >
            Request Details
          </Link>
        </div>
      </div>
    </article>
  );
}