import React from "react";
import classes from "./Notifications.module.css";
import SingleNotification from "./SingleNotification";

import { notifications } from "../../api/dummyData";
const Notifications = ({ toggleClass }) => {
  const onClearHandler = () => {};
  const onMarkAllAsReadHandler = () => {};

  return (
    <div
      className={
        toggleClass
          ? `${classes.Notifications} ${classes.showNotifications}`
          : classes.Notifications
      }
    >
      <div className={classes["notifications-actions"]}>
        <p onClick={onClearHandler}>Clear</p>
        <p onClick={onMarkAllAsReadHandler}>Mark all as read</p>
      </div>
      <div className={classes.notifications}>
        {notifications.map((notification) => (
          <SingleNotification
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
