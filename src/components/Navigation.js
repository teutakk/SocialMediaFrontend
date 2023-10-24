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
        <img
          src="https://cdn.discordapp.com/attachments/1150794975748034740/1165994613081919518/2.png"
          alt="userphoto"
          width="120px" // Adjust the width to your desired size
          height="40px" // You can adjust the height as well
          className={classes.UserChip}
        />
      </div>
      <div className={classes["navigation-main"]}>
        <label htmlFor="search" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search"
            id="search"
            name="search"
            style={{ paddingLeft: "30px" }}
          />

          <svg
            width="27px"
            height="27px"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#60d794"
            viewBox="-10.32 -10.32 44.64 44.64"
            fill="none"
            style={{ position: "absolute", left: "5px", top: "6px" }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0">
              <rect
                x="-10.32"
                y="-10.32"
                width="44.64"
                height="44.64"
                rx="22.32"
                fill="#ffffff"
                strokeWidth="0"
              ></rect>
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </label>
      </div>

      <div className={classes.user}>
        <div
          ref={notificationsRef}
          className={classes["notifications-icon"]}
          onClick={handleShowNotifications}
        >
          <div className={classes.notifications}>Notification</div>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="32px"
            width="32px"
          >
            <path d="M12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 003 17v1a1 1 0 001 1h16a1 1 0 001-1v-1a.996.996 0 00-.293-.707L19 14.586z" />
          </svg>
          <Notifications
            notificationsSectionRef={notificationsSectionRef}
            toggleClass={showNotifications}
          />{" "}
        </div>
        <NavLink
          className={classes["route-holder-marketplace"]}
          to="marketplace"
        >
          <div className={classes.circularContainer}>
            <svg
              fill="#f13b3b"
              width="64px"
              height="64px"
              viewBox="-203.28 -203.28 1022.56 1022.56"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#f13b3b"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"></path>
              </g>
            </svg>
          </div>
        </NavLink>
        <NavLink className={classes["route-holder-friends"]} to="friends">
          <div className={classes.circularContainer}>
            <svg
              fill="#59d0f8"
              width="64px"
              height="64px"
              viewBox="-153.6 -153.6 947.20 947.20"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#59d0f8"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path>
              </g>
            </svg>
          </div>
        </NavLink>
        <div className={classes.userChip}>
          <UserChip url={logo} />
        </div>
      </div>
    </section>
  );
};

export default Navigation;
