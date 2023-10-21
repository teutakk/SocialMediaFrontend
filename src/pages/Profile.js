import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./styles/Profile.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { setUser } from "../store/slices/profileSlice";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  // get user from profileSlice
  useEffect(() => {
    if (!params.id) {
      navigate("endrit");
    }

    if (params?.id === loggedInUser?.id) {
      // here we dispatch an action that will update the profile slice without sending a request, because we already have the info about user
      dispatch(setUser({ name: "Endrit Bejta" }));
    } else {
      // here we dispatch the async function that fetches data of the profile we view
    }
    console.log(params);
  }, []);
  return (
    <div className={classes.Profile}>
      <section className={classes["profile-header"]}>
        <div className={classes.cover}>
          <img src="" alt="" />
        </div>
        <div className={classes["profile-pic"]}>
          <span></span>
        </div>
      </section>
      <section className={classes["profile-info"]}>
        <h3>Endrit Bejta</h3>
        <span>413 friends</span>
        <div className={classes.actions}>
          <button>Add Friend</button>
          <button>Edit Profile</button>
        </div>
      </section>
      <section className={classes["profile-content"]}></section>
      <main className={classes["content-main"]}>
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
