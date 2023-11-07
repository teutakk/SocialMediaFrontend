import React from 'react'
import classes from "./FriendList.module.css"

const FriendList = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.block} key={props.id}>
        <img
          className={classes.icon}
          src="https://www.pngarts.com/files/5/User-Avatar-Transparent-Images.png"
        />
        <p>{props.name} {props.lastName}</p>
      </div>
    </div>
  );
}

export default FriendList