import React, { useState } from "react";
import classes from "./ShowInfo.module.css";

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
      <div className={classes.contentContainer}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className={classes.content}>{content}</p>
            <button
              onClick={toggleEditing}
              className={classes.editButton}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                background: "none",
                border: "1px solid grey",
                borderRadius: "32px",
                padding: "4px",
                marginLeft: "1px",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="-18 -18 60.00 60.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "2px" }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g clip-path="url(#clip0_429_11139)">
                    <path
                      d="M5 16L4 20L8 19L19.5858 7.41421C20.3668 6.63316 20.3668 5.36683 19.5858 4.58579L19.4142 4.41421C18.6332 3.63316 17.3668 3.63317 16.5858 4.41421L5 16Z"
                      stroke="#292929"
                      stroke-width="1.8719999999999999"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M15 6L18 9"
                      stroke="#292929"
                      stroke-width="1.8719999999999999"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M13 20H21"
                      stroke="#292929"
                      stroke-width="1.8719999999999999"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_429_11139">
                      <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                  </defs>
                </g>
              </svg>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowInfo;
