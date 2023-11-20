import React from "react";
import classes from "./Bullet.module.css";
import { useParams } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Bullet = ({navigation, content, subContent, logo, loadingStates, acceptFriendRequest, rejectFriendRequest }) => {
  
  const params = useParams();
  const location = useLocation()

  const path = location.pathname

  return (
    <div
      className={`${classes["overview-bullet"]} ${
        typeof logo === "string" ? classes.border : ""
      }`}
    >
      <span className={classes.logo}>
        {typeof logo === "string" ? <img src={logo} alt={content} /> : logo}
      </span>
      <NavLink to={navigation} className={classes["bullet-content"]}>
        <p>{content}</p>
        <span>{subContent}</span>
      </NavLink>
      {path === `/id/${params.idNumber}/requests` && (
        <div className={classes.buttons}>
         {loadingStates &&  loadingStates?.status === "Accepted" ? (
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
      {/* <span className={classes.edit}>
        {loggedInUser?._id === params.idNumber && <PiPen />}
      </span> */}
    </div>
  );
};
export default Bullet;
