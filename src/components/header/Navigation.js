import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classes from "./Navigation.module.css";
import UserChip from "../UserChip";
import Notifications from "../notifications/Notifications";
import SearchBar from "./SearchBar";
import logo from "../../assets/images/Logo.png";
import { HiXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { selectUser, logoutUser } from "../../store/slices/authSlice";
import UserDropDownMenu from "./UserDropDownMenu";
import userlogo from "../../assets/images/userSvg2.svg";

const Navigation = () => {
  const [showNavigation, setShowNavigation] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationsRef = useRef(null);
  const notificationsSectionRef = useRef(null);

  const userChipRef = useRef(null);
  const userDropDownMenuRef = useRef(null);

  const handleShowNavigation = () => {
    setShowNavigation((prev) => !prev);
  };

  const handleShowUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleShowNotifications = (event) => {
    // this handler gets executed whenever a child of his is clicked, thus making our notification close when we click inside the notif section, a behaviour that we obviously dont want to happen. we check if the clicked target is a child or it is notificationSection itselft, if it is then notthing happens, some of the logic is moved to the Notifications.js to handle the outside click
    if (window.innerWidth < 767) {
      navigate("/notifications");
    }

    if (
      !event.target.closest(`.${notificationsSectionRef.current?.classList[0]}`)
    ) {
      setShowNotifications((prev) => !prev);
    }
  };

  const handleShowUserDropDownMenu = (event) => {
    if (
      !event.target.closest(`.${userDropDownMenuRef.current?.classList[0]}`)
    ) {
      setShowUserMenu((prev) => !prev);
    }
  };

  const handleLogout = () => {
    console.log("running");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`${classes.mobileNav} ${
          showNavigation ? classes.shown : ""
        }`}
      >
        <img src={logo} width={120} />
        <ul className={classes.mobileRoutes}>
          <NavLink to={"/"} end>
            Home
          </NavLink>
          <NavLink to="marketplace">Marketplace</NavLink>
          <NavLink to={`id/${loggedInUser?._id}`}>Profile</NavLink>
          <NavLink to="friends">Friends</NavLink>
        </ul>
        <div className={classes.navigationActions}>
          <NavLink to={`id/${loggedInUser?._id}`}>
            <UserChip url={loggedInUser?.profilePicture} />
            <p>
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </p>
          </NavLink>
          <div onClick={handleLogout}>Log Out</div>
        </div>
        <span
          onClick={() => setShowNavigation(false)}
          className={classes.cancel}
        >
          <HiXMark />
        </span>
      </nav>
      <section className={classes.Navigation}>
        <div className={classes["navigation-left"]}>
          <span onClick={handleShowNavigation}>
            <svg viewBox="0 0 512 512" fill="currentColor">
              <path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm64 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zm384 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
            </svg>
          </span>
          <NavLink to="/" end className={classes["logo-route"]}>
            <img src={logo} alt="postify" />
            {/* <div className={classes.textLogo}> */}
            {/* <p>p</p> */}
            {/* </div> */}
          </NavLink>
        </div>
        <div className={classes["navigation-main"]}>
          <SearchBar />
          <nav className={classes["navlink-holder"]}>
            <NavLink
              className={`${classes.route} ${classes["route-home"]}`}
              to="/"
              end
            >
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
              </svg>
            </NavLink>
            <NavLink
              to="marketplace"
              className={`${classes.route} ${classes["route-marketplace"]}`}
            >
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M882 272.1V144c0-17.7-14.3-32-32-32H174c-17.7 0-32 14.3-32 32v128.1c-16.7 1-30 14.9-30 31.9v131.7a177 177 0 0014.4 70.4c4.3 10.2 9.6 19.8 15.6 28.9v345c0 17.6 14.3 32 32 32h274V736h128v176h274c17.7 0 32-14.3 32-32V535a175 175 0 0015.6-28.9c9.5-22.3 14.4-46 14.4-70.4V304c0-17-13.3-30.9-30-31.9zm-72 568H640V704c0-17.7-14.3-32-32-32H416c-17.7 0-32 14.3-32 32v136.1H214V597.9c2.9 1.4 5.9 2.8 9 4 22.3 9.4 46 14.1 70.4 14.1s48-4.7 70.4-14.1c13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 3-1.3 6-2.6 9-4v242.2zm0-568.1H214v-88h596v88z" />
              </svg>
            </NavLink>
            <NavLink
              to="friends"
              className={`${classes.route} ${classes["route-friends"]}`}
            >
              <svg viewBox="0 0 640 512" fill="currentColor">
                <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7-1.3 7.2-1.9 14.7-1.9 22.3 0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96 0-7.6-.7-15-1.9-22.3 13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7 0 11.8-9.6 21.3-21.3 21.3H405.3zm10.7-96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM128 485.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3 0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
              </svg>
            </NavLink>
            <NavLink
              to="chat"
              className={`${classes.route} ${classes["route-chat"]}`}
            >
              <svg viewBox="0 0 640 512" fill="currentColor">
                <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
              </svg>
            </NavLink>
          </nav>
        </div>
        <div className={classes["navigation-right"]}>
          <div
            className={classes["notifications-icon"]}
            ref={notificationsRef}
            onClick={(e) => handleShowNotifications(e)}
          >
            {/* <div className={classes.notificationsDot}>
              <span className={classes.span}>7</span>
            </div> */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="32px"
              width="32px"
            >
              <path d="M12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 003 17v1a1 1 0 001 1h16a1 1 0 001-1v-1a.996.996 0 00-.293-.707L19 14.586z" />
            </svg>
            <Notifications
              notificationsRef={notificationsRef}
              toggleClass={showNotifications}
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              notificationsSectionRef={notificationsSectionRef}
            />
          </div>
          <div
            className={classes.userChip}
            ref={userChipRef}
            onClick={(e) => handleShowUserDropDownMenu(e)}
          >
            <UserChip
              url={
                loggedInUser?.profilePicture.length === 0
                  ? userlogo
                  : loggedInUser?.profilePicture
              }
            />
            {showUserMenu && (
              <UserDropDownMenu
                userDropDownMenuRef={userDropDownMenuRef}
                handleLogout={handleLogout}
                userChipRef={userChipRef}
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Navigation;
