import React, { useEffect, useState } from "react";
import classes from "./Overview.module.css";
import AddInfo from "../AddInfo";
import ShowInfo from "../ShowInfo";
import { useParams } from "react-router-dom";
import {
  fetchUserDetails,
  createUserDetails,
  updateUserDetails,
} from "../../../store/slices/profileSlice";
import { useDispatch } from "react-redux";

const Overview = () => {
  const [data, setData] = useState([
    {
      key: "university",
      title: "University",
      editMode: false,
    },
    {
      key: "highschool",
      title: "High school",
      editMode: false,
    },
    {
      key: "birthplace",
      title: "Birthplace",
      editMode: false,
    },
    // {
    //   key: "country",
    //   title: "Country",
    //   editMode: false,
    // },
    {
      key: "phoneNumber",
      title: "Phone",
      editMode: false,
    },
  ]);

  const [userDetails, setUserDetails] = useState({
    userId: null,
    highschool: null,
    university: null,
    residence: null,
    birthplace: null,
    phoneNumber: null,
    profession: null,
  });
  const [userDetailsAlreadyExist, setUserDetailsAlreadyExist] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails(params.idNumber)).then((response) => {
      if (response?.payload?.data) setUserDetailsAlreadyExist(true);
      setUserDetails(response?.payload?.data || {});
    });
  }, [dispatch, params.idNumber]);

  useEffect(() => {
    if (userDetailsAlreadyExist) {
      dispatch(
        updateUserDetails({
          userId: params.idNumber,
          userDetails: userDetails,
        })
      );
    } else {
      dispatch(
        createUserDetails({ userId: params.idNumber, userDetails: userDetails })
      );
    }
  }, [dispatch, params.idNumber, userDetails, userDetailsAlreadyExist]);

  const handleAddInput = (index) => {
    const updatedItems = [...data];
    updatedItems[index].editMode = true;
    setData(updatedItems);
  };

  return (
    <div className={classes.Overview}>
      {data.map((bullet, i) => (
        <div key={i}>
          {userDetails[bullet.key] || bullet.editMode ? (
            <ShowInfo
              title={bullet.title}
              initialContent={userDetails[bullet.key]}
              onSave={(updatedContent) => {
                console.log("updatedContent" + updatedContent);
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
export default Overview;
