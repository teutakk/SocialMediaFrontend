import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import UserChip from "./UserChip";
import logo from "../assets/images/starlabs.png";
import Notifications from "./notifications/Notifications";

const Navigation = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const handleShowNavigation = () => {
    setShowNavigation((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("ref: ", notificationsRef);
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        console.log(notificationsRef.current);
        // Click occurred outside the notifications component, so close it
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const handleShowNotifications = () => {
    setShowNotifications((prev) => !prev);
  };
  return (
    <section className={classes.Navigation}>
      <div className={classes["navigation-left"]}>
        <span onClick={handleShowNavigation}>X</span>
        <div className={classes.logo}>
          <img src={logo} alt="lasjdlkasjd" />
          <h3>Our Social Media</h3>
        </div>
      </div>
      <div className={classes["navigation-main"]}>
        <label htmlFor="Search...">
          <input
            type="text"
            placeholder="Search...."
            id="searcg"
            name="search"
          />
        </label>
        <nav className={showNavigation ? classes.open : ""}>
          <span onClick={handleShowNavigation}>X</span>
          <ul>
            <li>
              <NavLink to="/posts">Feed</NavLink>
            </li>
            <li>
              <NavLink to="/friends">Friends</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={classes.user}>
        <div
          ref={notificationsRef}
          className={classes["notifications-icon"]}
          onClick={handleShowNotifications}
        >
          <div className={classes.notifications}>Notification</div>
          <Notifications toggleClass={showNotifications} />
        </div>
        <UserChip url={logo} />
      </div>
    </section>
  );
};

export default Navigation;
