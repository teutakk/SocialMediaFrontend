import React, { useState } from "react";
import classes from "./CreatePost.module.css";
import UserChip from "../UserChip";
import logo from "../../assets/images/starlabs.png";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/slices/postsSlice";
import PostImagePreviewer from "./PostImagePreviewer";
import button from "../Button.module.css";

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

      <div className={classes.Actions}>
        <label className={button.upload} htmlFor="upload-image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={button.uploadSvg}
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
              <path
                fill="currentColor"
                d="M5 3a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm0 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5Zm14 8.686V7H5v12h.929l8.308-8.309a1.25 1.25 0 0 1 1.768 0L19 13.686ZM8.5 12a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"
              />
            </g>
          </svg>
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
        <button className={button.post} type="submit">
          POST
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
