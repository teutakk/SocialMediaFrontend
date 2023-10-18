import React from "react";
import classes from "./WritePostComment.module.css";
import logo from "../../assets/images/starlabs.png";
import UserChip from "../UserChip";
import send from "../../assets/svg/send.svg";

const WritePostComment = () => {
  console.log("send: ", send);
  return (
    <section className={classes.WritePostComment}>
      <UserChip url={logo} />
      <form className={classes.Comment}>
        <textarea rows={1} id="comment" placeholder="Write a comment..." />
        <button type="submit">
          <img src={send} alt="send comment" />
        </button>
      </form>
    </section>
  );
};

export default WritePostComment;
