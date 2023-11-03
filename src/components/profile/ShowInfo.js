import React, { useState } from "react";
import classes from "./ShowInfo.module.css";
import { AiOutlineMore } from "react-icons/ai";
import EditInfo from "./EditInfo";

const ShowInfo = ({ title, content, onEdit, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onEdit(editedContent);
    setIsEditing(false);
  };

  return (
    <div className={classes.ShowInfo}>
      <p className={classes.title}>{title}</p>
      {isEditing ? (
        <EditInfo
          title={title}
          initialContent={editedContent}
          onEdit={setEditedContent}
          onRemove={onRemove}
        />
      ) : (
        <div>
          <p className={classes.content}>{editedContent}</p>
          <div className={classes.dropdown}>
            <AiOutlineMore onClick={toggleEditing} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowInfo;
