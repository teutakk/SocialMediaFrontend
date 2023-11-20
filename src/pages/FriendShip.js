import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendList from "../components/friendship/FriendList";
import { selectUser } from "../store/slices/authSlice";
import classes from "./styles/Friendship.module.css";
import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/apiConfig";

const FriendShip = () => {
  const [friendsData, setFriendsData] = useState([]);

  const loggedInUser = useSelector(selectUser);

  console.log(loggedInUser);

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
        
        console.log(friendsData);
      } catch (error) {
        console.error("Error fetching friends' data", error);
      }
    };
    fetchFriendsData();
  }, [loggedInUser]);

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
