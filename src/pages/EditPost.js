import React, { useEffect } from "react";
import classes from "./styles/EditPost.module.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPosts } from "../store/slices/postsSlice";

const EditPost = () => {
  const params = useParams();
  const posts = useSelector(selectPosts);

  const postForEdit = posts.find((post) => post._id === params.postId);
  console.log("post for edit: ", postForEdit);
  console.log(params);
  return <div className={classes.EditPage}></div>;
};

export default EditPost;
