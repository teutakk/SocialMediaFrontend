import React, { useState, useEffect } from "react";
import classes from "./SingleComment.module.css";
import UserChip from "../UserChip";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { likeComment, replyComment } from "../../store/slices/postsSlice";
import { selectUser } from "../../store/slices/authSlice";
import ReplyComment from "./ReplyComment";
const SingleComment = ({ comment }) => {
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);

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
      dispatch(likeComment(data));
      setIsLiked((prevIsLiked) => !prevIsLiked);
      console.log("After dispatching likeComment");
    } catch (error) {
      console.error("Error liking/disliking comment:", error);
    }
  };

  const handleToggleReply = () => {
    setIsReplying((prevIsReplying) => !prevIsReplying);
  };

  const handleReplyComment = async () => {
    try {
      const data = {
        userId: loggedInUser?._id,
        content: replyContent,
        _id: comment._id,
      };

      dispatch(replyComment(data));
      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error("Error replying to comment:", error);
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
          <button onClick={handleToggleReply}>Reply</button>
        </div>
        {isReplying && (
          <div className={classes.ReplySection}>
            <textarea
              rows="2"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply..."
            />
            <button onClick={handleReplyComment}>Save</button>
          </div>
        )}
        {comment.replies &&
          comment.replies.map((reply) => (
            <ReplyComment key={reply._id} reply={reply} />
          ))}
      </div>
    </div>
  );
};

export default SingleComment;
