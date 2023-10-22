import React from "react";
import classes from "./Bullet.module.css";
import { PiPen } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
const Bullet = ({ content, subContent, logo }) => {
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
        {typeof logo === "string" ? <BiDotsVerticalRounded /> : <PiPen />}
      </span>
    </div>
  );
};

export default Bullet;
