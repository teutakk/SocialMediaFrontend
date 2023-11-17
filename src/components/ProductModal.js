import React, { useRef, useState } from "react";
import "./productmodal.css";

const ProductModal = ({ product, closeModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesContainerRef = useRef(null);

  const scrollImages = (direction) => {
    const container = imagesContainerRef.current;
    if (container) {
      const scrollAmount =
        direction === "prev" ? -container.clientWidth : container.clientWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      // Update the currentIndex based on the scroll direction
      setCurrentIndex((prevIndex) =>
        direction === "prev"
          ? Math.max(prevIndex - 1, 0)
          : Math.min(prevIndex + 1, product.images.length - 1)
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
        <div className="modal-images" ref={imagesContainerRef}>
          <img
            src={product.images[currentIndex]}
            alt={`Product ${product.id} Image ${currentIndex}`}
            className="main-image"
          />
        </div>
        <div className="scroll-buttons">
          <button
            onClick={() => scrollImages("prev")}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={() => scrollImages("next")}
            disabled={currentIndex === product.images.length - 1}
          >
            Next
          </button>
        </div>
        <div className="modal-details">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
