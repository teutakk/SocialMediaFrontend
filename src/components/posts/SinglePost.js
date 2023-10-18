import React from "react";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import WritePostComment from "./WritePostComment";
import PostContent from "./PostContent";
import classes from "./SinglePost.module.css";
import PostComments from "./PostComments";

const SinglePost = ({ post }) => {
  return (
    <div className={classes.SinglePost}>
      <PostHeader post={post} />
      <PostContent post={post} />
      <hr />
      <PostActions post={post} />
      <hr />
      <section>
        <WritePostComment />
        <PostComments post={post} />
      </section>
    </div>
  );
};

export default SinglePost;
