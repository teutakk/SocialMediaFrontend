import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navigation.module.css";
import UserChip from "./UserChip";
import logo from "../assets/images/starlabs.png";
import Notifications from "./notifications/Notifications";
import SearchBar from "./SearchBar";
import postify from "../assets/images/postify.png";
import { HiXMark } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectUser } from "../store/slices/authSlice";

const Navigation = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationsRef = useRef(null);
  const notificationsSectionRef = useRef(null);

  const handleShowNavigation = () => {
    setShowNavigation((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Loggin out");
    dispatch(logoutUser());
    navigate("");
  };

  const handleShowNotifications = (event) => {
    // this handler gets executed whenever a child of his is clicked, thus making our notification close when we click inside the notif section, a behaviour that we obviously dont want to happen. we check if the clicked target is a child or it is notificationSection itselft, if it is then notthing happens, some of the logic is moved to the Notifications.js to handle the outside click
    if (window.innerWidth < 767) {
      navigate("/notifications");
    }

    if (
      !event.target.closest(`.${notificationsSectionRef.current.classList[0]}`)
    ) {
      setShowNotifications((prev) => !prev);
    }
  };

  return (
    <>
      <nav
        className={`${classes.mobileNav} ${
          showNavigation ? classes.shown : ""
        }`}
      >
        <img src={postify} width={120} />
        <ul className={classes.mobileRoutes}>
          <NavLink to={""} end>
            Home
          </NavLink>
          <NavLink to="marketplace">Marketplace</NavLink>
          <NavLink to={`id/${loggedInUser?._id}`}>Profile</NavLink>
          <NavLink to="friends">Friends</NavLink>
        </ul>
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
            <svg viewBox="0 0 512 512" fill="#E4B34C">
              <path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm64 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zm384 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
            </svg>
          </span>
          <NavLink to="" end className={classes["logo-route"]}>
            <img src={postify} alt="postify" />
          </NavLink>
        </div>
        <div className={classes["navigation-main"]}>
          <SearchBar />
          <nav className={classes["navlink-holder"]}>
            <NavLink
              className={`${classes.route} ${classes["route-home"]}`}
              to=""
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
          </nav>
        </div>
        <div className={classes["navigation-right"]}>
          <div
            className={classes["notifications-icon"]}
            ref={notificationsRef}
            onClick={(e) => handleShowNotifications(e)}
          >
            <div className={classes.notificationsDot}>
              <span className={classes.span}>7</span>
            </div>
            <svg viewBox="0 0 24 24" fill="#F8BD00" height="32px" width="32px">
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
          <div onClick={handleLogout} className={classes.userChip}>
            <UserChip url={logo} />
          </div>
        </div>
      </section>
    </>
  );

  // return (
  //   <section className={classes.Navigation}>
  //     <div className={classes["navigation-left"]}>
  //       <span onClick={handleShowNavigation}>X</span>
  //       <NavLink to="" end className={classes["logo-route"]}>
  //         <img src={postify} alt="postify" />
  //       </NavLink>
  //     </div>
  //     <div className={classes["navigation-main"]}>
  //       <label htmlFor="search" style={{ position: "relative" }}>
  //         <input
  //           type="text"
  //           placeholder="Search"
  //           id="search"
  //           name="search"
  //           style={{ paddingLeft: "30px" }}
  //         />

  //         <svg
  //           width="27px"
  //           height="27px"
  //           xmlns="http://www.w3.org/2000/svg"
  //           stroke="#60d794"
  //           viewBox="-10.32 -10.32 44.64 44.64"
  //           fill="none"
  //           style={{ position: "absolute", left: "5px", top: "6px" }}
  //         >
  //           <g id="SVGRepo_bgCarrier" strokeWidth="0">
  //             <rect
  //               x="-10.32"
  //               y="-10.32"
  //               width="44.64"
  //               height="44.64"
  //               rx="22.32"
  //               fill="#ffffff"
  //               strokeWidth="0"
  //             ></rect>
  //           </g>
  //           <g
  //             id="SVGRepo_tracerCarrier"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           ></g>
  //           <g id="SVGRepo_iconCarrier">
  //             <path
  //               d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
  //               stroke="#000000"
  //               strokeWidth="4"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //             ></path>
  //           </g>
  //         </svg>
  //       </label>
  //       <div className={classes["navlink-holder"]}>
  //         <NavLink className={classes["route-holder-feed"]} to="">
  //           <div className={classes.circularContainer}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="28"
  //               height="24"
  //               viewBox="0 0 28 24"
  //               fill="none"
  //             >
  //               <path
  //                 d="M3.6875 0.75C2.94158 0.75 2.22621 1.04632 1.69876 1.57376C1.17132 2.10121 0.875 2.81658 0.875 3.5625V9.1875C0.875 9.93342 1.17132 10.6488 1.69876 11.1762C2.22621 11.7037 2.94158 12 3.6875 12H24.3125C25.0584 12 25.7738 11.7037 26.3012 11.1762C26.8287 10.6488 27.125 9.93342 27.125 9.1875V3.5625C27.125 2.81658 26.8287 2.10121 26.3012 1.57376C25.7738 1.04632 25.0584 0.75 24.3125 0.75H3.6875ZM3.6875 15.75C2.94158 15.75 2.22621 16.0463 1.69876 16.5738C1.17132 17.1012 0.875 17.8166 0.875 18.5625V20.4375C0.875 21.1834 1.17132 21.8988 1.69876 22.4262C2.22621 22.9537 2.94158 23.25 3.6875 23.25H9.3125C10.0584 23.25 10.7738 22.9537 11.3012 22.4262C11.8287 21.8988 12.125 21.1834 12.125 20.4375V18.5625C12.125 17.8166 11.8287 17.1012 11.3012 16.5738C10.7738 16.0463 10.0584 15.75 9.3125 15.75H3.6875ZM18.6875 15.75C17.9416 15.75 17.2262 16.0463 16.6988 16.5738C16.1713 17.1012 15.875 17.8166 15.875 18.5625V20.4375C15.875 21.1834 16.1713 21.8988 16.6988 22.4262C17.2262 22.9537 17.9416 23.25 18.6875 23.25H24.3125C25.0584 23.25 25.7738 22.9537 26.3012 22.4262C26.8287 21.8988 27.125 21.1834 27.125 20.4375V18.5625C27.125 17.8166 26.8287 17.1012 26.3012 16.5738C25.7738 16.0463 25.0584 15.75 24.3125 15.75H18.6875Z"
  //                 fill="currentColor"
  //               />
  //             </svg>
  //           </div>
  //         </NavLink>
  //         <NavLink
  //           className={classes["route-holder-marketplace"]}
  //           to="marketplace"
  //         >
  //           <div className={classes.circularContainer}>
  //             <svg
  //               fill="#f13b3b"
  //               width="64px"
  //               height="64px"
  //               viewBox="-203.28 -203.28 1022.56 1022.56"
  //               xmlns="http://www.w3.org/2000/svg"
  //               stroke="#f13b3b"
  //             >
  //               <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  //               <g
  //                 id="SVGRepo_tracerCarrier"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               ></g>
  //               <g id="SVGRepo_iconCarrier">
  //                 <path d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"></path>
  //               </g>
  //             </svg>
  //           </div>
  //         </NavLink>
  //         <NavLink className={classes["route-holder-friends"]} to="friends">
  //           <div className={classes.circularContainer}>
  //             <svg
  //               fill="#59d0f8"
  //               width="64px"
  //               height="64px"
  //               viewBox="-153.6 -153.6 947.20 947.20"
  //               xmlns="http://www.w3.org/2000/svg"
  //               stroke="#59d0f8"
  //             >
  //               <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  //               <g
  //                 id="SVGRepo_tracerCarrier"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               ></g>
  //               <g id="SVGRepo_iconCarrier">
  //                 <path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path>
  //               </g>
  //             </svg>
  //           </div>
  //         </NavLink>
  //       </div>
  //     </div>
  //     <div className={classes["navigation-right"]}>
  //       <div className={classes.user}>
  //         <div
  //           ref={notificationsRef}
  //           className={classes["notifications-icon"]}
  //           onClick={handleShowNotifications}
  //         >
  //           <div className={classes.notifications}>Notification</div>
  //           <svg
  //             viewBox="0 0 24 24"
  //             fill="currentColor"
  //             height="32px"
  //             width="32px"
  //           >
  //             <path d="M12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 003 17v1a1 1 0 001 1h16a1 1 0 001-1v-1a.996.996 0 00-.293-.707L19 14.586z" />
  //           </svg>
  //           <Notifications
  //             // notificationsSectionRef={notificationsSectionRef}
  //             toggleClass={showNotifications}
  //           />{" "}
  //         </div>
  //         <div className={classes.userChip}>
  //           <UserChip url={logo} />
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default Navigation;
