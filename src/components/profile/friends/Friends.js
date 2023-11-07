import React, { useEffect, useState } from "react";
import classes from "./Friends.module.css";
import Bullet from "../about/Bullet";
import { NavLink, useParams } from "react-router-dom";
import { API_ROUTES } from "../../../api/apiConfig";
import axiosInstance from "../../../api/axiosInstance";
import { selectProfilePageUser } from "../../../store/slices/profileSlice";
import { useSelector } from "react-redux"
import { FaSpinner } from "react-icons/fa";

const Friends = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const params = useParams();
  
  const profilePageUser = useSelector(selectProfilePageUser);
 
  useEffect(() => {
    const fetchFriendsData = async () => {
      setLoader(true)
      try {
        // profilePageUser.friends contains the IDs of friends
        const friendIds = profilePageUser?.friends;
        // Use Promise.all to make multiple requests to fetch user data for each friend
        const friendDataPromises = friendIds.map(async (friendId) => {
          const response = await axiosInstance.get(API_ROUTES.user + friendId);
          return response.data;
        });

        const friendData = await Promise.all(friendDataPromises);

        // Now, friendData contains the user data for each friend
        setFriendsData(friendData);
        setLoader(false)

      } catch (error) {
        console.error("Error fetching friends' data", error);
        setLoader(false)
      }
    };

    fetchFriendsData();
  }, [profilePageUser?.friends]);

  return (
    <div className={classes.Friends}>
      <p className={classes.title}>{friendsData.length} {friendsData.length !== 1 ? "Friends": "Friend"}</p>
      {loader && (
        <p className={classes.spinnerLoad}>
          <FaSpinner className={classes.spinner} />
        </p>
      )}
      {
        <div className={classes["friends-holder"]}>
          {!loader &&
            friendsData?.map((friend, i) => {
              return (
                <NavLink to={`../../../id/${friend._id}`} key={i}>
                  <Bullet subContent={friend.email} content={friend.firstName} />
                </NavLink>
              );
            })}
        </div>
      }
      {friendsData.length !== 0 && !loader && (
        <NavLink to={`/id/${params.idNumber}/friends`} className={classes.navLink}>See more</NavLink>
      )}
      {friendsData.length === 0 && !loader &&(
        <p className={classes.paragraph}>No Friends... yet</p>
      )}
    </div>
  );
};

export default Friends;
