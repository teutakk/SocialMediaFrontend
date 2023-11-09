import React, { useState } from "react";
import classes from "./CreateStory.module.css";

const CreateStory = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Object that will be sent when backend ready !!!
    const newStory = {};

    // dispatch function here to send the object !!!
  };

  return (
    <form onSubmit={handleSubmit} className={classes.createStoryContent}>
      <label className={classes.addStory} htmlFor="upload-image">
        <svg
          className={classes.addStorySVG}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
        <p>Add Story</p>
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        id="upload-image"
        accept="images/*"
        multiple
      />
    </form>
  );
};

export default CreateStory;
