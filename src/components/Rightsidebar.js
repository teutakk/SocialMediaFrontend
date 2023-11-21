import React, { useEffect, useState } from "react";
import classes from "./Rightsidebar.module.css";
import UserChip from "./UserChip";
import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/apiConfig";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";

const Rightsidebar = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  const loggedInUser = useSelector(selectUser);
  const userId = loggedInUser?._id

  useEffect(() => {
    const fetchSuggestedFriends = async (userId) => {
      try {
        const response = await axiosInstance.post(API_ROUTES.suggestedFriends, {userId})
        console.log(response.data);
        setSuggestedFriends(response?.data?.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSuggestedFriends(userId)
  }, [userId])

  return (
    <section className={classes.Rightsidebar}>
      <h3>Suggested for you</h3>
      <div className={classes["friends-holder"]}>
        {suggestedFriends?.map((friend) => (
          <NavLink
            to={`id/${friend._id}`}
            key={friend._id}
            className={classes["one-friend"]}
          >
            <p>
              {friend.firstName} {friend.lastName}
            </p>
            <UserChip width={40} heigth={40} url={friend.profilePicture} />
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Rightsidebar;
