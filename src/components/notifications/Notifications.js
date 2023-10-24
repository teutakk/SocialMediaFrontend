import React, { useEffect, useRef } from "react";
import classes from "./Notifications.module.css";
import SingleNotification from "./SingleNotification";

import { notifications } from "../../api/dummyData";
const Notifications = ({
  showNotifications,
  setShowNotifications,
  toggleClass,
  notificationsRef,
}) => {
  const onClearHandler = () => {};
  const onMarkAllAsReadHandler = () => {};

  const notificationsSectionRef = useRef();

  useEffect(() => {
    console.log("notificationsREf: ", notificationsRef.current.classList[0]);
    console.log(
      "notificationSectionRef: ",
      notificationsSectionRef.current.classList[0]
    );
    // we get the Notifications element
    const notificationIconClass = notificationsRef.current.classList[0];
    const parentClass = notificationsSectionRef.current.classList[0];
    // if the target clicked in not a child of notifications section, or notifications himselft then we close it
    // an extra additional checks is done in case the click is in the icon itself, to prevent from interfering with notification icons handler
    const handleClickOutside = (event) => {
      event.stopPropagation();
      console.log(
        "isNotChild of NotificationIcon: ",
        !event.target.closest(`.${notificationIconClass}`)
      );
      console.log(
        "isNotChild of notificationsection: ",
        !event.target.closest(`.${parentClass}`)
      );
      console.log(
        "if(): ",
        !event.target.closest(`.${parentClass}`) &&
          !event.target.closest(`.${notificationIconClass}`)
      );
      if (
        !event.target.closest(`.${notificationIconClass}`) &&
        !event.target.closest(`.${parentClass}`)
      ) {
        setShowNotifications((prev) => !prev);
      } else {
        setShowNotifications(true);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <div
      ref={notificationsSectionRef}
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
