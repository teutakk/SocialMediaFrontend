import React, { useEffect } from "react";
import classes from "./Layout.module.css";
import Navigation from "../components/Navigation";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import Rightsidebar from "../components/Rightsidebar";
const Layout = () => {
  const location = useLocation();

  return (
    <div className={classes.Layout}>
      <Navigation />
      <main className={classes.main}>
        {!location.pathname.startsWith("/id") && (
          <aside className={classes.left}>
            <Sidebar />
          </aside>
        )}
        <section className={classes.mainElement}>
          <Outlet />
        </section>
        {!location.pathname.startsWith("/id") && (
          <aside className={classes.right}>
            <Rightsidebar />
          </aside>
        )}
      </main>
    </div>
  );
};

export default Layout;
