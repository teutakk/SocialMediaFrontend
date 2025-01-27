import React, { useRef } from "react";
import classes from "./UserChip.module.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const UserChip = ({ url, width, heigth, link }) => {
  return (
    <div style={{ width: width, height: heigth }} className={classes.UserChip}>
      <Link to={link}>{url ? <img src={url} alt="userphoto" /> : <FaUserCircle />}</Link>
    </div>
  );
};

export default UserChip;
