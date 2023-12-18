import React, { useEffect } from "react";
import { data } from "../api/dummyData";
import SinglePost from "../components/posts/SinglePost";
import CreatePost from "../components/posts/CreatePost";
import classes from "./styles/Posts.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchSavedPosts,
  selectPosts,
} from "../store/slices/postsSlice";
import Stories from "../components/Stories";
import { selectUser } from "../store/slices/authSlice";
import { getNotifications } from "../store/slices/notificationSlice";
const Posts = () => {
  const posts = useSelector(selectPosts);

  const reversePosts = [...posts].reverse();
  const postsShown = reversePosts.map((post, index) => (
    <SinglePost post={post} key={index} type="regular" />
  ));

  const dummyPosts = data.map((post, index) => (
    <SinglePost post={post} key={index} type="regular" />
  ));

  return (
    <div className={classes.Posts}>
      <Stories />
      <CreatePost />
      <section className={classes.PostsHolder}>{postsShown}</section>
      <section className={classes.PostsHolder}>{dummyPosts}</section>
    </div>
  );
};

export default Posts;
