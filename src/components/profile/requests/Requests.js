import React, { useEffect, useState } from "react";
import classes from "./Requests.module.css";
import Bullet from "../about/Bullet";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchFriends } from "../../../store/slices/friendshipSlice";
import { selectUser } from "../../../store/slices/authSlice";
import {useSelector, useDispatch} from "react-redux"

const Requests = () => {
    
  const [users, setUsers] = useState([])
  const params = useParams();
  const dispatch = useDispatch()

  const loggedInUser = useSelector(selectUser);
  const userId = loggedInUser._id

  const handleFetchFriends = (userId) => {
    dispatch(fetchFriends(userId)).then((response) => {
      setUsers(response.payload.data)
    })
    console.log(userId);
  }
  console.log(users);

  useEffect(() => {
    handleFetchFriends(userId)
  }, [])

console.log(users);
  return (
    <div className={classes.Friends}>
      <p className={classes.title}>Friend Requests</p>
     {users ? 
     <div className={classes["request-holder"]}>
        {users.map((friend, i) => (
          <Bullet
            key={i}
            content={friend.requestFrom.firstName}
            logo="s"
          />
        ))}
      <NavLink to={`/id/${params.idNumber}/requests`}>See more</NavLink>
      </div> 
      : <p className={classes.paragraph}>No new requests</p>}
    </div>
  );
};

export default Requests;
