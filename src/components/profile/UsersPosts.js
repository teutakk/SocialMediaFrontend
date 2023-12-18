import React from "react";
import { useSelector } from "react-redux";
import { selectProfilePageUser } from "../../store/slices/profileSlice";
import { selectPosts } from "../../store/slices/postsSlice";
import SinglePost from "../posts/SinglePost";

import classes from "./UsersPosts.module.css";

const UsersPosts = () => {
  const profilePageUser = useSelector(selectProfilePageUser);
  const posts = useSelector(selectPosts);
  const profilePageUserPosts = posts.filter(
    (post) => post.userId === profilePageUser._id
  );
  console.log(profilePageUserPosts);
  return (
    <div className={classes.UsersPosts}>
      <h3>Posts</h3>
      <div className={classes.postHolder}>
        {profilePageUserPosts.reverse().map((post) => (
          <SinglePost post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default UsersPosts;
