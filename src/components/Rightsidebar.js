import React from "react";
import classes from "./Rightsidebar.module.css";
import { friends } from "../api/dummyData";
import UserChip from "./UserChip";
const Rightsidebar = () => {
  return (
    <section className={classes.Rightsidebar}>
      <h3>Friends</h3>
      <div className={classes["friends-holder"]}>
        {friends.map((friend) => (
          // each friend should be a NavLink that send u to the profile of the friend, waiting for profilepage to be designed and change it
          <div key={friend.id} className={classes["one-friend"]}>
            <div className={classes.info}>
              <p>
                {friend.name} {friend.lastName}
              </p>
              {/* <p>@{friend.id}</p> */}
            </div>
            <UserChip width={40} heigth={40} url={friend.profilePicture} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rightsidebar;
