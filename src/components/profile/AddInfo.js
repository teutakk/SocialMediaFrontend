import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import classes from "./AddInfo.module.css";
const AddInfo = ({ title, content }) => {
  return (
    <div className={classes.AddInfo}>
      <p className={classes.title}>{title}</p>
      <div className={classes.info}>
        <AiOutlinePlusCircle />
        <p>{content}</p>
      </div>
    </div>
  );
};

export default AddInfo;
