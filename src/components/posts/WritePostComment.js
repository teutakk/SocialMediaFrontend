import React from "react";
import classes from "./WritePostComment.module.css";
import logo from "../../assets/images/starlabs.png";
import UserChip from "../UserChip";

const WritePostComment = () => {
  return (
    <section className={classes.WritePostComment}>
      <UserChip url={logo} />
      <form className={classes.Comment}>
        <textarea rows={1} id="comment" placeholder="Write a comment" />
        <button type="submit">▶</button>
      </form>
    </section>
  );
};

export default WritePostComment;
