import React, { useState } from "react";
import classes from "./EditInfo.module.css";

const EditInfo = ({ title, initialContent, onEdit, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onEdit(content);
    setIsEditing(false);
  };

  return (
    <div className={classes.EditInfo}>
      <p className={classes.title}>{title}</p>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className={classes.info}>
          <p className={classes.content}>{content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onRemove}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default EditInfo;
