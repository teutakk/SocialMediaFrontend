import React, { useState } from "react";
import classes from "./CreateProductPost.module.css";
import button from "./Button.module.css";

const CreateProductPost = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    currency: "$",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const currencies = ["$", "€", "£", "¥"]; // Add more currencies as needed

  const handleCurrencySelect = (currency) => {
    setFormData((prevData) => ({
      ...prevData,
      currency,
    }));
    setDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.concat(imageArray),
    }));
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageModalOpen(false);
  };

  const removeImage = (index, e) => {
    e.preventDefault(); // Prevent the form submission
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  return (
    <div className={classes.createProductForm}>
      <h2>Create a New Product's Post</h2>
      <form className={classes.productForm} /* onSubmit={handleSubmit} */>
        <label className={classes.productLabel}>
          <p>Product Name:</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={classes.productNameInput}
          />
        </label>
        <label className={classes.productLabel}>
          <p>Description:</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className={classes.productDescriptionInput}
          />
        </label>
        <label className={classes.productLabel}>
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className={classes.productPriceInput}
          />
          <div className={classes.currencyDropdown}>
            <i
              className={classes.currencyIcon}
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              {formData.currency}
            </i>
            {isDropdownOpen && (
              <div className={classes.currencyOptions}>
                {currencies.map((currency) => (
                  <div
                    key={currency}
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    {currency}
                  </div>
                ))}
              </div>
            )}
          </div>
        </label>
        <label className={classes.productLabel}>
          <p>Images:</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>
        {/* Image Preview */}
        {formData.images.length > 0 && (
          <div className={classes.imagePreview}>
            {formData.images.map((image, index) => (
              <div key={index} className={classes.imageContainer}>
                <img
                  src={image}
                  alt={`Image Preview ${index + 1}`}
                  onClick={() => openImageModal(image)}
                />
                <button
                  className={`${classes.deleteButton} ${classes.btnMargin}`}
                  onClick={(e) => removeImage(index, e)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <button type="submit" className={`${button.post} ${classes.btnMargin}`}>
          POST
        </button>
      </form>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className={classes.imageModal} onClick={closeImageModal}>
          <button className={`${classes.closeModal} ${classes.btnMargin}`}>
            Close
          </button>
          <img
            src={selectedImage}
            alt="Selected Image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default CreateProductPost;
