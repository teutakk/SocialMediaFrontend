import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "./styles/Profile.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import {
  fetchUserProfile,
  selectProfilePageUser,
  selectProfilePageUserStatus
} from "../store/slices/profileSlice";
import {
  fetchFriends,
  sendFriendRequestAsync,
} from "../store/slices/friendshipSlice";


const Profile = () => {
  const [isSentRequest, setIsSentRequest] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profilePageUserStatus = useSelector(selectProfilePageUserStatus);
  const profilePageUser = useSelector(selectProfilePageUser);
  const loggedInUser = useSelector(selectUser);

  const userId = loggedInUser?._id;

  useEffect(() => {
    const handleFetchFriends = (loggedInUserId) => {
      try {
        dispatch(fetchFriends(loggedInUserId))
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    handleFetchFriends(userId);
  }, [dispatch, userId]);

  const handleSendFriendRequest = () => {
    //nese tek users.map ekziston id e profilepageuser._id say sentIssent request true
    setIsSentRequest(false);
    dispatch(
      sendFriendRequestAsync({
        recipientUserId: profilePageUser?._id,
        senderUserId: loggedInUser?._id,
      })
    )
      .then((response) => {
        if (response.payload) {
          setIsSentRequest(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsSentRequest(false);
      });
  };
  //get the user that is logged in, his friends
  const userFriendIds = loggedInUser?.friends;

  //friends te userit qe osht logged in me u shfaqe si Friend ose Remove Friend
  const isFriend = userFriendIds?.some((friendId) => friendId === profilePageUser?._id);

  // get user from profileSlice
  useEffect(() => {
    // here we dispatch an action that will update the profile slice without sending a request, because we already have the info about user
    dispatch(fetchUserProfile(`/${params.idNumber}`));
  }, [params.idNumber, dispatch]);

  useEffect(() => {
    if (profilePageUserStatus === "failed") {
      navigate(`/404?${params.idNumber}doesNotExist`);
    }
  }, [profilePageUserStatus, navigate, params.idNumber]);

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
          {
            <div className={classes.actions}>
              {loggedInUser?._id !== profilePageUser?._id && !isFriend && (
                <button
                  style={{ color: "red" }}
                  onClick={handleSendFriendRequest}
                >
                  {isSentRequest ? "Cancel Request": "Add Friend"}
                </button>
              )}
              {loggedInUser?._id === profilePageUser?._id && (
                <button>Edit Profile</button>
              )}
              { loggedInUser?._id !== profilePageUser?._id && isFriend && (
                <button >
                  Remove Friend
                </button>
              )}
            </div>
          }
        </div>
      </section>
      <div className={classes["content-options"]}>
        <div className={classes["navlink-holder"]}>
          <NavLink to="" end>Posts</NavLink>
          <NavLink to={"about"}>About</NavLink>
          <NavLink to={"friends"}>Friends</NavLink>
          <NavLink to={"photos"}>Photos</NavLink>
          {profilePageUser?._id === loggedInUser?._id && (
            <NavLink to={"requests"}>Requests</NavLink>
          )}
        </div>
      </div>
      <div className={classes["profile-outlet"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
