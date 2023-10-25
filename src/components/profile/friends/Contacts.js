import React from "react";
import classes from "./Contacts.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  PiPhoneCall,
  PiEnvelope,
  PiPerson,
  PiCake,
  PiClock,
} from "react-icons/pi";
import Bullet from "../about/Bullet";
import AddInfo from "../AddInfo";
const Contacts = () => {
  return (
    <div className={classes.Contacts}>
      <Bullet
        content={"+383 49 482 979"}
        subContent={"Mobile"}
        logo={<PiPhoneCall />}
      />
      <Bullet
        content="endrit.bejta@hotmail.com"
        subContent="E-mail"
        logo={<PiEnvelope />}
      />
      <AddInfo title="Website, social links" content="Add a website" />
      <AddInfo content="Add a social link" />
      <AddInfo title={"Basic info"} content={"Add basic info"} />
      <Bullet content="Male" subContent={"Gender"} logo={<PiPerson />} />
      <Bullet
        content={"December 10"}
        subContent={"Birthday"}
        logo={<PiCake />}
      />
      <Bullet content={"1997"} subContent={"Year"} logo={<PiClock />} />
    </div>
  );
};

export default Contacts;
