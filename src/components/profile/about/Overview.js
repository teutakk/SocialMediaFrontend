import React from "react";
import classes from "./Overview.module.css";
import Bullet from "./Bullet";
import {
  PiGameController,
  PiGraduationCapLight,
  PiMapPin,
  PiPhoneCall,
} from "react-icons/pi";
import { BiSolidSchool } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectProfilePageUser } from "../../../store/slices/profileSlice";
import AddInfo from "../AddInfo";
const Overview = () => {
  const profilePageUser = useSelector(selectProfilePageUser);
  const data = [
    {
      title: "University",
      content: "Add university",
    },
    {
      title: "High school",
      content: "Add high school",
    },
    {
      title: "Birthplace",
      content: "Add a birthplace",
    },
    {
      title: "Country",
      content: "Add a country",
    },
    {
      title: "Phone",
      content: "Add a phone number",
    },
  ];
  return (
    <div className={classes.Overview}>
      {data.map((bullet, i) => (
        <AddInfo key={i} title={bullet.content} content={bullet.content} />
      ))}
    </div>
  );
};

export default Overview;
