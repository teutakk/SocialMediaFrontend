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
      {imagePreviews.length > 0 && (
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
            fill="none"
            className={button.uploadSvg}
          >
            <g clip-path="url(#clip0_7_387)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5 3C5 2.73478 5.10536 2.48043 5.29289 2.29289C5.48043 2.10536 5.73478 2 6 2H18C18.2652 2 18.5196 2.10536 18.7071 2.29289C18.8946 2.48043 19 2.73478 19 3C19 3.26522 18.8946 3.51957 18.7071 3.70711C18.5196 3.89464 18.2652 4 18 4H6C5.73478 4 5.48043 3.89464 5.29289 3.70711C5.10536 3.51957 5 3.26522 5 3ZM5 5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5ZM19 13.686V7H5V19H5.929L14.237 10.691C14.3531 10.5749 14.4909 10.4828 14.6426 10.4199C14.7942 10.3571 14.9568 10.3248 15.121 10.3248C15.2852 10.3248 15.4478 10.3571 15.5994 10.4199C15.7511 10.4828 15.8889 10.5749 16.005 10.691L19 13.686ZM8.5 12C8.89782 12 9.27936 11.842 9.56066 11.5607C9.84196 11.2794 10 10.8978 10 10.5C10 10.1022 9.84196 9.72064 9.56066 9.43934C9.27936 9.15804 8.89782 9 8.5 9C8.10218 9 7.72064 9.15804 7.43934 9.43934C7.15804 9.72064 7 10.1022 7 10.5C7 10.8978 7.15804 11.2794 7.43934 11.5607C7.72064 11.842 8.10218 12 8.5 12Z"
                fill="#5F5F5F"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_387">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
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
