import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startEdit,
  finishEdit,
  savePost,
  selectEditState,
} from "../../store/slices/postsSlice";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import WritePostComment from "./WritePostComment";
import PostContent from "./PostContent";
import classes from "./SinglePost.module.css";
import PostComments from "./PostComments";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const editState = useSelector(selectEditState);
  const isEditing = editState === post.id; // Check if the post is currently being edited

  const [editedContent, setEditedContent] = useState(post.content);

  const handleEditClick = () => {
    dispatch(startEdit(post.id)); // Start editing the post
  };

  const handleEditSave = () => {
    dispatch(savePost({ id: post.id, content: editedContent })); // Save the edited post
    dispatch(finishEdit()); // Finish editing
  };

  const isOwner = currentUser && currentUser.id === post.owner.id;

  return (
    <div className={classes.SinglePost}>
      <PostHeader post={post} />
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleEditSave}>Save</button>
          <button onClick={() => dispatch(finishEdit())}>Cancel</button>
        </div>
      ) : (
        <PostContent post={post} />
      )}

      {isOwner && !isEditing && (
        <div>
          <hr />
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}

      <hr />
      <PostActions />
      <hr />
      <section>
        <WritePostComment />
        <PostComments post={post} />
      </section>
    </div>
  );
};

export default SinglePost;
