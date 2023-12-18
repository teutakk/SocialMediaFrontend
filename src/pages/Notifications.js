import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import classes from "./styles/Notifications.module.css";
import SingleNotification from "../components/notifications/SingleNotification";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import {
  getNotifications,
  selectNotifications,
} from "../store/slices/notificationSlice";

const Notifications = () => {
  const notifications = useSelector(selectNotifications);

  console.log("notifications: ", notifications);
  return (
    <div className={classes.Notifications}>
      <h3 className={classes.title}>Notifications center</h3>
      <div className={classes.notificationsHolder}>
        {notifications.map((message, index) => (
          <SingleNotification key={index} notification={message} />
        ))}
      </div>
    </div>
  );
};
export default Notifications;
