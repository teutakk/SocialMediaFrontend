import React from "react";
import classes from "./PostHeader.module.css";

const PostHeader = ({ post }) => {
  return (
    <div className={classes.PostHeader}>
      <div className={classes["user-and-photo"]}>
        <img src={post.profilePhoto} alt="profile " />
        <div className={classes["user-and-date-posted"]}>
          <p>
            <strong>{post.userFullName} </strong>
            is feeling {post.isFeeling}
          </p>
          <div className={classes["date-and-privacy"]}>
            <span>10.7.2023</span>
            <span>{post.privacy === "public" && " P"}</span>
          </div>
        </div>
      </div>
      <div className={classes.settings}>
        <span style={{}}>...</span>
        <div className={classes.options}>
          <p>edit</p>
          <p>report</p>
          <p>save</p>
          <p>report</p>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
