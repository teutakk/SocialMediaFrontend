import classes from "./Requests.module.css";
import Bullet from "../about/Bullet";
import { NavLink, useParams } from "react-router-dom";
import { selectUser } from "../../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";
import { acceptFriendRequestAsync } from "../../../store/slices/friendshipSlice";

const Requests = () => {
  const [loadingStates, setLoadingStates] = useState({}); 

  const dispatch = useDispatch()
  const params = useParams();
  const loggedInUser = useSelector(selectUser);
  const pendingRequests = useSelector((state) => state.friendship.pendingRequests)
  const userId = loggedInUser?._id


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
    <div className={classes.Friends}>
      <p className={classes.title}>Friend Requests</p>
      <div className={classes["request-holder"]}>
          {pendingRequests?.map((friend, i) => (
            userId === friend?.requestTo &&
            <Bullet
              key={i}
              content={friend?.requestFrom?.firstName}
              subContent={friend?.requestFrom?._id}
              acceptFriendRequest={() => handleAcceptFriendRequest({
                senderUserId: friend.requestFrom._id,
                rid: friend._id,
                status: "Accepted",
              })}
              rejectFriendRequest={() => handleAcceptFriendRequest({
                senderUserId: friend.requestFrom._id,
                rid: friend._id,
                status: "Rejected",
              })}
              loadingStates={loadingStates[friend._id]}
            />
          ))}
        </div> 
        {pendingRequests.length !== 0 && <NavLink to={`/id/${params.idNumber}/requests`}>See more</NavLink> }
        {pendingRequests.length === 0 && <p className={classes.paragraph}>No new requests</p>  }
    </div>
  );
};

export default Requests;
