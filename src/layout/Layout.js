import React, { useEffect } from "react";
import classes from "./Layout.module.css";
import Navigation from "../components/header/Navigation";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import Rightsidebar from "../components/Rightsidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { fetchPosts, fetchSavedPosts } from "../store/slices/postsSlice";
import { getNotifications } from "../store/slices/notificationSlice";
const Layout = () => {
  const location = useLocation();
  const custumClass = location.pathname.startsWith("/id")
    ? classes.customClass
    : "";

  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(getNotifications(loggedInUser?._id));
    console.log(loggedInUser?._id);
    dispatch(fetchSavedPosts(loggedInUser?._id));
  }, [loggedInUser, dispatch]);
  return (
    <div className={classes.Layout}>
      <Navigation />
      <main className={`${classes.main} ${custumClass}`}>
        {!location.pathname.startsWith("/id") && (
          <aside className={classes.left}>
            <Sidebar />
          </aside>
        )}
        <div className={classes.mainElement}>
          <Outlet />
        </div>
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
