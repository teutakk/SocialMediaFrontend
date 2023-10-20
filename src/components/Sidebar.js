import React from "react";
import classes from "./Sidebar.module.css";
import UserChip from "./UserChip";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const loggedInUser = useSelector(selectUser);
  return (
    <div className={classes.Sidebar}>
      <div className={classes.profile}>
        <UserChip width={53} heigth={53} />
        <div className={classes.user}>
          <p>
            <strong>
              {loggedInUser?.user.firstName} {loggedInUser?.user.lastName}
            </strong>
          </p>
          <p>@endritbejta</p>
        </div>
      </div>
      <section className={classes["routing-options"]}>
        <NavLink className={classes["route-holder"]} to={"feed"}>
          <span className={classes["route-logo"]}>H</span>
          <span>Feed</span>
        </NavLink>
        <NavLink className={classes["route-holder"]} to={"friends"}>
          <span className={classes["route-logo"]}>F</span>
          <span>Friends</span>
        </NavLink>
        <NavLink className={classes["route-holder"]} to={"profle"}>
          <span className={classes["route-logo"]}>P</span>
          <span>Profile</span>
        </NavLink>
        <NavLink className={classes["route-holder"]} to={"marketplace"}>
          <span className={classes["route-logo"]}>M</span>
          <span>Market Place</span>
        </NavLink>
      </section>
    </div>
  );
};

export default Sidebar;
