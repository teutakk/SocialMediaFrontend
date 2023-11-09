import React from "react";
import classes from "./styles/EditPost.module.css";
import { useParams } from "react-router";

const EditPost = () => {
  const params = useParams();
  console.log(params);
  return <div>Edit PAge</div>;
};

export default EditPost;
