import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequestAsync,
  rejectFriendRequestAsync,
  removeFriendRequestAsync,
  sendFriendRequestAsync,
} from "../store/slices/friendshipSlice";
import FriendList from "../components/friendship/FriendList";

const FriendShip = () => {
  const [showRequest, setShowRequest] = useState(true);

  const friends = useSelector((state) => state.friendship.friends);
  const pendingRequests = useSelector((state) => state.friendship.pendingRequests);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setShowRequest(!showRequest);
  };

  const handleSendFriendRequest = (friendRequestData) => {
    dispatch(sendFriendRequestAsync(friendRequestData));
    console.log(friendRequestData);
  };

  const handleAcceptFriendRequest = (friendId) => {
    dispatch(acceptFriendRequestAsync(friendId))
    console.log(friendId);
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
      <h3>My Friends</h3>
      {friends.map((friend) => {
        return (
          <div key={friend.id}>
            <FriendList key={friend.id} name={friend.name} />
            <button onClick={() => handleRemoveFriendRequest(friend.id)}>
              Remove Friend
            </button>
          </div>
        );
      })}
      <div>
        <button onClick={handleToggle}>Show Pending Requests</button>
        {showRequest && (
          <div>
            {pendingRequests.map((req) => {
              return (
                <div key={req.id}>
                  <FriendList name={req.name} />
                  <button onClick={() => handleAcceptFriendRequest(req.id)}>Accept Friend</button>
                  <button onClick={() => handleRejectFriendRequest(req.id)}>Reject Friend</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button  onClick={() => handleSendFriendRequest({ id: 6, name: "John"})}>
        Send a Friend Request
      </button>
    </div>
  );
};

export default FriendShip;
