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
const Overview = () => {
  const profilePageUser = useSelector(selectProfilePageUser);
  console.log("profilePageUser", profilePageUser);
  const data = [
    {
      content: "Studies Electric power at Universiteti i Prishtines",
      subContent: "Started in 2015",
      logo: <PiGraduationCapLight />,
    },
    {
      content: "Went to Gjimnazi Hamez Jashari in Skënderaj",
      subContent: "Finished in 2015",
      logo: <BiSolidSchool />,
    },
    {
      content: "Lives in Skënderaj",
      subContent: null,
      logo: <PiMapPin />,
    },
    {
      content: "From Kosovo",
      subContent: null,
      logo: <PiMapPin />,
    },
    {
      content: "+383 49 69247420",
      subContent: "Mobile",
      logo: <PiPhoneCall />,
    },
  ];
  return (
    <div className={classes.Overview}>
      {data.map((bullet, i) => (
        <Bullet
          key={i}
          content={bullet.content}
          subContent={bullet.subContent}
          logo={bullet.logo}
        />
      ))}
    </div>
  );
};

export default Overview;
