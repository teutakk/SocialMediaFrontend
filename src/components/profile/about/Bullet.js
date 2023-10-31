import React from "react";
import classes from "./Bullet.module.css";
import { PiPen } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/authSlice";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";

const Bullet = ({ content, subContent, logo }) => {
  const params = useParams();
  console.log(params);
  const loggedInUser = useSelector(selectUser);
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
      <div className={classes["bullet-content"]}>
        <p>{content}</p>
        <span>{subContent}</span>
      </div>
      {path === `/id/${params.idNumber}/requests` && (
        <div>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      )}
      <span className={classes.edit}>
        {loggedInUser?._id === params.idNumber && <PiPen />}
      </span>
    </div>
  );
};
export default Bullet;

