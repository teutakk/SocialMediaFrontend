import React, { useState } from "react";
import classes from "./CreatePost.module.css";
import UserChip from "../UserChip";
import logo from "../../assets/images/starlabs.png";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/slices/postsSlice";
import PostImagePreviewer from "./PostImagePreviewer";
import { ImImages } from "react-icons/im";
const CreatePost = () => {
  const dispatch = useDispatch();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  // function to increase the height of the textbox
  const handleInputChange = (e) => {
    setPostText(e.target.value);
    e.target.style.height = "36px";
    e.target.style.height = e.target.scrollHeight + "px";
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
          placeholder="What's on your mind..."
        />
      </div>
      {imagePreviews && (
        <PostImagePreviewer
          setImagePreviews={setImagePreviews}
          imagePreviews={imagePreviews}
          setSelectedImages={setSelectedImages}
          selectedImages={selectedImages}
        />
      )}
      <hr />
      <div className={classes.Actions}>
        <label className={classes.ChooseImg} htmlFor="upload-image">
          <ImImages
            style={{
              verticalAlign: "middle",
              marginRight: "5px",
              fontSize: "1.1em",
            }}
          />
          Photo/Video
        </label>
        <input
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          type="file"
          id="upload-image"
          accept="images/*"
          multiple
        />

        <button className={classes.PostButton} type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
