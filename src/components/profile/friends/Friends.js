import React, { useEffect, useState } from "react";
import classes from "./Friends.module.css";
import Bullet from "../about/Bullet";
import { NavLink, useParams } from "react-router-dom";
import { API_ROUTES } from "../../../api/apiConfig";
import axiosInstance from "../../../api/axiosInstance";
import { selectProfilePageUser } from "../../../store/slices/profileSlice";
import { useSelector } from "react-redux"
const Friends = () => {
  const [friendsData, setFriendsData] = useState([]);

  const params = useParams();
  const profilePageUser = useSelector(selectProfilePageUser);

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        // profilePageUser.friends contains the IDs of friends
        const friendIds = profilePageUser.friends;
        // Use Promise.all to make multiple requests to fetch user data for each friend
        const friendDataPromises = friendIds.map(async (friendId) => {
          const response = await axiosInstance.get(API_ROUTES.user + friendId);
          return response.data;
        });

        const friendData = await Promise.all(friendDataPromises);

        // Now, friendData contains the user data for each friend
        setFriendsData(friendData);

      } catch (error) {
        console.error("Error fetching friends' data", error);
      }
    };

    fetchFriendsData();
  }, [profilePageUser.friends]);


  return (

    <div className={classes.Friends}>

      <p className={classes.title}>{friendsData.length} Friends</p>
      <div className={classes["friends-holder"]}>
      {friendsData?.map((friend) => {
        return(
          <Bullet
            subContent={friend.email}
            content={friend.firstName}
          />
        )
      })}
         
      </div>
      <NavLink to={`/id/${params.idNumber}/friends`}>See more</NavLink> 
    </div>
  );
};

export default Friends;
