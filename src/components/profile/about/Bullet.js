import React from "react";
import classes from "./Bullet.module.css";
import { PiPen } from "react-icons/pi";
const Bullet = ({ content, subContent, logo }) => {
  return (
    <div className={classes["overview-bullet"]}>
      <span className={classes.logo}>{logo}</span>
      <div className={classes["bullet-content"]}>
        <p>{content}</p>
        <span>{subContent}</span>
      </div>
      <span className={classes.edit}>
        <PiPen />
      </span>
    </div>
  );
};

export default Bullet;
