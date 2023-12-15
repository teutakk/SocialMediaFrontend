import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import classes from "./styles/Notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/posts/notifications",
          { userId: "65787fbf68a141c507ae98f1" } // Ketu ja dergon id e userit te loguar
        );
        setNotifications(response.data.messages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.Notifications}>
      <h3 className={classes.title}>Notifications center</h3>
      <div className={classes.notificationsHolder}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : !notifications || notifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          notifications.map((message, index) => <p key={index}>{message}</p>)
        )}
      </div>
    </div>
  );
};
export default Notifications;
