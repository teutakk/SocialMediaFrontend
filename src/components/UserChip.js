import React from "react";
import classes from "./UserChip.module.css";
const UserChip = ({ url }) => {
  return (
    <div className={classes.UserChip}>
      <img src={url} alt="userphoto" />
    </div>
  );
};

export default UserChip;
