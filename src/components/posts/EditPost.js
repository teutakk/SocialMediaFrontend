import React, { useState, useEffect } from "react";
import classes from "./EditPost.module.css";
import PostHeader from "./PostHeader";
import axiosInstance from "../../api/axiosInstance";
import { API_ROUTES } from "../../api/apiConfig";
import { PiX } from "react-icons/pi";

const EditPost = ({ post }) => {
  // function to increase the height of the textbox
  const [singlePost, setSinglePost] = useState();
  const [editPostText, setEdipPostText] = useState();
  //   console.log("post: ", post);
  const handleInputChange = (e) => {
    setEdipPostText(e.target.value);
    e.target.style.height = "36px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axiosInstance.get(
          API_ROUTES.posts + "/653a33de8ebe310b14202535"
        );
        console.log("RESPONSE: ", response.data);
        setSinglePost(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPhoto();
  }, []);

  return (
    <div className={classes.Edit}>
      <PostHeader post={post} type={"modal-post"} />
      <textarea onChange={handleInputChange} value={post.description} />
      {/* <PostImagePreviewer setSelectedImages={post.images} /> */}
      <section className={classes.imageShower}>
        <div className={classes.imageHolder}>
          {post.images.map((image, i) => {
            return (
              <div key={i} className={classes.image}>
                <span>
                  <PiX />
                </span>
                <img src={image} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default EditPost;
