import React, { useEffect } from "react";
import classes from "./PostSettings.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { CiEdit } from "react-icons/ci";
import { MdOutlineReport, MdDelete } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { useNavigate } from "react-router";

const PostSettings = ({
  post,
  showOptions,
  setShowOptions,
  settingsSectionRef,
  showModal,
}) => {
  const loggedInUser = useSelector(selectUser);

  const navigate = useNavigate();
  const handleEditClick = () => {
    if (window.innerWidth < 767) {
      navigate(`/edit/${post._id}`);
    } else {
      showModal();
    }
  };
  useEffect(() => {
    document.body.classList.add("hidden");
    return () => document.body.classList.remove("hidden");
  }, []);

  return (
    <div
      ref={settingsSectionRef}
      className={`${
        showOptions
          ? `${classes.PostSettings} ${classes.showPostSettings}`
          : classes.PostSettings
      }`}
    >
      <section className={classes.settingsHolder}>
        <div className={classes.closeSettings}>
          <button onClick={setShowOptions} className={classes.closeButton}>
            Close
          </button>
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
          <button>
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
