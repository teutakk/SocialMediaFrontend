import React, { useEffect, useRef, useState } from "react";
import classes from "./PostHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../../store/slices/postsSlice";
import { CiEdit } from "react-icons/ci";
import { MdOutlineReport, MdDelete } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import EditPost from "./EditPost";
import Modal from "../../layout/Modal";
import UserChip from "../UserChip";
import {
  fetchUserProfile,
  selectProfilePageUser,
} from "../../store/slices/profileSlice";
import { formatDistanceToNow, parseISO, format } from "date-fns";

const PostHeader = ({ post, type }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState();
  const [modalOpen, setModalOpen] = useState();
  const [displayTime, setDisplayTime] = useState("");
  // function to open and close modal
  const showModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const onModalActionHandler = ({ action, data }) => {
    if (action === "cancel") {
      setModalOpen(false);
    }

    if (action === "save") {
      console.log("sent");
      setModalOpen(false);
    }
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
  console.log(post.createdAt);
  // const inputDate = parseISO(post.createdAt);
  // const currentDate = new Date();
  // const timeAgo = formatDistanceToNow(inputDate, { addSuffix: true });

  // useEffect(() => {
  //   const timeAgo = formatDistanceToNow(inputDate, { addSuffix: true });

  //   if (timeAgo.includes("minutes")) {
  //     // Display time in minutes

  //     setDisplayTime(timeAgo);
  //   } else if (timeAgo.includes("hour")) {
  //     // Display time in hours
  //     const hourAgo = timeAgo.replace("hours", "h");

  //     setDisplayTime(timeAgo);
  //   } else {
  //     // Display the actual time
  //     const formattedTime = format(inputDate, "hh:mm a");
  //     setDisplayTime(formattedTime);
  //   }
  // }, [inputDate, post.createdAt]);

  return (
    <div className={classes.PostHeader}>
      <div className={classes["user-and-photo"]}>
        <UserChip id={post.userId} />
        <div className={classes["user-and-date-posted"]}>
          <p>
            <strong>
              {post.firstName} {post.lastName}
            </strong>
          </p>
          <div className={classes["date-and-privacy"]}>
            {/* <span style={{ fontSize: "12px" }}>{displayTime}</span> */}
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
        {modalOpen && (
          <Modal
            data={post}
            showActionButtons={true}
            showModal={showModal}
            modal={modalOpen}
            onModalActionHandler={onModalActionHandler}
          >
            <EditPost />
          </Modal>
        )}
        <div
          ref={settingsSectionRef}
          className={`${
            showOptions
              ? `${classes.options} ${classes.showOptions}`
              : classes.options
          }`}
        >
          <button onClick={showModal}>
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
