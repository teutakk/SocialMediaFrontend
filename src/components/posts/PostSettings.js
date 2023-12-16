import React, { useEffect } from "react";
import classes from "./PostSettings.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { CiEdit } from "react-icons/ci";
import { MdOutlineReport, MdDelete } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";

const PostSettings = ({
  post,
  showOptions,
  setShowOptions,
  settingsSectionRef,
  showModal,
  handleDeleteClick
}) => {
  const loggedInUser = useSelector(selectUser);
  console.log('showModal: ', showOptions)
  const handleEditClick = () => {
    showModal();
  };
  useEffect(() => {
    if (window.innerWidth < 767 && showOptions) {
      document.body.classList.add("hidden");
    }
    return () => document.body.classList.remove("hidden");
  }, [showOptions]);

  return (
    <div
      onClick={setShowOptions}
      ref={settingsSectionRef}
      className={`${
        showOptions
          ? `${classes.PostSettings} ${classes.showPostSettings}`
          : classes.PostSettings
      }`}
    >
      <section className={classes.settingsHolder}>
        <div className={classes.closeSettings}>
          <button className={classes.closeButton}>Close</button>
        </div>
        {loggedInUser?._id === post.userId && (
          <button onClick={handleEditClick}>
            <span>
              <CiEdit />
            </span>
            <p>edit</p>
          </button>
        )}
        <button>
          <span>
            <MdOutlineReport />
          </span>
          <p>report</p>
        </button>
        <button>
          <span>
            <BsBookmark />
          </span>
          <p>save</p>
        </button>
        {loggedInUser?._id === post.userId && (
          <button onClick={handleDeleteClick}>
            <span>
              <MdDelete />
            </span>
            <p>delete</p>
          </button>
        )}
      </section>
    </div>
  );
};

export default PostSettings;
