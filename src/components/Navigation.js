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
  const notificationsSectionRef = useRef(null);
  const handleShowNavigation = () => {
    setShowNavigation((prev) => !prev);
  };

  useEffect(() => {
    // we get the Notifications element
    const notificationIconClass = notificationsRef.current.classList[0];
    const parentClass = notificationsSectionRef.current.classList[0];
    // if the target clicked in not a child of notifications section, or notifications himselft then we close it
    // an extra additional checks is done in case the click is in the icon itself, to prevent from interfering with notification icons handler
    const handleClickOutside = (event) => {
      if (
        !event.target?.closest(`.${parentClass}`) &&
        !event.target?.closest(`.${notificationIconClass}`)
      ) {
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
              <NavLink to="/id">Profile</NavLink>
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
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="32px"
            width="32px"
          >
            <path d="M12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 003 17v1a1 1 0 001 1h16a1 1 0 001-1v-1a.996.996 0 00-.293-.707L19 14.586z" />
          </svg>
        </div>
        <Notifications
          notificationsSectionRef={notificationsSectionRef}
          toggleClass={showNotifications}
        />
        <UserChip url={logo} />
      </div>
    </section>
  );
};

export default Navigation;
