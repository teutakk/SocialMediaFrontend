import React from "react";
import classes from "./SingleComment.module.css";

const ReplyComment = ({ reply }) => {
  return (
    <div className={classes.ReplyComment}>
      <div className={classes.CommentContent}>
        <div className={classes.CommentSection}>
          <div className={classes["name-and-edit"]}>
            <p>
              <strong>{reply.author}</strong>
            </p>
          </div>
          <p>{reply.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
