import React, { useState, useEffect, useRef } from "react";
import classes from "./EditPost.module.css";
import { PiX } from "react-icons/pi";

const EditPost = ({ post, onChangeDataHandler, type }) => {
  // function to increase the heigh
  const [editPostText, setEdipPostText] = useState(post.description);
  const [editedImages, setEditedImages] = useState(post.pictures);
  const textareaRef = useRef(null);

  console.log("editedImages: ", editedImages);

  useEffect(() => {
    onChangeDataHandler({
      description: editPostText,
      pictures: editedImages,
      _id: post._id,
    });
  }, [editPostText, editedImages, post._id]);

  const handleInputChange = (e) => {
    setEdipPostText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const removeImageHandler = (image) => {
    const updatedImages = editedImages.filter((img) => img !== image);
    setEditedImages(updatedImages);
  };

  useEffect(() => {
    const textAreaLength = textareaRef.current.value?.length;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    textareaRef.current.setSelectionRange(textAreaLength, textAreaLength);
    textareaRef.current.focus();
  }, []);

  useEffect(() => {}, [editedImages]);

  return (
    <div className={classes.Edit}>
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
                  <span onClick={() => removeImageHandler(image)}>
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
