import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
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
    console.log(params);
    if (!params.idNumber) {
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
          <div className={classes["profile-pic"]}>
            <span></span>
          </div>
        </div>
      </section>
      <section className={classes["profile-info"]}>
        <div className={classes["info-width-controller"]}>
          <h3>Endrit Bejta</h3>
          <span>413 friends</span>
          <div className={classes.actions}>
            <button>Add Friend</button>
            <button>Edit Profile</button>
          </div>
        </div>
      </section>
      <div className={classes["content-options"]}>
        <div className={classes["navlink-holder"]}>
          <NavLink to={`${params.idNumber}`} end>
            Posts
          </NavLink>
          <NavLink to={`${params.idNumber}/about`}>About</NavLink>
          <NavLink to={`${params.idNumber}/friends`}>Friends</NavLink>
          <NavLink to={`${params.idNumber}/photos`}>Photos</NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
