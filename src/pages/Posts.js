import React from "react";
import { data } from "../api/dummyData";
import SinglePost from "../components/posts/SinglePost";
import CreatePost from "../components/posts/CreatePost";
import classes from "./Posts.module.css";
const Posts = () => {
  const posts = data.map((post, index) => (
    <SinglePost post={post} key={post.id} type="regular" />
  ));
  return (
    <div className={classes.Posts}>
      <CreatePost />
      <section className={classes.PostsHolder}>{posts}</section>
    </div>
  );
};

export default Posts;
