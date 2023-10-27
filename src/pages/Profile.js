import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "./styles/Profile.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import {
  fetchUserProfile,
  selectProfilePageUser,
  setUser,
} from "../store/slices/profileSlice";
import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/apiConfig";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const profilePageUser = useSelector(selectProfilePageUser);
  const loggedInUser = useSelector(selectUser);
  const dispatch = useDispatch();
  // get user from profileSlice
  useEffect(() => {
    // here we dispatch an action that will update the profile slice without sending a request, because we already have the info about user
    dispatch(fetchUserProfile(`/${params.idNumber}`));
  }, [params.idNumber]);
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
          <h3>
            {profilePageUser?.firstName} {profilePageUser?.lastName}
          </h3>
          <span>13 friends</span>
          <div className={classes.actions}>
            {params.idNumber !== loggedInUser?._id && (
              <button>Add Friend</button>
            )}
            {params.idNumber === loggedInUser?._id && (
              <button>Edit Profile</button>
            )}
          </div>
        </div>
      </section>
      <div className={classes["content-options"]}>
        <div className={classes["navlink-holder"]}>
          <NavLink to="" end>
            Posts
          </NavLink>
          <NavLink to={"about"}>About</NavLink>
          <NavLink to={"friends"}>Friends</NavLink>
          <NavLink to={"photos"}>Photos</NavLink>
        </div>
      </div>
      <div className={classes["profile-outlet"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
