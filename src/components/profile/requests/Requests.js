import classes from "./Requests.module.css";
import Bullet from "../about/Bullet";
import { selectUser } from "../../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";
import { acceptFriendRequestAsync, fetchFriends } from "../../../store/slices/friendshipSlice";

const Requests = () => {
  const [loadingStates, setLoadingStates] = useState({}); 
  const [search, setSearch] = useState("")

  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const pendingRequests = useSelector((state) => state.friendship.pendingRequests)
  const userId = loggedInUser?._id

  useEffect(() => {
    const handleFetchFriendRequests = () => {
     dispatch(fetchFriends(userId))
    }
    handleFetchFriendRequests()
  }, [])

  const handleAcceptFriendRequest = ({ rid, senderUserId, status }) => {
    setLoadingStates({ ...loadingStates, [rid]: { status: status } });
    dispatch(
      acceptFriendRequestAsync({
        rid: rid,
        senderUserId: senderUserId,
        status: status,
      })
    )
    .then(() => {
      // When the request is successful, set the loading state to false
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [rid]: false,
      }));
    })
    .catch((error) => {
      console.log(error);
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [rid]: false,
      }));
    });
  };
  return (
    <div className={classes.Requests}>
      {/* <p className={classes.title}>Friend Requests</p> */}
      {pendingRequests?.length > 0 && <input
        className={classes.search}
        onChange={(e) => setSearch(e.target.value)}
        name="firstName"
        type="text"
        placeholder="Search"
      />}
      <div className={classes["request-holder"]}>
          {pendingRequests?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.requestFrom.firstName.toLowerCase().includes(search.toLowerCase());
              }).map((friend, i) => (
            userId === friend?.requestTo &&
              <Bullet
                navigation={`/id/${friend?.requestFrom?._id}`}
                key={i}
                content={friend?.requestFrom?.firstName}
                content2={friend?.requestFrom?.lastName}
                acceptFriendRequest={() => handleAcceptFriendRequest({
                  senderUserId: friend?.requestFrom?._id,
                  rid: friend?._id,
                  status: "Accepted",
                })}
                rejectFriendRequest={() => handleAcceptFriendRequest({
                  senderUserId: friend?.requestFrom?._id,
                  rid: friend?._id,
                  status: "Rejected",
                })}
                loadingStates={loadingStates[friend?._id]}
                imageUrl={friend?.requestFrom?.profilePicture}
              />
          ))}
        </div> 
        {/* {pendingRequests.length !== 0 && <NavLink className={classes.navLink} to={`/id/${params.idNumber}/requests`}>See more</NavLink> } */}
        {pendingRequests.length === 0 && <p className={classes.paragraph}>No new requests</p>  }
    </div>
  );
};

export default Requests;
