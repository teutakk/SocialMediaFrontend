import React from "react";
import classes from "./Notifications.module.css";
import SingleNotification from "./SingleNotification";
const Notifications = ({ toggleClass }) => {
  return (
    <div
      className={
        toggleClass
          ? `${classes.Notifications} ${classes.showNotifications}`
          : classes.Notifications
      }
    >
      <div className={classes["notifications-actions"]}>
        <p>Clear</p>
        <p>Mark all as read</p>
      </div>
      <div className={classes.notification}>
        <SingleNotification />
      </div>
    </div>
  );
};

export default Notifications;
