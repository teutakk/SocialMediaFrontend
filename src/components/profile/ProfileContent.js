import React from "react";
import classes from "./ProfileContent.module.css";
import { NavLink, Outlet, useParams } from "react-router-dom";
const ProfileContent = () => {
  const params = useParams();
  const activeRoute = params.id && params["*"];

  return (
    <section className={classes["profile-content"]}>
      <Outlet />
    </section>
  );
};

export default ProfileContent;
