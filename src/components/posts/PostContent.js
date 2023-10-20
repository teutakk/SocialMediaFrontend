import React from "react";
import classes from "./PostContent.module.css";

const PostContent = ({ post }) => {
  console.log(post.images.length > 0);
  return (
    <div className={classes.ContentHolder}>
      <div className={classes.content}>
        <p>{post.description}</p>
        <div className={classes.ImageHolder}>
          {post.images.length > 0 && (
            <img src={post.images[1]} alt="shqiperia" />
          )}
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
