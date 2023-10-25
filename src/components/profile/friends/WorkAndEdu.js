import React from "react";
import classes from "./WorkAndEdu.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddInfo from "../AddInfo";
const WorkAndEdu = () => {
  return (
    <div className={classes.WorkAndEdu}>
      <AddInfo title={"Work"} content={"Add a workplace"} />
      <AddInfo title={"College"} content={"Add college"} />
      <AddInfo title={"High school"} content={"Add high school"} />
    </div>
  );
};

export default WorkAndEdu;
