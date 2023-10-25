import React from "react";
import classes from "./Contacts.module.css";

import { format, parseISO } from "date-fns";

import { PiEnvelope, PiPerson, PiCake, PiClock } from "react-icons/pi";
import Bullet from "../about/Bullet";
import AddInfo from "../AddInfo";
import { useSelector } from "react-redux";
import { selectProfilePageUser } from "../../../store/slices/profileSlice";
const Contacts = () => {
  const profilePageUser = useSelector(selectProfilePageUser);

  const dateString = profilePageUser.birthday;
  const birthDate = parseISO(dateString);
  const yearOfBirth = format(birthDate, "yyyy");
  const formatedDayAndMonth = format(birthDate, "MMMM dd");
  return (
    <div className={classes.Contacts}>
      <Bullet
        content={profilePageUser.email}
        subContent="E-mail"
        logo={<PiEnvelope />}
      />
      <AddInfo title="Website, social links" content="Add a website" />
      <AddInfo content="Add a social link" />
      <AddInfo title={"Basic info"} content={"Add basic info"} />
      <Bullet
        content={profilePageUser.gender}
        subContent={"Gender"}
        logo={<PiPerson />}
      />
      <Bullet
        content={formatedDayAndMonth}
        subContent={"Birthday"}
        logo={<PiCake />}
      />
      <Bullet content={yearOfBirth} subContent={"Year"} logo={<PiClock />} />
    </div>
  );
};

export default Contacts;
