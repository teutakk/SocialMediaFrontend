import React, { useEffect, useState } from "react";
import classes from "./Friends.module.css";
import Bullet from "../about/Bullet";
import { API_ROUTES } from "../../../api/apiConfig";
import axiosInstance from "../../../api/axiosInstance";
import { selectProfilePageUser } from "../../../store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { selectUser } from "../../../store/slices/authSlice";
import { removeFriendRequestAsync } from "../../../store/slices/friendshipSlice";
import { BiSearch } from "react-icons/bi";
import logo from "../../../assets/images/userSvg2.svg"

const Friends = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [search, setSearch] = useState("")
  const [loader, setLoader] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [showFriends, setShowFriends] = useState(false);
  const dispatch = useDispatch();

  const profilePageUser = useSelector(selectProfilePageUser);
  const loggedInUser = useSelector(selectUser);

  //nese some friends te loggedInUser.friends jane te barabarte me profilePageUser._id ate  here fetchFriendsData below
  useEffect(() => {
    const fetchFriendsData = async () => {
      setLoader(true);
      try {
        //check if the users you visit is friends with you, if yes then show the friends of that user
        const loggedUserFriends = loggedInUser?.friends;

        const isAFriend = loggedUserFriends?.some(
          (friend) => friend === profilePageUser?._id
        );

        if (isAFriend || loggedInUser?._id === profilePageUser?._id) {
          setShowFriends(true);

          //profilePageUser.friends contains the IDs of friends
          const friendIds = profilePageUser?.friends;

          if (friendIds) {
            const friendDataPromises = friendIds.map(async (friendId) => {
              const response = await axiosInstance.get(
                API_ROUTES.user + friendId
              );
              return response.data;
            });
            //Use Promise.all to make multiple requests to fetch user data for each friend
            const friendData = await Promise.all(friendDataPromises);

            //Now, friendData contains the user data for each friend user has
            setFriendsData(friendData);
            setLoader(false);
          }
        } else if (!isAFriend || loggedInUser?._id !== profilePageUser?._id) {
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

  //Remove Friend
  const handleRemoveFriendRequest = ({ did, id }) => {
    setLoadingStates({ ...loadingStates, [did]: true });
    dispatch(
      removeFriendRequestAsync({
        did: did,
        id: id,
      })
    )
      .then(() => {
        setFriendsData((prevFriendsData) =>
          prevFriendsData.filter((friend) => friend._id !== did)
        );
        setLoadingStates({ ...loadingStates, [did]: false });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.Friends}>
      {friendsData?.length > 0 && (<div className={classes.searchInput}>
        <label>
          <BiSearch />
        </label>
        <input
        className={classes.search}
        onChange={(e) => setSearch(e.target.value)}
        name="firstName"
        type="text"
        placeholder="Search"
      /></div>)}
      {loader && (
        <p className={classes.spinnerLoad}>
          <FaSpinner className={classes.spinner} />
        </p>
      )}
      {
        <div className={classes["friends-holder"]}>
          {!loader &&
            friendsData
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.firstName.toLowerCase().includes(search.toLowerCase());
              })
              .map((friend, i) => {
                return (
                  <Bullet
                    key={i}
                    navigation={`../../../id/${friend?._id}`}
                    content={friend?.firstName}
                    content2={friend?.lastName}
                    removeFriend={() =>
                      handleRemoveFriendRequest({
                        did: friend?._id,
                        id: loggedInUser?._id,
                      })
                    }
                    loadingStates={loadingStates[friend?._id]}
                    imageUrl= {friend?.profilePicture}
                  />
                );
              })}
        </div>
      }
      {/* {friendsData?.length !== 0 && !loader && (
        <NavLink
          to={`/id/${params.idNumber}/friends`}
          className={classes.navLink}
        >
          See more
        </NavLink>
      )} */}
      {friendsData?.length === 0 && !loader && showFriends && (
        <p className={classes.paragraph}>No Friends... yet</p>
      )}
      {!showFriends && !loader && (
        <p className={classes.paragraph}>Can't see user's friends!</p>
      )}
    </div>
  );
};

export default Friends;
