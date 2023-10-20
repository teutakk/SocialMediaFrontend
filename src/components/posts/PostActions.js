import React from "react";
import LikeButton from "../LikeButton";
import button from "../Button.module.css";
import classes from "./PostActions.module.css";

const PostActions = ({ post }) => {
  return (
    <div className={classes.PostActions}>
      <LikeButton post={post} />
      <div className={`${button.comment} ${button.postPosition}`}>
        <div className={button.innerContent}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.966 9.966 0 0 1-4.262-.951l-4.537.93a1 1 0 0 1-1.18-1.18l.93-4.537A9.965 9.965 0 0 1 2 12Zm10-4a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Comment</p>
        </div>
      </div>
      <div className={`${button.share} ${button.postPosition}`}>
        <div className={button.innerContent}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m21 12l-7-7v4C7 10 4 15 3 20c2.5-3.5 6-5.1 11-5.1V19l7-7Z"
            />
          </svg>
          <p>Share</p>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
