import React from "react";
import classes from "./PostContent.module.css";

const PostContent = ({ post }) => {
  return (
    <>
      <div className={classes.ContentHolder}>
        <p>{post.description}</p>
        <div className={classes.ImageHolder}></div>
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
    </>
  );
};

export default PostContent;
