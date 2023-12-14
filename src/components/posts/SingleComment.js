import React, { useState, useEffect } from "react";
import classes from "./SingleComment.module.css";
import UserChip from "../UserChip";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  likeComment,
  replyComment,
  deleteComment,
} from "../../store/slices/postsSlice";
import { selectUser } from "../../store/slices/authSlice";
import ReplyComment from "./ReplyComment";
import logo from "../../assets/images/userSvg2.svg"


const SingleComment = ({post, postId, comment }) => {
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
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

      dispatch(likeComment(data));
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.error("Error liking/disliking comment:", error);
    }
  };

  const handleToggleReply = () => {
    setIsReplying((prevIsReplying) => !prevIsReplying);
  };

  const handleReplyComment = async () => {

    if (!loggedInUser || !loggedInUser._id) {
      console.error("User information is missing or incomplete.");
      return;
    }

    if (!comment || !comment._id || !comment.postId) {
      console.error("Comment information is missing or incomplete.");
      return;
    }
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

  const handleDeleteComment = async () => {
    try {
      if (isDeleting) {
        return;
      }

      setIsDeleting(true);
      const data = {
        userId: loggedInUser?._id,
        _id: comment._id,
        postId: postId,
      };

      console.log(data);
      dispatch(deleteComment(data));

      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className={classes.SingleComment}>
      <UserChip
        url={
          comment?.commenterProfilePicture?.length === 0 ||
          comment?.commenterProfilePicture === undefined
            ? logo
            : comment?.commenterProfilePicture
        }
      />
      <div className={classes.CommentContent}>
        <div className={classes.CommentSection}>
          <div className={classes["name-and-edit"]}>
            <p>
              <strong>{comment.author}</strong>
            </p>
            <div className={classes.ActionSection}>
              <BiDotsVerticalRounded
                onClick={() => setShowDeleteButton(!showDeleteButton)}
              />
              {showDeleteButton && (
                <button onClick={handleDeleteComment}>Delete</button>
              )}
            </div>
          </div>
          <p>{comment.content}</p>
        </div>
        <div className={classes.Actions}>
          <button
            className={isLiked ? classes.liked : ""}
            onClick={handleLikeComment}
          >
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
        <div className={classes.RepliesContainer}>
          {comment.replies &&
            comment.replies.map((reply) => (
              <label key={reply._id} className={classes.ReplyLabel}>
                <ReplyComment reply={reply} />
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};
export default SingleComment;
