import React from "react";
import classes from "./SingleComment.module.css";
import UserChip from "../UserChip";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectPosts } from "../../store/slices/postsSlice";
const SingleComment = ({ comment }) => {
  const posts = useSelector(selectPosts);
  const currentPost = posts.find((post) => post._id === comment.postId);
  console.log("comment content: ", comment.content);
  return (
    <div className={classes.SingleComment}>
      <UserChip url={comment.profilePhoto} />
      <div className={classes.CommentContent}>
        <div className={classes.CommentSection}>
          <div className={classes["name-and-edit"]}>
            <p>
              <strong>
                {currentPost.firstName} {currentPost.lastName}
              </strong>
            </p>
            <span>
              <BiDotsVerticalRounded />
            </span>
          </div>
          <p>{comment.content}</p>
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
