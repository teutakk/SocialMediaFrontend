import React from "react";
import classes from "./PostContent.module.css";

const PostContent = ({ post }) => {
  const images = post.images.map((image, i) => (
    <img key={i} src={image} alt={`uploadedphoto${i}`} />
  ));

  return (
    <div className={classes.ContentHolder}>
      <div className={classes.content}>
        <p>{post.description}</p>
        <div className={classes.ImageHolder}>
          <div className={classes.first}>
            <img src={post.images[0]} />
          </div>
          <div className={classes.second}>
            <img src={post.images[1]} />
          </div>
          <div className={classes.third}>
            <div style={{ backgroundColor: "green" }}></div>
          </div>
        </div>
      </div>
      <div className={classes.PostData}>
        <div className={classes.likes}>
          <p>{post.likes.length} likes</p>
        </div>
        <div className={classes.comments}>
          <p>{post.comments.length} comments</p>
        </div>
        <div className={classes.shares}>
          <p>{post.shares} shares</p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
