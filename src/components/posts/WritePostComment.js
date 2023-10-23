import React from "react";
import classes from "./WritePostComment.module.css";
import logo from "../../assets/images/starlabs.png";
import UserChip from "../UserChip";
import send from "../../assets/svg/send.svg";

const WritePostComment = () => {
  return (
    <section className={classes.WritePostComment}>
      <UserChip width={40} heigth={40} url={logo} />
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
