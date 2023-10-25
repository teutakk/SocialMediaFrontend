import React from "react";
import classes from "./Sidebar.module.css";
import UserChip from "./UserChip";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { NavLink } from "react-router-dom";
import { PiUserFill } from "react-icons/pi";
import { BsFillBookmarkFill } from "react-icons/bs";
const Sidebar = () => {
  const loggedInUser = useSelector(selectUser);
  return (
    <div className={classes.Sidebar}>
      <div className={classes.profile}>
        <UserChip width={43} heigth={43} />
        <div className={classes.user}>
          <p>
            <strong>
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </strong>
          </p>
          {/* <p
            style={{
              fontSize: "12px",
              maxWidth: "60px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
          {loggedInUser?.email}
          </p> */}
        </div>
      </div>
      <section className={classes["routing-options"]}>
        <NavLink
          className={`${classes["route-holder"]} ${classes["route-feed"]}`}
          to={""}
          end
        >
          <span className={classes["route-logo"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="28"
              // height="24"
              viewBox="0 0 28 24"
              fill="none"
            >
              <path
                d="M3.6875 0.75C2.94158 0.75 2.22621 1.04632 1.69876 1.57376C1.17132 2.10121 0.875 2.81658 0.875 3.5625V9.1875C0.875 9.93342 1.17132 10.6488 1.69876 11.1762C2.22621 11.7037 2.94158 12 3.6875 12H24.3125C25.0584 12 25.7738 11.7037 26.3012 11.1762C26.8287 10.6488 27.125 9.93342 27.125 9.1875V3.5625C27.125 2.81658 26.8287 2.10121 26.3012 1.57376C25.7738 1.04632 25.0584 0.75 24.3125 0.75H3.6875ZM3.6875 15.75C2.94158 15.75 2.22621 16.0463 1.69876 16.5738C1.17132 17.1012 0.875 17.8166 0.875 18.5625V20.4375C0.875 21.1834 1.17132 21.8988 1.69876 22.4262C2.22621 22.9537 2.94158 23.25 3.6875 23.25H9.3125C10.0584 23.25 10.7738 22.9537 11.3012 22.4262C11.8287 21.8988 12.125 21.1834 12.125 20.4375V18.5625C12.125 17.8166 11.8287 17.1012 11.3012 16.5738C10.7738 16.0463 10.0584 15.75 9.3125 15.75H3.6875ZM18.6875 15.75C17.9416 15.75 17.2262 16.0463 16.6988 16.5738C16.1713 17.1012 15.875 17.8166 15.875 18.5625V20.4375C15.875 21.1834 16.1713 21.8988 16.6988 22.4262C17.2262 22.9537 17.9416 23.25 18.6875 23.25H24.3125C25.0584 23.25 25.7738 22.9537 26.3012 22.4262C26.8287 21.8988 27.125 21.1834 27.125 20.4375V18.5625C27.125 17.8166 26.8287 17.1012 26.3012 16.5738C25.7738 16.0463 25.0584 15.75 24.3125 15.75H18.6875Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>Feed</span>
        </NavLink>
        <NavLink
          className={`${classes["route-holder"]} ${classes["route-friends"]}`}
          to={"friends"}
        >
          <span className={classes["route-logo"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
            >
              <path
                d="M9 12C11.9016 12 14.25 9.65156 14.25 6.75C14.25 3.84844 11.9016 1.5 9 1.5C6.09844 1.5 3.75 3.84844 3.75 6.75C3.75 9.65156 6.09844 12 9 12ZM12.6 13.5H12.2109C11.2359 13.9688 10.1531 14.25 9 14.25C7.84688 14.25 6.76875 13.9688 5.78906 13.5H5.4C2.41875 13.5 0 15.9188 0 18.9V20.25C0 21.4922 1.00781 22.5 2.25 22.5H15.75C16.9922 22.5 18 21.4922 18 20.25V18.9C18 15.9188 15.5812 13.5 12.6 13.5ZM22.5 12C24.9844 12 27 9.98438 27 7.5C27 5.01562 24.9844 3 22.5 3C20.0156 3 18 5.01562 18 7.5C18 9.98438 20.0156 12 22.5 12ZM24.75 13.5H24.5719C23.9203 13.725 23.2313 13.875 22.5 13.875C21.7687 13.875 21.0797 13.725 20.4281 13.5H20.25C19.2938 13.5 18.4125 13.7766 17.6391 14.2219C18.7828 15.4547 19.5 17.0906 19.5 18.9V20.7C19.5 20.8031 19.4766 20.9016 19.4719 21H27.75C28.9922 21 30 19.9922 30 18.75C30 15.8484 27.6516 13.5 24.75 13.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>Friends</span>
        </NavLink>
        <NavLink
          className={`${classes["route-holder"]} ${classes["route-profile"]}`}
          to={`id/${loggedInUser._id}`}
        >
          <span
            style={{ color: "lightblue", fontSize: "24px" }}
            className={classes["route-logo"]}
          >
            <PiUserFill />
          </span>
          <span>Profile</span>
        </NavLink>
        <NavLink
          className={`${classes["route-holder"]} ${classes["route-market"]}`}
          to={"marketplace"}
        >
          <span
            style={{ color: "rgb(139,66,78)", width: "24px" }}
            className={classes["route-logo"]}
          >
            <svg viewBox="0 0 1024 1024" width={24} fill="currentColor">
              <path d="M882 272.1V144c0-17.7-14.3-32-32-32H174c-17.7 0-32 14.3-32 32v128.1c-16.7 1-30 14.9-30 31.9v131.7a177 177 0 0014.4 70.4c4.3 10.2 9.6 19.8 15.6 28.9v345c0 17.6 14.3 32 32 32h274V736h128v176h274c17.7 0 32-14.3 32-32V535a175 175 0 0015.6-28.9c9.5-22.3 14.4-46 14.4-70.4V304c0-17-13.3-30.9-30-31.9zm-72 568H640V704c0-17.7-14.3-32-32-32H416c-17.7 0-32 14.3-32 32v136.1H214V597.9c2.9 1.4 5.9 2.8 9 4 22.3 9.4 46 14.1 70.4 14.1s48-4.7 70.4-14.1c13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 3-1.3 6-2.6 9-4v242.2zm0-568.1H214v-88h596v88z" />
            </svg>
          </span>
          <span>Marketplace</span>
        </NavLink>
        <NavLink
          className={`${classes["route-holder"]} ${classes["route-market"]}`}
          to={"marketplace"}
        >
          <span
            style={{ color: "blueviolet", fontSize: "24px" }}
            className={classes["route-logo"]}
          >
            <BsFillBookmarkFill />
          </span>
          <span>Saved</span>
        </NavLink>
      </section>
    </div>
  );
};

export default Sidebar;
