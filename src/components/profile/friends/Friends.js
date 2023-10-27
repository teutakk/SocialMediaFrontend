import React from "react";
import classes from "./Friends.module.css";
import Bullet from "../about/Bullet";
import { NavLink, useNavigate, useParams } from "react-router-dom";
const Friends = () => {
  const friends = [
    {
      name: "Maksut Durguti",
      mutual: "100 mutal friends",
      logo: "https://plus.unsplash.com/premium_photo-1664392248318-4e1d9361726e?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fHww",
    },
    {
      name: "Vlora Lubonja",
      mutual: "50 mutual friends",
      logo: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Gentrit Mazreku",
      mutual: "20 mutual friends",
      logo: "https://images.unsplash.com/photo-1454923634634-bd1614719a7b?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww",
    },
    {
      name: "Elbasane Izmaku",
      mutual: "30 mutual friends",
      logo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww",
    },
    {
      name: "Monkey D. Luffy",
      mutual: "11 mutual friends",
      logo: "https://images.unsplash.com/photo-1629019725048-75f3fd5edd1c?auto=format&fit=crop&q=60&w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHVmZnl8ZW58MHx8MHx8fDA%3D",
    },
  ];
  const params = useParams();

  return (
    <h1>Cooming soon!</h1>
    // <div className={classes.Friends}>

    //   <p className={classes.title}>Cooming soon!</p>
    //   {/* <div className={classes["friends-holder"]}>
    //     {friends.map((friend, i) => (
    //       <Bullet
    //         key={i}
    //         content={friend.name}
    //         subContent={friend.mutual}
    //         logo={friend.logo}
    //       />
    //     ))}
    //   </div>
    //   <NavLink to={`/id/${params.idNumber}/friends`}>See more</NavLink> */}
    //   {/* <button onClick={clickHandler}>See more</button> */}
    // </div>
  );
};

export default Friends;
