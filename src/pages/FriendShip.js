

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
import classes from "./styles/Friendship.module.css"
import {FaSpinner} from "react-icons/fa"

const FriendShip = () => {
  const [showRequest, setShowRequest] = useState(true);
  const [users, setUsers] = useState([])
  const [loadingStates, setLoadingStates] = useState({})

  const selectedUser = useSelector(selectUser)
  const pendingRequests = useSelector(state => state.friendship.pendingRequests)
  console.log("pendingRequests", pendingRequests);
  const userId = selectedUser?._id

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setShowRequest(!showRequest);
  };

  

  useEffect(() => {
    const handleFetchFriends = () => {
        try {
          dispatch(fetchFriends(userId)).then((response) => {
            setUsers(response.payload.data);
        })
        console.log(userId);
      } catch (error) {
      console.log(error);
      }
    }
    handleFetchFriends()
  }, [dispatch, userId])

  const handleSendFriendRequest = (friendRequestData) => {
    dispatch(sendFriendRequestAsync(friendRequestData));
    console.log(friendRequestData);
  };

  const handleAcceptFriendRequest = ({rid, senderUserId, status}) => {
    setLoadingStates({ ...loadingStates, [rid]: true });
    dispatch(acceptFriendRequestAsync({
      rid: rid,
      senderUserId: senderUserId,
      status: status
    })).then((response) => {console.log(response.payload);  setLoadingStates({ ...loadingStates, [rid]: false }) })  
      .catch((error) => {
        console.log(error);
        setLoadingStates({ ...loadingStates, [rid]: false });
      }) 
  }

  const handleRejectFriendRequest = (friendId) => {
    dispatch(rejectFriendRequestAsync(friendId))
    console.log(friendId);
  }
  const handleRemoveFriendRequest = (friendId) => {
    dispatch(removeFriendRequestAsync(friendId))
    console.log(friendId);
  }

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
                    {loadingStates[relation._id] ?
                      <button className={classes.button}><span><FaSpinner className={classes.spinner} /> </span></button>
                      :
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
                      
                    }
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

