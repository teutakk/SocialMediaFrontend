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
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=400"
          alt="profile "
        />
        <div className={classes["user-and-date-posted"]}>
          <p>
            <strong>{post.userFullName} </strong>
          </p>
          <span className={classes.date}>10.7.2023</span>
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
