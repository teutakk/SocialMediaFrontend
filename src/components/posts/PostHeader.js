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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_190_1738)">
              <path
                d="M12 17C12.5304 17 13.0391 17.2107 13.4142 17.5858C13.7893 17.9609 14 18.4696 14 19C14 19.5304 13.7893 20.0391 13.4142 20.4142C13.0391 20.7893 12.5304 21 12 21C11.4696 21 10.9609 20.7893 10.5858 20.4142C10.2107 20.0391 10 19.5304 10 19C10 18.4696 10.2107 17.9609 10.5858 17.5858C10.9609 17.2107 11.4696 17 12 17ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10ZM12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C14 5.53043 13.7893 6.03914 13.4142 6.41421C13.0391 6.78929 12.5304 7 12 7C11.4696 7 10.9609 6.78929 10.5858 6.41421C10.2107 6.03914 10 5.53043 10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_190_1738">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
