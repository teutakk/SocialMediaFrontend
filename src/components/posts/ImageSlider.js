import React, { useState } from "react";
import classes from "./ImageSlider.module.css";
import SinglePost from "./SinglePost";
const ImageSlider = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImageHandler = () => {
    if (currentImageIndex < post.pictures.length - 1) {
      setCurrentImageIndex((currIndex) => currIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };
  const prevImageHandler = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((currIndex) => currIndex - 1);
    } else {
      setCurrentImageIndex(post.pictures.length - 1);
    }
  };

  const currentImage = <img src={post.pictures[currentImageIndex]} />;
  return (
    <div className={classes.ImageSlider}>
      <div className={classes.slider}>
        {post.pictures.length > 1 && (
          <>
            <button className={classes.arrow} onClick={prevImageHandler}>
              &larr;
            </button>
            <button className={classes.arrow} onClick={nextImageHandler}>
              &rarr;
            </button>
          </>
        )}
        <div className={classes["image-holder"]}>{currentImage}</div>
      </div>
      <div className={classes["post-content"]}>
        <SinglePost post={post} type="modal-post" />
      </div>
    </div>
  );
};

export default ImageSlider;
