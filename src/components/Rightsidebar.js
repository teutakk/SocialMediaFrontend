import React, { useEffect, useState } from "react";
import classes from "./Rightsidebar.module.css";
import { friends } from "../api/dummyData";
import UserChip from "./UserChip";
import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/apiConfig";
import { NavLink } from "react-router-dom";
const Rightsidebar = () => {
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(API_ROUTES.users);
        setUsers(response.data);
      } catch (err) {
        setError(err.response.data);
      }
    };
    fetchUsers();
  }, []);
  return (
    <section className={classes.Rightsidebar}>
      <h3>Suggested for you</h3>
      <div className={classes["friends-holder"]}>
        {users?.map((friend) => (
          // each friend should be a NavLink that send u to the profile of the friend, waiting for profilepage to be designed and change it
          <NavLink
            to={`id/${friend._id}`}
            key={friend._id}
            className={classes["one-friend"]}
          >
            <div className={classes.info}>
              <p>
                {friend.firstName} {friend.lastName}
              </p>
            </div>
            <UserChip width={40} heigth={40} url={friend.profilePicture} />
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Rightsidebar;
