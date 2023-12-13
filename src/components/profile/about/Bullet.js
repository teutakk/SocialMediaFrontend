import React from "react";
import classes from "./Bullet.module.css";
import { useParams } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/authSlice";
import { selectProfilePageUser } from "../../../store/slices/profileSlice";

const Bullet = ({
  navigation,
  content,
  content2,
  subContent,
  logo,
  loadingStates,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  isFriend,
  smallText,
  imageUrl
}) => {
  const params = useParams();
  const location = useLocation();

  const loggedInUser = useSelector(selectUser);
  const loggedInUserId = loggedInUser?._id
  const profilePageUser = useSelector(selectProfilePageUser);
  const profileUserId = profilePageUser?._id


  const path = location.pathname;

  return (
    <div
      className={`${classes["overview-bullet"]} ${
        typeof logo === "string" ? classes.border : ""
      }`}
    >
      <span className={classes.logo}>
        {<img src={imageUrl} alt={content} /> }
      </span>
      <NavLink to={navigation} className={classes["bullet-content"]}>
        <div className={classes.blockContent}>
          <p>{content}</p>
          <p>{content2}</p>
        </div>
        <span>{subContent}</span>
        {path === `/id/${params.idNumber}/views` && <span className={classes.smallText}>{smallText}</span>}
      </NavLink>
      {path === `/id/${params.idNumber}/requests` && (
        <div className={classes.buttons}>
          {loadingStates && loadingStates?.status === "Accepted" ? (
            <button className={classes.button}>
              <span>
                <FaSpinner className={classes.spinner} />{" "}
              </span>
            </button>
          ) : (
            <button onClick={acceptFriendRequest}>Accept</button>
          )}
          {loadingStates && loadingStates?.status === "Rejected" ? (
            <button className={classes.button}>
              <span>
                <FaSpinner className={classes.spinner} />{" "}
              </span>
            </button>
          ) : (
            <button onClick={rejectFriendRequest}>Reject</button>
          )}
        </div>
      )}

      {path === `/id/${params.idNumber}/friends` && loggedInUserId === profileUserId &&(
        <div className={classes.friendsButtons}>
          {loadingStates ? (
            <button className={classes.button}>
              <span>
                <FaSpinner className={classes.spinner} />{" "}
              </span>
            </button>
          ) : (
            <button onClick={removeFriend} className={classes.unfriend}>
              Unfriend
            </button>
          )}
        </div>
      )}
      {path === `/id/${params.idNumber}/views` && isFriend && (
        <p className={classes.friend}>Friend</p>
      )}
    </div>
  );
};
export default Bullet;
