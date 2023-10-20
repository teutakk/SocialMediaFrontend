import React from "react";
import classes from "./Layout.module.css";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Rightsidebar from "../components/Rightsidebar";
const Layout = () => {
  return (
    <div className={classes.Layout}>
      <Navigation />
      <main className={classes.main}>
        <aside className={classes.left}>
          <Sidebar />
        </aside>
        <Outlet />
        <aside className={classes.right}>
          <Rightsidebar />
        </aside>
      </main>
    </div>
  );
};

export default Layout;
