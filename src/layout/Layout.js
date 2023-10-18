import React from "react";
import classes from "./Layout.module.css";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div className={classes.Layout}>
      <Navigation />
      <main className={classes.main}>
        <aside className={classes.left}>LEft side of the app</aside>
        <Outlet />
        <aside className={classes.right}>Right side of the app</aside>
      </main>
    </div>
  );
};

export default Layout;
