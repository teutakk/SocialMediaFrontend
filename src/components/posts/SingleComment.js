import React, { useState } from "react";
import classes from "./SingleComment.module.css";
import UserChip from "../UserChip";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { likeComment } from "../../store/slices/postsSlice";
import { selectUser } from "../../store/slices/authSlice";

const SingleComment = ({ comment }) => {
  const loggedInUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(
    comment.likes?.includes(loggedInUser?._id)
  );

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
      dispatch(likeComment(data));
      setIsLiked(true);
      console.log("After dispatching likeComment");
    } catch (error) {
      console.error("Error liking comment:", error);
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
        {/* <img src={logo1} width={200} height={200} alt="photo if photo" /> */}
        <div className={classes.Actions}>
          <button onClick={handleLikeComment} disabled={isLiked}>
            {isLiked ? "Liked" : "Like"}
          </button>
          <span>Reply</span>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
