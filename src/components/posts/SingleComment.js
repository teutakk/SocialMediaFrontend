import React, { useState, useEffect } from "react";
import classes from "./SingleComment.module.css";
import UserChip from "../UserChip";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { likeComment } from "../../store/slices/postsSlice";
import { selectUser } from "../../store/slices/authSlice";

const SingleComment = ({ comment }) => {
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const storedLikeStatus = localStorage.getItem(`comment_like_${comment._id}`);
  const [isLiked, setIsLiked] = useState(
    storedLikeStatus ? JSON.parse(storedLikeStatus) : false
  );

  useEffect(() => {
    localStorage.setItem(
      `comment_like_${comment._id}`,
      JSON.stringify(isLiked)
    );
  }, [isLiked, comment._id]);

  const handleLikeComment = async () => {
    try {
      if (!comment._id) {
        console.error("Comment ID is undefined.");
        return;
      }
      const data = {
        userId: loggedInUser?._id,
        id: comment._id,
      };

      console.log("Before dispatching likeComment:", data);
      await dispatch(likeComment(data));
      setIsLiked((prevIsLiked) => !prevIsLiked); // Toggle the like status
      console.log("After dispatching likeComment");
    } catch (error) {
      console.error("Error liking/disliking comment:", error);
    }
  };

  return (
    <div className={classes.SingleComment}>
      <UserChip url={comment.profilePhoto} />
      <div className={classes.CommentContent}>
        <div className={classes.CommentSection}>
          <div className={classes["name-and-edit"]}>
            <p>
              <strong>{comment.author}</strong>
            </p>
            <span>
              <BiDotsVerticalRounded />
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
        <div className={classes.Actions}>
          <button onClick={handleLikeComment}>
            {isLiked ? "Dislike" : "Like"}
          </button>
          <span>Reply</span>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
