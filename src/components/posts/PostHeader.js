import React, { useState } from "react";
import classes from "./PostHeader.module.css";
import { useDispatch } from "react-redux";
import { savePost } from "../../store/slices/postsSlice";

const PostHeader = ({ post }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState();
  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };
  const handleSave = () => {
    dispatch(savePost(post.id));
  };
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
        <span onClick={handleShowOptions} className={classes.button}>
          ...
        </span>
        <div
          className={`${
            showOptions
              ? `${classes.options} ${classes.showOptions}`
              : classes.options
          }`}
        >
          <p>edit</p>
          <p>report</p>
          <p onClick={handleSave}>save</p>
          <p>delete</p>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
