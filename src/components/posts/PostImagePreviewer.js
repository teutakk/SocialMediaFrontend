import React from "react";
import classes from "./PostImagePreviewer.module.css";

const PostImagePreviewer = ({
  imagePreviews,
  setImagePreviews,
  setSelectedImages,
  selectedImages,
}) => {
  const handleRemoveImage = (id) => {
    const uploadedImagePreviews = imagePreviews.filter((_, i) => i !== id);
    const updateSelectedImages = {};
    for (const key in selectedImages) {
      if (+key !== id) updateSelectedImages[key] = selectedImages[key];
    }
    console.log(updateSelectedImages);
    // there is still work to be done , in order to fully remove images not just from showing up, but also from the state
    setImagePreviews(uploadedImagePreviews);
    // setSelectedImages([...updateSelectedImages]);
  };
  return (
    <div className={classes.ImagePreviewer}>
      {imagePreviews.map((preview, index) => {
        return (
          <div className={classes.ImageHolder} key={index}>
            <span
              onClick={() => handleRemoveImage(index)}
              className={classes.removeImage}
            >
              x
            </span>
            <img
              src={preview}
              alt={`preview of file ${index + 1}`}
              height={200}
              width={200}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PostImagePreviewer;
