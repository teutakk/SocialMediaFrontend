import React from "react";
import classes from "./ProfileContent.module.css";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Posts from "../../pages/Posts";
import About from "./About";
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
      <div className={classes["content-options"]}>
        <NavLink to="" end>
          Posts
        </NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="friends">Friends</NavLink>
        <NavLink to="photos">Photos</NavLink>
      </div>
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default ProfileContent;
