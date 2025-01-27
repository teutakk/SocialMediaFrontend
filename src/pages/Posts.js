import React, { useEffect, useMemo, useState } from "react";
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

  const [currentPosts, setCurrentPosts] = useState([])
  const [visibleCount, setVisibleCount] = useState(5)

  const POSTS_INCREMENT = 5;  

  const posts = useSelector(selectPosts);

  const reversePosts = useMemo(() => [...posts].reverse(), [posts]) ;
  // const postsShown = reversePosts.map((post, index) => (
  //   <SinglePost post={post} key={index} type="regular" />
  // ));

  const dummyPosts = data.map((post, index) => (
    <SinglePost post={post} key={index} type="regular" />
  ));

  useEffect(() => {
    setCurrentPosts(reversePosts.slice(0, visibleCount))
  }, [reversePosts, visibleCount])

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = 
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY

      //load more posts when scroll to the bottom
      if( currentScroll + 100 >= scrollableHeight){
        setVisibleCount((prevCount) => Math.min(prevCount + POSTS_INCREMENT, reversePosts.length))
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [posts.length])


  return (
    <div className={classes.Posts}>
      <Stories />
      <CreatePost />
      <section className={classes.PostsHolder}>
        {currentPosts.map((post, index) => (
          <SinglePost post={post} key={index} type="regular" />
        ))}
      </section>
      {visibleCount < posts.length && (
        <p className={classes.loadingText}>Loading more posts...</p>
      )}
      {/* <section className={classes.PostsHolder}>{dummyPosts}</section> */}
    </div>
  );
};

export default Posts;
