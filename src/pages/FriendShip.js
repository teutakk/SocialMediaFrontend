import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriends
} from "../store/slices/friendshipSlice";
import FriendList from "../components/friendship/FriendList";
import { selectUser } from "../store/slices/authSlice";
import classes from "./styles/Friendship.module.css";
import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/apiConfig";

const FriendShip = () => {
  const [friendsData, setFriendsData] = useState([]);

  const loggedInUser = useSelector(selectUser);
  const userId = loggedInUser?._id;
  console.log(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchFriends = () => {
      try {
        dispatch(fetchFriends(userId))
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    handleFetchFriends();
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendIds = loggedInUser?.friends;
        const friendDataPromises = friendIds.map(async (friendId) => {
          const response = await axiosInstance.get(API_ROUTES.user + friendId);
          return response.data;
        });

        const friendData = await Promise.all(friendDataPromises);

        setFriendsData(friendData);
        
      } catch (error) {
        console.error("Error fetching friends' data", error);
      }
    };
    fetchFriendsData();
  }, [loggedInUser?.friends]);


  return (
    <div className={classes.container}>
      <div className={classes.friends}>
        <h3>Friends</h3>
        {friendsData?.map((friend) => {
          return(
            <div key={friend?._id} className={classes.innerBlock}>
                 <FriendList name={friend.firstName} lastName={friend.lastName} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default FriendShip;
