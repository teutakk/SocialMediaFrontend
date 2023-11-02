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
import { fetchFriends, sendFriendRequestAsync } from "../store/slices/friendshipSlice";

const Profile = () => {

  const [users, setUsers] = useState([])
  const [isSentRequest, setIsSentRequest] = useState(false)
  const params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const profilePageUser = useSelector(selectProfilePageUser);
  const sentRequests = useSelector((state) => state.friendship.sentRequests)
  const loggedInUser = useSelector(selectUser);
  console.log(sentRequests);

  const userId = loggedInUser?._id

  const handleFetchFriends = (loggedInUser) => {
    dispatch(fetchFriends(loggedInUser)).then((response) => {
      setUsers(response.payload.data)
    })
  }

  useEffect(() => {
    handleFetchFriends(userId)
  }, [userId])

  const handleSendFriendRequest = () => {
    setIsSentRequest(false)
    dispatch(
      sendFriendRequestAsync({
        recipientUserId: profilePageUser._id,
        senderUserId: loggedInUser._id,
      })
      ).then((response) =>  {
          if(response.payload){
          setIsSentRequest(true)
        }})
      .catch((error) => {
        console.log(error);
        setIsSentRequest(false)
      })
  }

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
          {<div className={classes.actions}>
            {loggedInUser._id !== profilePageUser._id && (
              <button
                style={{ color: "red" }}
                onClick={handleSendFriendRequest}
              >
              {isSentRequest ? "Cancel Request" : "Add Friend"}
              </button> 
            )}
            {loggedInUser._id === profilePageUser._id && (
              <button>Edit Profile</button>
            )}
          </div>}
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
          {profilePageUser._id === loggedInUser._id && <NavLink to={"requests"}>Requests</NavLink>}
        </div>
      </div>
      <div className={classes["profile-outlet"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
