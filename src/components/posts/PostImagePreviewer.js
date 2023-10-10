import React from "react";
import classes from "./PostImagePreviewer.module.css";

const PostImagePreviewer = ({ imagePreviews, setImagePreviews }) => {
  const handleRemoveImage = (id) => {
    const uploadedImagePreviews = imagePreviews.filter((_, i) => i !== id);
    setImagePreviews(uploadedImagePreviews);
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
