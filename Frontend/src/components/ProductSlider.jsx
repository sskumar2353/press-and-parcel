import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductSlider({ images = [], productName = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((previousIndex) =>
        (previousIndex + 1) % images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images.length) {
    return (
      <div className="product-slider empty">
        <div className="product-image-placeholder">
          No image available
        </div>
      </div>
    );
  }

  const previousImage = () => {
    setCurrentIndex(
      (previousIndex) =>
        (previousIndex - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setCurrentIndex(
      (previousIndex) =>
        (previousIndex + 1) % images.length
    );
  };

  return (
    <div className="product-slider">
      <div className="product-slider-image-wrapper">
        {images.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt={`${productName} - image ${index + 1}`}
            className={
              index === currentIndex
                ? "product-slider-image active"
                : "product-slider-image"
            }
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="product-slider-arrow product-slider-prev"
              onClick={previousImage}
              aria-label={`Previous ${productName} image`}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              className="product-slider-arrow product-slider-next"
              onClick={nextImage}
              aria-label={`Next ${productName} image`}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="product-slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={
                  index === currentIndex
                    ? "product-slider-dot active"
                    : "product-slider-dot"
                }
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show image ${index + 1} of ${productName}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}