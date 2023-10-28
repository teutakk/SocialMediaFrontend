import React, { useState, useEffect, useRef } from "react";
import classes from "./EditPost.module.css";
import PostHeader from "./PostHeader";
import axiosInstance from "../../api/axiosInstance";
import { API_ROUTES } from "../../api/apiConfig";
import { PiX } from "react-icons/pi";

const EditPost = ({ post, onChangeDataHandler }) => {
  // function to increase the heigh
  const [editPostText, setEdipPostText] = useState(post.description);
  const [editedImages, setEditedImages] = useState(post.images);
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    console.log("handling: EditPost", editPostText, editedImages);
    onChangeDataHandler({
      description: editPostText,
      images: editedImages,
    });
    setEdipPostText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const removeImageHandler = (id) => {
    console.log("running: ", id);
    const updatedImages = [...editedImages];
    updatedImages.pop(id, 1);
    console.log(updatedImages);
    setEditedImages(updatedImages);
  };

  useEffect(() => {
    const textAreaLength = textareaRef.current.value?.length;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    textareaRef.current.setSelectionRange(textAreaLength, textAreaLength);
    textareaRef.current.focus();
  }, []);

  return (
    <div className={classes.Edit}>
      <PostHeader post={post} type={"modal-post"} />
      <textarea
        ref={textareaRef}
        onChange={handleInputChange}
        value={editPostText}
      />
      {/* <PostImagePreviewer setSelectedImages={post.images} /> */}
      {editedImages?.length > 0 && (
        <section className={classes.imageShower}>
          <div className={classes.imageHolder}>
            {editedImages.map((image, i) => {
              return (
                <div key={i} className={classes.image}>
                  <span onClick={() => removeImageHandler(i)}>
                    <PiX />
                  </span>
                  <img src={image} />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default EditPost;
