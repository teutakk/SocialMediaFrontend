import React, { useState } from "react";
import ProductModal from "../components/ProductModal";
import classes from "./styles/MarketPlace.module.css";
import CreateProductPost from "../components/CreateProductPost";

const productsData = [
  {
    id: 1,
    user: {
      id: 1,
      username: "user1",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "SAMSUNG 32” S70A Series 4K UHD",
    description:
      "SUPERIOR PICTURE QUALITY: With 4k monitor, four times more pixel density than FHD, 32 inch Samsung 4K monitor S70A series makes small text easy to read. The HDR10 makes dark colors darker and the brightest colors even brighter, every piece of content becomes a joy to look at and can be experienced exactly as the creator intended.Mounting Type: Wall Mount. Viewing Angle is 178° (H) / 178° (V); Aspect Ratio is 16:9. TRUE TO LIFE COLORS: 64x more colors than conventional monitors (1 billion colors) and HDR10 creates excellent color accuracy that shows contents exactly as the creator intended.",
    price: "160.00$",
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
    name: "SENSE7 Gaming Spellcaster Office Chair",
    description:
      "SENSE7 Gaming Spellcaster Office Chair, Gamer Ergonomic Chair, Armrest, One-Piece Steel Frame, Adjustable Tilt Angle, Black/Grey, Leather, 43-52 x 69.5 x 57 cm",
    price: "124.99€",
    images: [
      "https://m.media-amazon.com/images/I/51WHcNOk8lL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/711yerN3DqL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71WaoIHK+YL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71bxAqA+u-L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71kKFrisIZL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61rBRlnQQbL._AC_SL1500_.jpg",
    ],
  },
  {
    id: 3,
    user: {
      id: 4,
      username: "user4",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "Logitech G 923 Steering Wheel with Pedals",
    description:
      "Trueforce power back clutch: The innovative Trueforce technology is directly connected to the engines in the game and processes information 4000 times per for the absolute driving experience. Programmable double clutch system: Start with the programmable double clutch system, which simulates realistic racing car start automatically from your controller. For fast responses and best speed: Six forward gears and one reverse gear.",
    price: "320.00$",
    images: [
      "https://m.media-amazon.com/images/I/61bIrzmXU1L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/717V6WngkXL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71o7o0s8qgL._AC_SL1500_.jpg",
    ],
  },
  {
    id: 4,
    user: {
      id: 2,
      username: "user2",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "Logitech G PRO X SUPER LIGHT",
    description:
      "Wireless gaming mouse with HERO 25K sensor, ultra-lightweight with 63g, 5 programmable buttons, up to 70 hours of battery life, incl. Zero additives PTFE Feet, PC / Mac, Black",
    price: "15520.00¥",
    images: [
      "https://m.media-amazon.com/images/I/61WRvXLabPL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71SOHPB1aAL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71X63Vvz9JL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71bCRfwAHDL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71VfEUgAKYL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71kZkV8kMNL._AC_SL1500_.jpg",
    ],
  },
  {
    id: 5,
    user: {
      id: 5,
      username: "user5",
      profilePicture:
        "https://i0.wp.com/collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg?ssl=1",
    },
    name: "PlayStation®5",
    description:
      "The PS5 console opens up completely new gaming possibilities that you never expected. New, Slimmer Design: With the PS5, gamers get the same powerful gaming technology in a slim and compact console design. Enjoy lightning-fast loading with an ultra-fast SSD, a more realistic gaming experience with haptic feedback, adaptive trigger buttons and 3D audio, and an entirely new generation of incredible PlayStation games.",
    price: "550.00£",
    images: [
      "https://m.media-amazon.com/images/I/51UjxChW5fL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/6131+EjtCDL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51MlkZs2q-L._SL1500_.jpg",
      "https://stickybunny.com/cdn/shop/products/sticky-bunny-shop-ps5-controller-pure-white-ps5-controller-skin-27940993368182_600x.jpg?v=1614572112",
    ],
  },
];

const Marketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [productsData, setProductsData] = useState([productsData]);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  // const createProduct = (newProduct) => {
  //   // Add the new product to the existing productsData
  //   setProductsData((prevProducts) => [...prevProducts, newProduct]);
  // };

  return (
    <div>
      <h1 className={classes.pageTitle}>Marketplace</h1>
      <p className={classes.creationTxt}>Create a Post for Product</p>
      <div className={classes.createPostText}>
        {isCreateFormVisible ? (
          <div className={classes.creationBtns}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={classes.closeCreate}
              onClick={() => setCreateFormVisible(!isCreateFormVisible)}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span onClick={() => setCreateFormVisible(!isCreateFormVisible)}>
              Close
            </span>
          </div>
        ) : (
          <div className={classes.creationBtns}>
            <svg
              className={classes.openCreate}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={() => setCreateFormVisible(!isCreateFormVisible)}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>
          </div>
        )}
      </div>
      {isCreateFormVisible && <CreateProductPost />}
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
