import React, { useState, useEffect } from "react";
import classes from "./WorkAndEdu.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
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

const WorkAndEdu = () => {
  const [data, setData] = useState([
    {
      key: "work",
      title: "Work",
      editMode: false,
    },
    {
      key: "college",
      title: "College",
      editMode: false,
    },
    {
      key: "highSchool",
      title: "High school",
      editMode: false,
    },
  ]);

  const [userDetails, setUserDetails] = useState({});
  const [userDetailsAlreadyExist, setUserDetailsAlreadyExist] = useState(false);

  const profilePageUser = useSelector(selectProfilePageUser);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem(
      `userDetails_${params.idNumber}`
    );
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
      setUserDetailsAlreadyExist(true);
    } else {
      dispatch(fetchUserDetails(params.idNumber)).then((response) => {
        if (response?.payload?.data) {
          setUserDetails(response.payload.data);
          setUserDetailsAlreadyExist(true);
        }
      });
    }
  }, [dispatch, params.idNumber]);

  useEffect(() => {
    localStorage.setItem(
      `userDetails_${params.idNumber}`,
      JSON.stringify(userDetails)
    );
  }, [userDetails, params.idNumber]);

  const handleAddInput = (index) => {
    const updatedItems = [...data];
    updatedItems[index].editMode = true;
    setData(updatedItems);
  };

  return (
    <div className={classes.WorkAndEdu}>
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
    </div>
  );
};

export default WorkAndEdu;
