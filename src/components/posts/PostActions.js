import React from "react";
import classes from "./PostActions.module.css";
import LikeButton from "../LikeButton";

const PostActions = ({ post }) => {
  return (
    <div className={classes.PostActions}>
      <LikeButton post={post} />
      <div className="comment">comment</div>
      <div className="share">share</div>
    </div>
  );
};

export default PostActions;
