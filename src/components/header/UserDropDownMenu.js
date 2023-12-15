import React, { useEffect } from "react";
import classes from "./UserDropDownMenu.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { BsGearFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import UserChip from "../UserChip";

const UserDropDownMenu = ({
  userDropDownMenuRef,
  userChipRef,
  showUserMenu,
  setShowUserMenu,
  handleLogout,
}) => {
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // we get the Notifications element
    const notificationIconClass = userChipRef.current.classList[0];
    const parentClass = userDropDownMenuRef.current.classList[0];
    // if the target clicked in not a child of notifications section, or notifications himselft then we close it
    // an extra additional checks is done in case the click is in the icon itself, to prevent from interfering with notification icons handler
    const handleClickOutside = (event) => {
      event.stopPropagation();
      if (
        !event.target.closest(`.${notificationIconClass}`) &&
        !event.target.closest(`.${parentClass}`)
      ) {
        setShowUserMenu((prev) => !prev);
      }
    };
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div ref={userDropDownMenuRef} className={classes.UserDropDownMenu}>
      <NavLink className={classes.option} to={`id/${loggedInUser?._id}`}>
        <span className={classes.icon}>
          <UserChip heigth={32} width={32} url={loggedInUser?.profilePicture} />
        </span>
        <p>Profile</p>
      </NavLink>
      <NavLink className={classes.option} to={"/settings"}>
        <span className={classes.icon}>
          <BsGearFill />
        </span>
        <p>Settings</p>
      </NavLink>
      <div
        className={`${classes.option} ${classes.logout}`}
        onClick={handleLogout}
      >
        <span className={classes.icon}>
          <FiLogOut />
        </span>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default UserDropDownMenu;
