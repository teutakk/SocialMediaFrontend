import React, { useState } from "react";
import classes from "./CreatePost.module.css";
import UserChip from "../UserChip";
import logo from "../../assets/images/starlabs.png";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/slices/postsSlice";
import PostImagePreviewer from "./PostImagePreviewer";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [postText, setPostText] = useState("");
  const [showEmotions, setShowEmotions] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // function to increase the height of the textbox
  const handleInputChange = (e) => {
    setPostText(e.target.value);
    e.target.style.height = "36px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // function to toggle Feeling button
  const handleShowEmotions = () => {
    setShowEmotions((emotion) => !emotion);
  };

  // submt handler when form gets submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      username: "users_name",
      description: postText,
      images: selectedImages,
    };
    dispatch(createPost(newPost));
  };

  // function to display uploaded photos

  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    setSelectedImages(selectedFiles);
    // Create an array to store image previews
    const previews = [];
    // Iterate through selected files
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Use FileReader to read the file as a data URL
      const reader = new FileReader();

      reader.onload = (event) => {
        previews.push(event.target.result);
        // If all previews are generated, update state
        if (previews.length === selectedFiles.length) {
          setImagePreviews(previews);
        }
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.CreatePost}>
      <div className={classes.Content}>
        <UserChip url={logo} />
        <textarea
          onChange={handleInputChange}
          placeholder="What's on yout mind, our dear User?"
        />
      </div>
      {imagePreviews && (
        <PostImagePreviewer
          setImagePreviews={setImagePreviews}
          imagePreviews={imagePreviews}
          setSelectedImages={selectedImages}
          selectedImages={selectedImages}
        />
      )}
      <hr />
      <div className={classes.Actions}>
        <label className={classes.ChooseImg} htmlFor="upload-image">
          Choose File
        </label>
        <input
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          type="file"
          id="upload-image"
          accept="images/*"
          multiple
        />
        <div className={classes.Feelings}>
          <p onClick={handleShowEmotions} className={classes.FeelingsButton}>
            Feeling
          </p>
          <div
            className={`${classes.Feeling} ${
              showEmotions ? classes.ShowFeeling : ""
            }`}
          >
            <div>Happy</div>
            <div>Sad</div>
            <div>Exited</div>
            <div>Thrilled</div>
          </div>
        </div>
        <button className={classes.PostButton} type="submit">
          POST ▶
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
