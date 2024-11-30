import React, { useEffect, useState } from "react";
import classes from "./Rightsidebar.module.css";
import UserChip from "./UserChip";
import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/apiConfig";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import {
  getSentRequests,
  sendFriendRequestAsync,
} from "../store/slices/friendshipSlice";
import { FaCheck } from "react-icons/fa";
import logo from "../assets/images/userSvg2.svg"

const Rightsidebar = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [sentRequestsMap, setSentRequestsMap] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loggedInUser = useSelector(selectUser);
  const sentRequests = useSelector((state) => state.friendship.sentRequests);
  const userId = loggedInUser?._id;


  //Kjo osht per me i marrë sugjerimet e per Shokë nga backend endpoint
  useEffect(() => {
    const fetchSuggestedFriends = async (userId) => {
      try {
        const response = await axiosInstance.post(API_ROUTES.suggestedFriends, {
          userId,
        });
        setSuggestedFriends(response?.data?.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedFriends(userId);
  }, [userId]);

  // Me i marrë Friend Requestat qe ja u ka dergu useri qe osht i bom logged in
  useEffect(() => {
    const handleGetSentRequests = async (userId) => {
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
    const updatedMap = {};
    sentRequests.forEach((request) => {
      updatedMap[request?.requestTo?._id] = true;
    });
    // console.log(updatedMap); rezultati ne console -> 652e836b29f693cb794f2d34 : true
    setSentRequestsMap(updatedMap);
  }, [sentRequests]);

  // Function to Send a Friend Request from the RightSideBar/Suggested Friends List
  const sendFriendRequest = ({ recipientUserId, senderUserId }) => {
    dispatch(sendFriendRequestAsync({ recipientUserId, senderUserId }))
      .then(() => {
        dispatch(getSentRequests(userId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // console.log("suggested friends: ", suggestedFriends);

  return (
    <section className={classes.Rightsidebar}>
      <h3>Suggested for you</h3>
      <div className={classes["friends-holder"]}>
        {suggestedFriends?.map((friend) => (
          <div key={friend._id} className={classes["one-friend"]}>
            <NavLink
              to={`id/${friend._id}`}
              key={friend._id}
              className={classes.navData}
            >
              <UserChip
                width={40}
                heigth={40}
                url={
                  friend?.profilePicture?.length === 0 ||
                  friend?.profilePicture === undefined
                    ? logo
                    : friend?.profilePicture
                }
              />
              <p>
                {friend.firstName} {friend.lastName}
              </p>
            </NavLink>
            {!sentRequestsMap[friend?._id] && (
              <button
                className={classes.addFriend}
                onClick={() =>
                  sendFriendRequest({
                    recipientUserId: friend?._id,
                    senderUserId: loggedInUser?._id,
                  })
                }
              >
                Add
              </button>
            )}
            {sentRequestsMap[friend?._id] && (
              <button className={classes.addFriend}>
                <FaCheck />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rightsidebar;
