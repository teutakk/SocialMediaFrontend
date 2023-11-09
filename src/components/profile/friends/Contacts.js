import React, { useEffect, useState } from "react";
import classes from "./Contacts.module.css";
import { format, parseISO } from "date-fns";
import Bullet from "../about/Bullet";
import { PiEnvelope, PiPerson, PiCake, PiClock } from "react-icons/pi";
import AddInfo from "../AddInfo";
import ShowInfo from "../ShowInfo";
import {
  selectProfilePageUser,
  fetchUserDetails,
  updateUserDetails,
  createUserDetails,
} from "../../../store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Contacts = () => {
  const [data, setData] = useState([
    {
      key: "website",
      title: "Website",
      editMode: false,
    },
    {
      key: "socialLink",
      title: "Social link",
      editMode: false,
    },
    {
      key: "basicInfo",
      title: "Basic info",
      editMode: false,
    },
  ]);

  const [userDetails, setUserDetails] = useState({});
  const [userDetailsAlreadyExist, setUserDetailsAlreadyExist] = useState(false);

  const profilePageUser = useSelector(selectProfilePageUser);

  const dateString = profilePageUser.birthday;
  const birthDate = dateString ? parseISO(dateString) : null;
  const yearOfBirth = birthDate ? format(birthDate, "yyyy") : "";
  const formatedDayAndMonth = birthDate ? format(birthDate, "MMMM dd") : "";

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails(params.idNumber)).then((response) => {
      if (response?.payload?.data) setUserDetailsAlreadyExist(true);
      setUserDetails(response?.payload?.data || {});
    });
  }, [dispatch, params.idNumber]);

  useEffect(() => {
    const saveUserDetails = async () => {
      try {
        if (userDetailsAlreadyExist) {
          dispatch(
            updateUserDetails({
              userId: params.idNumber,
              userDetails: userDetails,
            })
          );
        } else {
          dispatch(
            createUserDetails({
              userId: params.idNumber,
              userDetails: userDetails,
            })
          );
          setUserDetailsAlreadyExist(true);
        }
      } catch (error) {
        console.error("Error saving user details:", error);
      }
    };
    saveUserDetails();
  }, [dispatch, params.idNumber, userDetails, userDetailsAlreadyExist]);

  const handleAddInput = (index) => {
    const updatedItems = [...data];
    updatedItems[index].editMode = true;
    setData(updatedItems);
  };

  return (
    <div className={classes.Contacts}>
      {data.map((bullet, i) => (
        <div key={i}>
          {userDetails[bullet.key] || bullet.editMode ? (
            <ShowInfo
              title={bullet.title}
              initialContent={userDetails[bullet.key]}
              onSave={(updatedContent) => {
                setUserDetails({
                  ...userDetails,
                  [bullet.key]: updatedContent,
                });
              }}
              onEditMode={bullet.editMode}
            />
          ) : (
            <AddInfo
              title={bullet.title}
              content={bullet.content || `Add ${bullet.title.toLowerCase()}`}
              onAddClick={() => handleAddInput(i)}
            />
          )}
        </div>
      ))}

      {profilePageUser.gender && (
        <Bullet
          content={profilePageUser.gender}
          subContent={"Gender"}
          logo={<PiPerson />}
        />
      )}
      {formatedDayAndMonth && (
        <Bullet
          content={formatedDayAndMonth}
          subContent={"Birthday"}
          logo={<PiCake />}
        />
      )}
      {yearOfBirth && (
        <Bullet content={yearOfBirth} subContent={"Year"} logo={<PiClock />} />
      )}
    </div>
  );
};

export default Contacts;
