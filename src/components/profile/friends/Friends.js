import React, { useEffect, useState } from "react";
import classes from "./Friends.module.css";
import Bullet from "../about/Bullet";
import { NavLink, useParams } from "react-router-dom";
import { API_ROUTES } from "../../../api/apiConfig";
import axiosInstance from "../../../api/axiosInstance";
import { selectProfilePageUser } from "../../../store/slices/profileSlice";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { selectUser } from "../../../store/slices/authSlice";

const Friends = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const params = useParams();

  const profilePageUser = useSelector(selectProfilePageUser);
  const loggedInUser = useSelector(selectUser);
  //wait for data
  // const friends = useSelector((state) => state.friendship.friends);
  // console.log(friends);

  //nese some friends te loggedInUser.friends jane te barabarte me profilePageUser._id athere fetchFriendsData below
  useEffect(() => {
    const fetchFriendsData = async () => {
      setLoader(true);
      try {
        // check if the users you visit is friends with you, if yes then show the friends of that user
        const loggedUserFriends = loggedInUser?.friends;
        console.log(loggedUserFriends);
        //me shtu diqka qe me kqyr prap nese aj user tek i cili ndodhemi me u recheck again nese e bojm remove nje friend prej profilit
        const isAFriend = loggedUserFriends.some(
          (friend) => friend === profilePageUser?._id
        );

        if (isAFriend || loggedInUser?._id === profilePageUser?._id) {
          setShowFriends(true);

          // profilePageUser.friends contains the IDs of friends
          const friendIds = profilePageUser?.friends;
          // Use Promise.all to make multiple requests to fetch user data for each friend
          const friendDataPromises = friendIds.map(async (friendId) => {
            const response = await axiosInstance.get(
              API_ROUTES.user + friendId
            );
            return response.data;
          });

          const friendData = await Promise.all(friendDataPromises);
          // Now, friendData contains the user data for each friend user has

          setFriendsData(friendData);
          setLoader(false);

        } else if (!isAFriend || loggedInUser._id !== profilePageUser._id) {
          setShowFriends(false);
          setLoader(false);
        }
      } catch (error) {
        console.error("Error fetching friends' data", error);
        setLoader(false);
      }
    };

    fetchFriendsData();
  }, [
    profilePageUser?.friends,
    profilePageUser?._id,
    loggedInUser?.friends,
    loggedInUser?._id,
  ]);

  return (
    <div className={classes.Friends}>
      <p className={classes.title}>
        {friendsData.length} {friendsData.length !== 1 ? "Friends" : "Friend"}
      </p>
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
                  <Bullet
                    navigation={`../../../id/${friend._id}`}
                    subContent={friend.email}
                    content={friend.firstName}
                  />
              );
            })}
        </div>
      }
      {friendsData.length !== 0 && !loader && (
        <NavLink
          to={`/id/${params.idNumber}/friends`}
          className={classes.navLink}
        >
          See more
        </NavLink>
      )}
      {friendsData.length === 0 && !loader && showFriends && (
        <p className={classes.paragraph}>No Friends... yet</p>
      )}
      {!showFriends && !loader && (
        <p className={classes.paragraph}>Can't see users posts!</p>
      )}
    </div>
  );
};

export default Friends;
