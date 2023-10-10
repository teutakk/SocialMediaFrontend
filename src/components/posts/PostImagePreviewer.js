import React from "react";
import classes from "./PostImagePreviewer.module.css";

const PostImagePreviewer = ({ imagePreviews }) => {
  return (
    <div className={classes.ImagePreviewer}>
      {imagePreviews.map((preview, index) => {
        return (
          <img
            key={index}
            src={preview}
            alt={`preview of file ${index + 1}`}
            height={200}
            width={200}
          />
        );
      })}
    </div>
  );
};

export default PostImagePreviewer;
