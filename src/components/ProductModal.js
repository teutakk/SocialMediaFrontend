import React, { useRef, useState } from "react";
import classes from "./ProductModal.module.css";

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
    <div className={classes.modalContainer}>
      <div className={classes.modalContent}>
        <button className={classes.closeModal} onClick={closeModal}>
          Close
        </button>
        <div className={classes.modalImages} ref={imagesContainerRef}>
          <img
            src={product.images[currentIndex]}
            alt={`Product ${product.id} Image ${currentIndex}`}
            className={classes.mainImage}
          />
        </div>
        <div className={classes.scrollButtons}>
          <button
            onClick={() => scrollImages("prev")}
            disabled={currentIndex === 0}
            className={classes.previousBtn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
            </svg>
          </button>
          <button
            onClick={() => scrollImages("next")}
            disabled={currentIndex === product.images.length - 1}
            className={classes.nextBtn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
          </button>
        </div>
        <div className={classes.modalDetails}>
          <h3 className={classes.userName}>{product.user.username}</h3>
          <h2 className={classes.productName}>{product.name}</h2>
          <p className={classes.productDesc}>{product.description}</p>
          <p className={classes.productPrice}>{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
