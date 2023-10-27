import React, { useEffect } from "react";
import { data } from "../api/dummyData";
import SinglePost from "../components/posts/SinglePost";
import CreatePost from "../components/posts/CreatePost";
import classes from "./styles/Posts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPosts } from "../store/slices/postsSlice";
const Posts = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const reversePosts = [...posts].reverse();
  const postsShown = reversePosts.map((post, index) => (
    <SinglePost post={post} key={index} type="regular" />
  ));
  const dummyPosts = data.map((post, i) => (
    <SinglePost post={post} key={i} type="regular-dummy" />
  ));

  return (
    <div className={classes.Posts}>
      <CreatePost />
      <section className={classes.PostsHolder}>{posts}</section>
    </div>
  );
};

export default Posts;
