import React from "react";
import classes from "./Notifications.module.css";
const Notifications = () => {
  return (
    <div className={classes.Notifications}>
      <div className={classes["notifications-actions"]}>
        <p>Mark all as read</p>
      </div>
      <div className={classes.notification}></div>
    </div>
  );
};

export default Notifications;
