import React, { useEffect, useState } from "react";
import classes from "./Overview.module.css";
import AddInfo from "../AddInfo";
import ShowInfo from "../ShowInfo";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { fetchUserDetails } from "../../../store/slices/profileSlice";
import { useDispatch } from "react-redux";

const Overview = () => {
  const [data, setData] = useState([
    {
      title: "University",
      content: "",
    },
    {
      title: "High school",
      content: "",
    },
    {
      title: "Birthplace",
      content: "",
    },
    {
      title: "Country",
      content: "",
    },
    {
      title: "Phone",
      content: "",
    },
  ]);

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails(params.idNumber)).then((response) => {
      console.log("Response recieved");
      console.log(response);
      setUserDetails(response);
    });
  }, [params.idNumber]);

  const handleDataUpdate = (property, value) => {
    setInputValue(value);
    userDetails.property = value;
  };

  const handleAddInput = (index) => {
    setSelectedIndex(index);
    setInputValue("");
    setInputVisible(true);
  };

  const handleSave = () => {
    if (selectedIndex !== null) {
      const updatedData = [...data];
      updatedData[selectedIndex].content = inputValue;
      setData(updatedData);
    } else {
      const updatedData = [...data];
      updatedData.push({ title: "New Entry", content: inputValue });
      setData(updatedData);
    }
    setInputVisible(false);
    setInputValue("");
    setSelectedIndex(null);
  };

  const handleEdit = (index, updatedContent) => {
    const updatedData = [...data];
    updatedData[index].content = updatedContent;
    setData(updatedData);
  };

  const handleCancel = () => {
    setInputVisible(false);
    setInputValue("");
    setSelectedIndex(null);
  };

  return (
    <div className={classes.Overview}>
      {data.map((bullet, i) => (
        <div key={i}>
          {bullet.content ? (
            <ShowInfo
              title={bullet.title}
              content={bullet.content}
              onEdit={(updatedContent) => handleEdit(i, updatedContent)}
              onRemove={() => {
                const updatedData = [...data];
                updatedData[i].content = "";
                setData(updatedData);
              }}
            />
          ) : (
            <AddInfo
              title={bullet.title}
              content={bullet.content || `Add ${bullet.title.toLowerCase()}`}
              onAddClick={() => handleAddInput(i)}
            />
          )}
          {inputVisible && selectedIndex === i && (
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleDataUpdate(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Overview;
