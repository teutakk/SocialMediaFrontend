import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import classes from "./AddInfo.module.css";

const AddInfo = ({ title, content, onAddClick }) => {
  return (
    <div className={classes.AddInfo}>
      <p className={classes.title}>{title}</p>
      <div className={classes.info}>
        <AiOutlinePlusCircle onClick={onAddClick} />
        <p>{content}</p>
      </div>
    </div>
  );
};

export default AddInfo;
