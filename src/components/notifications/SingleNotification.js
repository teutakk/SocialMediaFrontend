import React from "react";
import classes from "./SingleNotification.module.css";
import UserChip from "../UserChip";
import logo from "../../assets/images/starlabs.png";
// const SingleNotification = ({ notification }) => {
//   let content;
//   if (notification?.type === "friend-request") {
//     content = (
//       <>
//         <p>
//           <strong>{notification?.sender.name}</strong> sent you a friend request
//         </p>
//         <div className={classes.actions}>
//           <button className={classes.button}>Ignore</button>
//           <button className={classes.button}>Confirm</button>
//         </div>
//       </>
//     );
//   }
//   if (notification?.type === "post-like") {
//     content = (
//       <>
//         <p>
//           <strong>{notification.sender.name}</strong> liked your post
//         </p>
//         <p>{notification.content}</p>
//       </>
//     );
//   }

//   if (notification?.type === "comment-like") {
//     content = (
//       <>
//         <p>
//           <strong>{notification?.sender.name}</strong> liked your comment.
//         </p>
//         <p>{notification.content}</p>
//       </>
//     );
//   }

//   if (notification?.type === "post-comment") {
//     content = (
//       <>
//         <p>
//           <strong>{notification.sender.name}</strong> commented on your post
//         </p>
//         <p>{notification.content}</p>
//       </>
//     );
//   }

//   if (notification?.type === "comment-like") {
//     content = (
//       <>
//         <p>
//           <strong>{notification.sender.name}</strong> liked your comment
//         </p>
//         <p>{notification.content}</p>
//       </>
//     );
//   }
//   if (notification?.type === "post-comment") {
//     content = (
//       <>
//         <p>
//           <strong>{notification.sender.name}</strong> commented on your post
//         </p>
//         <p>{notification.content}</p>
//       </>
//     );
//   }

//   return (
//     <div className={classes["Single-Notification"]}>
//       {!notification?.read && <span className={classes.point}></span>}
//       <UserChip width={40} heigth={40} url={logo} />
//       <div className={classes.content}>{content}</div>
//     </div>
//   );
// };
const SingleNotification = ({ notification }) => {
  return (
    <div className={classes["Single-Notification"]}>
      {/* Render the notification data */}
      <p>{notification}</p>
    </div>
  );
};
export default SingleNotification;
