import React, { useEffect, useRef, useState } from "react";
import classes from "./PostHeader.module.css";
import { useDispatch } from "react-redux";
import { savePost } from "../../store/slices/postsSlice";
import { CiEdit } from "react-icons/ci";
import { MdOutlineReport, MdDelete } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

const PostHeader = ({ post, type }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState();
  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };
  const settingsIconRef = useRef();
  const settingsSectionRef = useRef();
  const handleSave = () => {
    dispatch(savePost(post.id));
  };

  useEffect(() => {
    // we get the Notifications element
    const settingsIconClass = settingsIconRef.current?.classList[0];
    const parentClass = settingsSectionRef.current?.classList[0];
    // if the target clicked in not a child of notifications section, or notifications himselft then we close it
    // an extra additional checks is done in case the click is in the icon itself, to prevent from interfering with notification icons handler
    const handleClickOutside = (event) => {
      if (
        !event.target?.closest(`.${parentClass}`) &&
        !event.target?.closest(`.${settingsIconClass}`)
      ) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className={classes.PostHeader}>
      <div className={classes["user-and-photo"]}>
        <img src={post.profilePhoto} alt="profile " />
        <div className={classes["user-and-date-posted"]}>
          <p>
            <strong>{post.userFullName} </strong>
          </p>
          <div className={classes["date-and-privacy"]}>
            <span>10.7.2023</span>
          </div>
        </div>
      </div>
      <div className={classes.settings}>
        {/* this check is performed to look if the post is opened, in a modal to show images, there we dont want to have the opstions of edit report etc.(for simplicity case) */}
        {type !== "modal-post" && (
          <span
            style={{ fontSize: "22px" }}
            onClick={handleShowOptions}
            className={classes.button}
            ref={settingsIconRef}
          >
            <BiDotsVerticalRounded />
          </span>
        )}
        <div
          ref={settingsSectionRef}
          className={`${
            showOptions
              ? `${classes.options} ${classes.showOptions}`
              : classes.options
          }`}
        >
          <button>
            <span>
              <CiEdit />
            </span>
            <p>edit</p>
          </button>
          <button>
            <span>
              <MdOutlineReport />
            </span>
            <p>report</p>
          </button>
          <button onClick={handleSave}>
            <span>
              <BsBookmark />
            </span>
            <p>save</p>
          </button>
          <button>
            <span>
              <MdDelete />
            </span>
            <p>delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
