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
  acceptFriendRequestAsync,
  cancelFriendRequest,
  fetchFriends,
  getSentRequests,
  removeFriendRequestAsync,
  sendFriendRequestAsync,
} from "../store/slices/friendshipSlice";
import { FaSpinner } from "react-icons/fa";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAFriend, setIsAFriend] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [acceptFriend, setAcceptFriend] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profilePageUserStatus = useSelector(selectProfilePageUserStatus);
  const profilePageUser = useSelector(selectProfilePageUser);
  const loggedInUser = useSelector(selectUser);
  const sentRequests = useSelector((state) => state.friendship.sentRequests);
  const pendingRequests = useSelector((state) => state.friendship.pendingRequests);
  const userId = loggedInUser?._id;

  useEffect(() => {
    const handleGetSentRequests = (userId) => {
      try {
        dispatch(getSentRequests(userId))
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    handleGetSentRequests(userId);
  }, [dispatch, userId]);

  useEffect(() => {
    const handleFetchFriends = (userId) => {
      try {
        dispatch(fetchFriends(userId))
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    handleFetchFriends(userId);
  }, [dispatch, userId]);
  const handleSendFriendRequest = () => {
    setIsLoading(true)
    setIsSentRequest(false);

    dispatch(
      sendFriendRequestAsync({
        recipientUserId: profilePageUser?._id,
        senderUserId: loggedInUser?._id,
      })
    ).then(() => {
      setIsLoading(false)
      setIsSentRequest(true);
      dispatch(getSentRequests(userId));
    }
    )
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    }
    )
  };

  //get data from the user u are visiting
  const requestData = sentRequests.find(
    (sr) => sr?.requestTo?._id === profilePageUser?._id
  );
  
  const handleCancelFriendRequest = () => {
    setIsLoading(true)
    dispatch(
      cancelFriendRequest({
        rid: requestData?._id
      })
    ).then(() => {
      setIsLoading(false)
      setIsSentRequest(false)
    })
    .catch((error) => {
      console.log("Error cancelling friend request:", error);
      setIsLoading(false)
    });
  };

  //check if the user we visit is a friend 
  useEffect(() => {
    const userFriendIds = loggedInUser?.friends;

    //friends te userit qe osht logged in me u shfaqe si Friend ose Remove Friend
    const isFriend = userFriendIds?.some((friendId) => friendId === profilePageUser?._id);
      console.log("User Friends", userFriendIds);
    
    setIsAFriend(isFriend)
    
  }, [loggedInUser?.friends, profilePageUser?._id])

  //Remove Friend
  const handleRemoveFriendRequest = () => {
    setIsLoading(true)
      dispatch(removeFriendRequestAsync({
        did: profilePageUser?._id,
        id: loggedInUser?._id,
      })).then((response) => {
        setIsLoading(false);
        if (response.payload) {
          setIsAFriend(false);
        }
      })
  }

  //get which friends you should accept and reject their request
  const acceptRejectRequests = pendingRequests.find(
    (request) => request?.requestFrom?._id === profilePageUser?._id
  );
  console.log(acceptRejectRequests);

  //check the sentRequest array for changes ?
  useEffect(() => {
    const sentRequestExist = sentRequests?.some(
      (sentRequest) => sentRequest?.requestTo?._id === profilePageUser?._id
    );
    if(sentRequestExist){
      setIsSentRequest(true)
    }else{
      setIsSentRequest(false)
    }

    const acceptRejectRequests = pendingRequests.some(
      (request) => request?.requestFrom?._id === profilePageUser?._id
    );
    setAcceptFriend(acceptRejectRequests)
    console.log(acceptRejectRequests);
  }, [sentRequests, profilePageUser, pendingRequests]);

  // get user from profileSlice
  useEffect(() => { 
    // here we dispatch an action that will update the
    // profile slice without sending a request, because we already have the info about user
    dispatch(fetchUserProfile(`/${params.idNumber}`));
  }, [params.idNumber, dispatch]);

  useEffect(() => {
    if (profilePageUserStatus === "failed") {
      navigate(`/404?${params.idNumber}doesNotExist`);
    }
  }, [profilePageUserStatus, navigate, params.idNumber]);

  useEffect(() => {

  })
  const handleAcceptFriendRequest = ({status}) => {
    setIsLoading(true)
    dispatch(
      acceptFriendRequestAsync({
        rid: acceptRejectRequests._id,
        senderUserId: acceptRejectRequests.requestFrom._id,
        status: status,
      })
    )
    .then(() => {
      status === "Accepted" && setIsAFriend(true)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false)
    });
  };
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
              {loggedInUser?._id !== profilePageUser?._id &&
                !isLoading &&
                !isAFriend &&
                !acceptFriend &&
                !isSentRequest && (
                  <button onClick={handleSendFriendRequest}>Add Friend</button>
                )}
              {loggedInUser?._id !== profilePageUser?._id &&
                !isLoading &&
                !isAFriend &&
                !acceptFriend &&
                isSentRequest && (
                  <button onClick={handleCancelFriendRequest}>
                    Cancel Request
                  </button>
                )}
              {loggedInUser?._id === profilePageUser?._id && (
                <button>Edit Profile</button>
              )}
              {loggedInUser?._id !== profilePageUser?._id &&
                isAFriend &&
                !isLoading && (
                  <button onClick={handleRemoveFriendRequest}>
                    Remove Friend
                  </button>
                )}
              {loggedInUser?._id !== profilePageUser?._id &&
                !isLoading &&
                acceptFriend && (
                  <div className={classes.buttons}>
                    <button
                      className={classes.acceptButton}
                      onClick={() =>
                        handleAcceptFriendRequest({ status: "Accepted" })
                      }
                    >
                      Accept
                    </button>
                    <button
                      className={classes.rejectButton}
                      onClick={() =>
                        handleAcceptFriendRequest({ status: "Rejected" })
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              {loggedInUser?._id !== profilePageUser?._id && isLoading && (
                <button>
                  <span>
                    <FaSpinner className={classes.spinner} />{" "}
                  </span>
                </button>
              )}
            </div>
          }
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
