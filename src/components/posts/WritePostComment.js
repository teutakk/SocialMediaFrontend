import React, { useState } from "react";
import classes from "./WritePostComment.module.css";
import UserChip from "../UserChip";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../store/slices/postsSlice";
import { selectUser } from "../../store/slices/authSlice";
import logo from "../../assets/images/userSvg2.svg"

const WritePostComment = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const loggedInUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const newComment = {
      postId: post._id,
      content: commentText,
      userId: loggedInUser._id,
      commenterProfilePicture: loggedInUser?.profilePicture
    };
    console.log(newComment);
    dispatch(commentPost(newComment));
    setCommentText("");
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };
  return (
    <section className={classes.WritePostComment}>
      <UserChip width={40} heigth={40} url={loggedInUser?.profilePicture.length === 0 || loggedInUser?.profilePicture === undefined ? logo : loggedInUser?.profilePicture} />
      <form onSubmit={submitHandler} className={classes.Comment}>
        <textarea
          value={commentText}
          rows={1}
          onChange={(e) => handleChange(e)}
          id="comment"
          placeholder="Write a comment..."
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 7.001V13.001M7 10.001H13M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.89 2 14.127L1 19L5.873 18C7.109 18.639 8.513 19 10 19Z"
              stroke="#5BB381"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </section>
  );
};

export default WritePostComment;
