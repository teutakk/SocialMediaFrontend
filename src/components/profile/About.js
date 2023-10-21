import React from "react";
import classes from "./About.module.css";
import { NavLink, Outlet } from "react-router-dom";
const About = () => {
  return (
    <div className={classes.About}>
      <p>About</p>
      <div className={classes["about-content"]}>
        <aside className={classes["about-aside"]}>
          <NavLink to="" end>
            Overview
          </NavLink>
          <NavLink to="work-and-education">Work and education</NavLink>
          <NavLink to="contacts">Contacts</NavLink>
        </aside>
        <hr />
        <div className={classes["about-main"]}>
          <Outlet />
        </div>
      </div>
      <section>
        <p>ESDW</p>
        <p>ESDW</p>
        <p>ESDW</p>
        <p>ESDW</p>
        <p>ESDW</p>
        <p>ESDW</p>
      </section>
    </div>
  );
};

export default About;
