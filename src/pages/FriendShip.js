import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequestAsync,
  fetchFriends,
  rejectFriendRequestAsync,
  removeFriendRequestAsync,
  sendFriendRequestAsync,
} from "../store/slices/friendshipSlice";
import FriendList from "../components/friendship/FriendList";
import { selectUser } from "../store/slices/authSlice";
import classes from "./styles/Friendship.module.css";
import { FaSpinner } from "react-icons/fa";

const FriendShip = () => {
  const [users, setUsers] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const selectedUser = useSelector(selectUser);
  const pendingRequests = useSelector(
    (state) => state.friendship.pendingRequests
  );
  const userId = selectedUser?._id;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchFriends = () => {
      try {
        dispatch(fetchFriends(userId)).then((response) => {
          setUsers(response.payload.data);
        });
      } catch (error) {}
    };
    handleFetchFriends();
  }, [dispatch, userId]);

  const handleSendFriendRequest = (friendRequestData) => {
    dispatch(sendFriendRequestAsync(friendRequestData));
  };

  const handleAcceptFriendRequest = ({ rid, senderUserId, status }) => {
    setLoadingStates({ ...loadingStates, [rid]: { status: status } });
    dispatch(
      acceptFriendRequestAsync({
        rid: rid,
        senderUserId: senderUserId,
        status: status,
      })
    )
      .then((response) => {
        setLoadingStates({ ...loadingStates, [rid]: false });
      })
      .catch((error) => {
        setLoadingStates({ ...loadingStates, [rid]: false });
      });
  };

  const handleRejectFriendRequest = (friendId) => {
    dispatch(rejectFriendRequestAsync(friendId));
  };
  const handleRemoveFriendRequest = (friendId) => {
    dispatch(removeFriendRequestAsync(friendId));
  };

  return (
    <div>
      <h3>Friend Requests</h3>
      {pendingRequests?.map((relation) => {
        return (
          <div key={relation._id}>
            <div>
              {relation?.requestFrom && (
                <div>
                  <div>
                    <FriendList name={relation.requestFrom?.firstName} />
                    {loadingStates[relation._id] &&
                    loadingStates[relation._id].status === "Accepted" ? (
                      <button className={classes.button}>
                        <span>
                          <FaSpinner className={classes.spinner} />{" "}
                        </span>
                      </button>
                    ) : (
                      <button
                        className={classes.button}
                        onClick={() =>
                          handleAcceptFriendRequest({
                            senderUserId: relation.requestFrom._id,
                            rid: relation._id,
                            status: "Accepted",
                          })
                        }
                      >
                        Accept Friend
                      </button>
                    )}
                    {loadingStates[relation._id] &&
                    loadingStates[relation._id].status === "Rejected" ? (
                      <button className={classes.button}>
                        <span>
                          <FaSpinner className={classes.spinner} />{" "}
                        </span>
                      </button>
                    ) : (
                      <button
                        className={classes.button}
                        onClick={() =>
                          handleAcceptFriendRequest({
                            senderUserId: relation.requestFrom._id,
                            rid: relation._id,
                            status: "Rejected",
                          })
                        }
                      >
                        Reject Friend
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendShip;
