import React from "react";
import classes from "./ProfileContent.module.css";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Posts from "../../pages/Posts";
import About from "./about/About";
const ProfileContent = () => {
  const params = useParams();
  const activeRoute = params.id && params["*"];
  console.log(activeRoute);

  let content = <Posts />;
  if (activeRoute === "friends") {
    content = <h1>Friends</h1>;
  } else if (activeRoute === "about") {
    content = <About />;
  } else if (activeRoute === "photos") {
    content = <h1>coming soon</h1>;
  }
  return (
    <section className={classes["profile-content"]}>
      <Outlet />
    </section>
  );
};

export default ProfileContent;
