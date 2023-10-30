import React, { useRef } from "react";
import classes from "./UserChip.module.css";
import { FaUserCircle } from "react-icons/fa";
const UserChip = ({ url, width, heigth }) => {
  return (
    <div style={{ width: width, height: heigth }} className={classes.UserChip}>
      {url ? <img src={url} alt="userphoto" /> : <FaUserCircle />}
    </div>
  );
};

export default UserChip;
