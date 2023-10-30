import React from "react";
import classes from "./Bullet.module.css";
import { PiPen } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/authSlice";
import { useParams } from "react-router";
const Bullet = ({ content, subContent, logo }) => {
  const params = useParams();
  console.log(params);
  const loggedInUser = useSelector(selectUser);
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
      <span className={classes.edit}>
        {loggedInUser?._id === params.idNumber && <PiPen />}
      </span>
    </div>
  );
};

export default Bullet;
