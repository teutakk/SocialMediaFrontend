import React from "react";
import classes from "./ReplyComment.module.css";

const ReplyComment = ({ reply }) => {
  return (
    <div className={classes.ReplyComment}>
      <p>{reply.content}</p>
    </div>
  );
};

export default ReplyComment;
