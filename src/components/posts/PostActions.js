import React from "react";
import classes from "./PostActions.module.css";

const PostActions = () => {
  return (
    <div className={classes.PostActions}>
      <div className="reaction">like</div>
      <div className="comment">comment</div>
      <div className="share">share</div>
    </div>
  );
};

export default PostActions;
