import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "./styles/Profile.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import {
  fetchUserProfile,
  selectProfilePageUser,
  selectProfilePageUserStatus,
} from "../store/slices/profileSlice";
import {
  acceptFriendRequestAsync,
  cancelFriendRequest,
  fetchFriends,
  getSentRequests,
  removeFriendRequestAsync,
  sendFriendRequestAsync,
  viewProfile,
} from "../store/slices/friendshipSlice";
import { FiCamera } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { selectPosts } from "../store/slices/postsSlice";
import EditProfileModal from "../components/profile/editProfile/EditProfileModal";
import logo from "../assets/images/userSvg2.svg";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAFriend, setIsAFriend] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [acceptFriend, setAcceptFriend] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profilePageUserStatus = useSelector(selectProfilePageUserStatus);
  const allPosts = useSelector(selectPosts);
  const profilePageUser = useSelector(selectProfilePageUser);
  const loggedInUser = useSelector(selectUser);
  const sentRequests = useSelector((state) => state.friendship.sentRequests);
  const pendingRequests = useSelector(
    (state) => state.friendship.pendingRequests
  );

  const userId = loggedInUser?._id;
  const profileUserId = profilePageUser?._id;

  const userPosts = allPosts?.filter((post) => post?.userId === profileUserId);

  const handleOpenEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };
  useEffect(() => {
    const handleGetSentRequests = (userId) => {
      try {
        dispatch(getSentRequests(userId));
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
        dispatch(fetchFriends(userId));
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    handleFetchFriends(userId);
  }, [dispatch, userId]);

  const handleSendFriendRequest = () => {
    setIsLoading(true);
    setIsSentRequest(false);

    dispatch(
      sendFriendRequestAsync({
        recipientUserId: profilePageUser?._id,
        senderUserId: loggedInUser?._id,
      })
    )
      .then(() => {
        setIsLoading(false);
        setIsSentRequest(true);
        dispatch(getSentRequests(userId));
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //get data from the user u are visiting
  const requestData = sentRequests.find(
    (sr) => sr?.requestTo?._id === profilePageUser?._id
  );

  //Cancel Sent Request
  const handleCancelFriendRequest = () => {
    setIsLoading(true);
    dispatch(
      cancelFriendRequest({
        rid: requestData?._id,
      })
    )
      .then(() => {
        setIsLoading(false);
        setIsSentRequest(false);
      })
      .catch((error) => {
        console.log("Error cancelling friend request:", error);
        setIsLoading(false);
      });
  };

  //check if the user we visit is a friend
  useEffect(() => {
    const userFriendIds = loggedInUser?.friends;

    //friends te userit qe osht logged in me u shfaqe si Friend ose Remove Friend
    const isFriend = userFriendIds?.some(
      (friendId) => friendId === profilePageUser?._id
    );

    setIsAFriend(isFriend);
  }, [loggedInUser?.friends, profilePageUser?._id]);

  //Remove Friend
  const handleRemoveFriendRequest = () => {
    setIsLoading(true);
    dispatch(
      removeFriendRequestAsync({
        did: profilePageUser?._id,
        id: loggedInUser?._id,
      })
    ).then((response) => {
      setIsLoading(false);
      if (response.payload) {
        setIsAFriend(false);
      }
    });
  };

  //get which friends you should accept and reject their request
  const acceptRejectRequests = pendingRequests.find(
    (request) => request?.requestFrom?._id === profilePageUser?._id
  );

  useEffect(() => {
    const sentRequestExist = sentRequests?.some(
      (sentRequest) => sentRequest?.requestTo?._id === profilePageUser?._id
    );

    setIsSentRequest(sentRequestExist);

    const acceptRejectRequests = pendingRequests.some(
      (request) => request?.requestFrom?._id === profilePageUser?._id
    );
    setAcceptFriend(acceptRejectRequests);
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

  useEffect(() => {});
  const handleAcceptFriendRequest = ({ status }) => {
    setIsLoading(true);
    dispatch(
      acceptFriendRequestAsync({
        rid: acceptRejectRequests._id,
        senderUserId: acceptRejectRequests.requestFrom._id,
        status: status,
      })
    )
      .then(() => {
        status === "Accepted" && setIsAFriend(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const getProfileViews = () => {
      try {
        const loggedUserViews = loggedInUser?.views;
        const hasViewedProfile = loggedUserViews?.some(
          (view) => view === profilePageUser?._id
        );

        if (!hasViewedProfile && profileUserId !== userId) {
          dispatch(
            viewProfile({
              userId,
              profileUserId: profileUserId,
            })
          );
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    getProfileViews();
  }, [dispatch, userId, loggedInUser?.views, profilePageUser?._id]);

  return (
    <div className={classes.Profile}>
      <section className={classes["profile-header"]}>
        <div className={classes.cover}>
          <label
            className={classes["cover-photo-uploader"]}
            htmlFor="profile-photo"
          >
            <FiCamera />
            <p>Add a cover photo</p>
            <input
              type="file"
              accept="images/*"
              name="profile-photo"
              id="profile-photo"
            />
          </label>

          <div className={classes["profile-pic"]}>
            <img
              src={
                profilePageUser?.profilePicture?.length === 0
                  ? logo
                  : profilePageUser?.profilePicture
              }
              alt=""
            />
            <label
              className={classes["profile-photo-uploader"]}
              htmlFor="profile-photo"
            >
              <FiCamera />
              <input
                type="file"
                accept="images/*"
                name="profile-photo"
                id="profile-photo"
              />
            </label>
          </div>
        </div>
      </section>
      <section className={classes["profile-info"]}>
        <div className={classes["info-width-controller"]}>
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
                <div>
                  <button onClick={handleOpenEditProfileModal}>
                    Edit Profile
                  </button>
                  <EditProfileModal
                    isOpen={isEditProfileModalOpen}
                    onClose={handleCloseEditProfileModal}
                  />
                </div>
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
        <div className={classes.profileData}>
          <h3>
            {profilePageUser?.firstName} {profilePageUser?.lastName}
          </h3>
          <p className={classes.friendsData}>
            <strong className={classes.friendsNum}>
              {profilePageUser?.friends?.length}
            </strong>{" "}
            Friends
          </p>
          <p className={classes.friendsData}>
            <strong className={classes.friendsNum}>{userPosts.length}</strong>{" "}
            Posts
          </p>
        </div>
      </section>
      <div className={classes["content-options"]}>
        <div className={classes["navlink-holder"]}>
          <NavLink to="" end>
            Posts
          </NavLink>
          <NavLink to={"about"}>About</NavLink>
          <NavLink to={"friends"}>Friends</NavLink>
          {profilePageUser?._id === loggedInUser?._id && (
            <NavLink to={"requests"}>Requests</NavLink>
          )}
          {profilePageUser?._id === loggedInUser?._id && (
            <NavLink to={"views "}>Profile Views</NavLink>
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
