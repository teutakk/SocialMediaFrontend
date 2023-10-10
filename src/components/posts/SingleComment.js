import React from "react";
import classes from "./SingleComment.module.css";
import UserChip from "../UserChip";
const SingleComment = ({ comment }) => {
  return (
    <div className={classes.SingleComment}>
      <UserChip url={comment.profilePhoto} />
      <div className={classes.CommentContent}>
        <div className={classes.CommentSection}>
          <p>
            <strong>{comment.userFullName}</strong>
          </p>
          <p>{comment.description}</p>
        </div>
        {/* <img src={logo1} width={200} height={200} alt="photo if photo" /> */}
        <div className={classes.Actions}>
          <span>Like</span>
          <span>Reply</span>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
