

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

const FriendShip = () => {
  const [showRequest, setShowRequest] = useState(true);
  const [users, setUsers] = useState([])

  const selectedUser = useSelector(selectUser)
  const friends = useSelector(state => state.friendship.friends)
  console.log(friends);
  const userId = selectedUser?._id

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setShowRequest(!showRequest);
  };

  const handleFetchFriends = (userId) => {
    dispatch(fetchFriends(userId)).then((response) => {
      setUsers(response.payload.data)
      console.log(users); 
    })
    console.log(userId);
  }

  useEffect(() => {
    handleFetchFriends(userId)
  }, [])

  const handleSendFriendRequest = (friendRequestData) => {
    dispatch(sendFriendRequestAsync(friendRequestData));
    console.log(friendRequestData);
  };

  const handleAcceptFriendRequest = ({rid, senderUserId, status}) => {
    dispatch(acceptFriendRequestAsync({
      rid: rid,
      senderUserId: senderUserId,
      status: status
    })).then((response) => console.log(response.payload)
      ).catch((error) => {
        console.log(error);
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
      {users?.map((relation) => {
        return(
          <div key={relation._id}>
            <div>
              {relation?.requestFrom && (
                <div>
                  <div>
                    <FriendList name={relation.requestFrom?.firstName} />
                    <button onClick={() => handleAcceptFriendRequest({senderUserId: relation.requestFrom._id, rid: relation._id, status: "Accepted"})}>Accept Friend</button>
                    {/* <button onClick={() => handleRejectFriendRequest(user.requestFrom?._id)}>Reject Friend</button> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default FriendShip;

