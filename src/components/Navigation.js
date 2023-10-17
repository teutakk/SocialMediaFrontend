import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import UserChip from "./UserChip";
import logo from "../assets/images/starlabs.png";
const Navigation = () => (
  <section className={classes.Navigation}>
    <div className={classes["navigation-left"]}>
      <span>X</span>
      <div className={classes.logo}>
        <img src={logo} alt="lasjdlkasjd" />
        <h3>Our Social Media</h3>
      </div>
    </div>
    <div className={classes["navigation-main"]}>
      <label htmlFor="Search...">
        <input type="text" placeholder="Search...." id="searcg" name="search" />
      </label>
      <nav>
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
      <div className={classes["notifications-icon"]}>
        <div className={classes.notifications}>Notification</div>
      </div>
      <UserChip url={logo} />
    </div>
  </section>
);

export default Navigation;
