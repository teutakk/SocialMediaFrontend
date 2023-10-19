import React from "react";
import classes from "./Sidebar.module.css";
import UserChip from "./UserChip";
const Sidebar = () => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.profile}>
        <UserChip width={53} heigth={53} />
        <div className={classes.user}>
          <p>
            <strong>Endrit Bejta</strong>
          </p>
          <p>@endritbejta</p>
        </div>
      </div>
      <section className={classes["routing-options"]}>
        Routes here
        <p>Routes</p>
        <p>Routes</p>
        <p>Routes</p>
        <p>Routes</p>
        <p>Routes</p>
        <p>Routes</p>
        <p>Routes</p>
        <p>Routes</p>
      </section>
    </div>
  );
};

export default Sidebar;
