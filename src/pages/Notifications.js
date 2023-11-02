import React, { useEffect } from "react";
import { notifications } from "../api/dummyData";
import classes from "./styles/Notifications.module.css";
import SingleNotification from "../components/notifications/SingleNotification";
const Notifications = () => {

  return (
    <div className={classes.Notifications}>
      <h3 className={classes.title}>Notifications center</h3>
      <div className={classes.notificationsHolder}>
        {notifications.map((notification, index) => (
          <SingleNotification key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
