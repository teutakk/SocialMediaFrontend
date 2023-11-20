import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addComment,
  editComment,
  deleteComment,
  likeComment,
  pinComment,
} from "../store/slices/postsSlice";

const CommentActions = ({
  postId,
  commentId,
  isPinned,
  isLiked,
  onCommentEdit,
}) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isPinning, setIsPinning] = useState(false);

  const handleAddComment = () => {
    if (commentText) {
      dispatch(
        addComment({
          postId,
          text: commentText,
        })
      );
      setCommentText("");
    }
  };

  const handleEditComment = () => {
    if (isEditing && commentText) {
      dispatch(
        editComment({
          postId,
          commentId,
          text: commentText,
        })
      );
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setCommentText(onCommentEdit);
    }
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment({ postId, commentId }));
  };

  const handleLikeComment = () => {
    if (!isLiking) {
      setIsLiking(true);
      dispatch(likeComment({ postId, commentId })).then(() => {
        setIsLiking(false);
      });
    }
  };

  const handlePinComment = () => {
    if (!isPinning) {
      setIsPinning(true);
      dispatch(pinComment({ postId, commentId, isPinned: !isPinned })).then(
        () => {
          setIsPinning(false);
        }
      );
    }
  };

  return (
    <div>
      <textarea
        rows="2"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        disabled={isEditing}
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <button onClick={handleEditComment}>
        {isEditing ? "Save Edit" : "Edit Comment"}
      </button>
      <button onClick={handleDeleteComment}>Delete Comment</button>
      <button onClick={handleLikeComment} disabled={isLiking}>
        {isLiked ? "Liked" : "Like"}
      </button>
      <button onClick={handlePinComment} disabled={isPinning}>
        {isPinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
};

export default CommentActions;
