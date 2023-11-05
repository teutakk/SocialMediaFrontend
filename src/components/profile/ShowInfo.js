import React, { useState } from "react";
import classes from "./ShowInfo.module.css";
import { AiOutlineMore } from "react-icons/ai";

const ShowInfo = ({ title, initialContent, onSave, onEditMode = false }) => {
  const [isEditing, setIsEditing] = useState(onEditMode);
  const [content, setContent] = useState(initialContent);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onSave(content);
    toggleEditing();
  };

  const handleCancel = () => {
    setContent(initialContent);
    toggleEditing();
  };

  return (
    <div className={classes.ShowInfo}>
      <p className={classes.title}>{title}</p>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p className={classes.content}>{content}</p>
          <div className={classes.dropdown}>
            <AiOutlineMore onClick={toggleEditing} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowInfo;
