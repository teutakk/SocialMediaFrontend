import React, { useState } from "react";
import ProductModal from "../components/ProductModal";
import classes from "./styles/MarketPlace.module.css";

const productsData = [
  {
    id: 1,
    user: {
      id: 1,
      username: "user1",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "Product 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    price: "19.99$",
    images: [
      "https://m.media-amazon.com/images/I/81Mlvwip4dL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81k0yldEqdL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81EJnKY6azL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81JDVNpHaFS._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/718X5d-0P4L._AC_SX679_.jpg",
    ],
  },
  {
    id: 2,
    user: {
      id: 3,
      username: "user3",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "Product 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    price: "8.50$",
    images: ["image3.jpg", "image4.jpg"],
  },
  {
    id: 3,
    user: {
      id: 4,
      username: "user4",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "Product 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    price: "8.50$",
    images: ["image3.jpg", "image4.jpg"],
  },
  {
    id: 4,
    user: {
      id: 2,
      username: "user2",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "Product 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    price: "8.50$",
    images: ["image3.jpg", "image4.jpg"],
  },
  {
    id: 5,
    user: {
      id: 5,
      username: "user5",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "Product 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    price: "8.50$",
    images: ["image3.jpg", "image4.jpg"],
  },
];

const Marketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <div>
      <h1 className={classes.pageTitle}>Marketplace</h1>
      <div className={classes.productsList}>
        {productsData.map((product) => (
          <div key={product.id} className={classes.product}>
            <div className={classes.user}>
              <img src={product.user.profilePicture} />
              <p className={classes.username}>{product.user.username}</p>
            </div>
            <p className={classes.productName}>{product.name}</p>
            <p className={classes.productPrice}>{product.price}</p>
            <p className={classes.productDescription}>{product.description}</p>
            <div className={classes.productImages}>
              <img
                src={product.images[0]}
                alt={`Product ${product.id} Image 0`}
                className={classes.mainImage}
                onClick={() => openModal(product)}
              />
              <div className={classes.smallImages}>
                {product.images.slice(1, 3).map((image, index) => (
                  <img
                    onClick={() => openModal(product)}
                    key={index}
                    src={image}
                    className={classes.smallImg}
                    alt={`Product ${product.id} Image ${index + 1}`}
                  />
                ))}
                {product.images.length > 3 && (
                  <div
                    className={classes.moreImages}
                    onClick={() => openModal(product)}
                  >
                    +{product.images.length - 3} images
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Marketplace;
