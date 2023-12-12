import React, { useState } from "react";
import Modal from "./Modal";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import classes from "./EditProfileModal.module.css";
import logo from "../../../assets/images/starlabs.png";
import axiosInstance from "../../../api/axiosInstance";
import { API_ROUTES } from "../../../api/apiConfig";
import { selectUser } from "../../../store/slices/authSlice";
import { IoMdClose } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { FaSpinner, FaUser } from "react-icons/fa";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(logo);
  const [toggleEditing, setToggleEditing] = useState(false);
  const [toggleEditingEmail, setToggleEditingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({})

  const dispatch = useDispatch()

  const loggedinUser = useSelector(selectUser)
  const userId = loggedinUser?._id

  const openFileInput = () => {
    // Trigger the click event on the hidden file input
    document.getElementById("fileInput").click();
  };

  const previewImage = (input) => {
    // Display the selected image preview
    const file = input.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const isEmailValid = (email) => {
    // Add your email validation logic here
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const toggleEdit = (e, type) => {
    e.preventDefault()
    if(type === "personal"){
      setToggleEditing((prevState) => !prevState)
    } else if(type === "email"){
      setToggleEditingEmail((prevState) => !prevState)
    }
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      console.log(e.target.value)

      return{...prev, [e.target.name]: e.target.value}
    })    
  }
  const updateUser = async (userData) => {
    try {
      setLoading(true)
      const res = await axiosInstance.put(`${API_ROUTES.updateUser}${userId}`, userData)
      console.log(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  const handleUpdateUser = (e) => {
  
    e.preventDefault()

    // if (
    //   (toggleEditing && !inputs.firstName) ||
    //   (toggleEditing && !inputs.lastName) ||
    //   (toggleEditing && !inputs.gender) ||
    //   (toggleEditingEmail && !inputs.email)
    // ) {
    //   // You can add an error message or handle this case as needed
    //   console.log("Please fill in all required fields");
    //   return;
    // }
  
    const newData = {
      firstName: toggleEditing ? inputs.firstName || loggedinUser?.firstName : loggedinUser?.firstName,
      lastName: toggleEditing ? inputs.lastName || loggedinUser?.lastName : loggedinUser?.lastName,
      gender: toggleEditing ? inputs.gender || loggedinUser?.gender : loggedinUser?.gender,
      email: toggleEditingEmail ? inputs.email || loggedinUser?.email : loggedinUser?.email,
    };

    updateUser(newData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={classes.modal}>
      {/* Add your edit profile form or content here */}
      <h2>Edit Profile</h2>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <NavLink className={classes.profileButton}>
            <p>Edit Profile</p>
            <FaUser />
          </NavLink>
          {/* <NavLink to="privacy">Privacy</NavLink> */}
        </div>
        <div className={classes.imageUpload}>
          <div className={classes.dataContainer}>
            <div className={classes.imageData}>
              <img
                src={imagePreview}
                alt="Click to upload"
                style={{ width: "100px", cursor: "pointer" }}
                onClick={openFileInput}
              />

              {/* File Input */}
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => previewImage(e.target)}
              />

              <label>Change the profile image</label>
            </div>
            <button>Save</button>
          </div>
          <form className={classes.userAbout}>
            <div className={classes.firstRow}>
              <p className={classes.typeBox}>Personal Information</p>
              <button
                className={classes.editButton}
                onClick={(e) => toggleEdit(e, "personal")}
              >
                {toggleEditing ? <IoMdClose /> : `Edit`}
              </button>
            </div>

            <div className={classes.changeData}>
              <div className={classes.userData}>
                <label>First Name</label>
                {toggleEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    placeholder={loggedinUser?.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  <p className={classes.userParagraph}>
                    {loggedinUser?.firstName}
                  </p>
                )}
              </div>
              <div className={classes.userData}>
                <label>Last Name</label>
                {toggleEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    placeholder={loggedinUser?.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  <p className={classes.userParagraph}>
                    {loggedinUser?.lastName}
                  </p>
                )}
              </div>
              <div className={classes.userData}>
                <label>Gender</label>
                {toggleEditing ? (
                  <input
                    type="text"
                    name="gender"
                    placeholder={loggedinUser?.gender}
                    onChange={handleChange}
                  />
                ) : (
                  <p className={classes.userParagraph}>
                    {loggedinUser?.gender}
                  </p>
                )}
              </div>
            </div>
            {!loading && toggleEditing && (
              <button
                disabled={
                  (!inputs.firstName && !inputs.lastName && !inputs.gender)
                }
                onClick={handleUpdateUser}
              >
                Save Changes
              </button>
            )}
            {loading && (
              <button>
                <span>
                  <FaSpinner className={classes.spinner} />{" "}
                </span>
              </button>
            )}
          </form>

          <form className={classes.userAbout}>
            <div className={classes.firstRow}>
              <p className={classes.typeBox}>Email Address</p>
              <button
                className={classes.editButton}
                onClick={(e) => toggleEdit(e, "email")}
              >
                {toggleEditingEmail ? <IoMdClose /> : `Edit`}
              </button>
            </div>
            <div className={classes.changeData}>
              <div className={classes.userData}>
                <label>Your Email</label>
                {toggleEditingEmail ? (
                  <input
                    type="email"
                    name="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    placeholder={loggedinUser?.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p className={classes.userParagraph}>{loggedinUser?.email}</p>
                )}
              </div>
            </div>
            {!loading && toggleEditingEmail && (
              <button disabled={!toggleEditingEmail || !(inputs.email?.trim()) || !isEmailValid(inputs.email)} onClick={handleUpdateUser}>
                Save Changes
              </button>
            )}
            {loading && (
              <button>
                <span>
                  <FaSpinner className={classes.spinner} />{" "}
                </span>
              </button>
            )}
          </form>
        </div>
        {/* Add your form fields, buttons, etc. */}
      </div>
    </Modal>
  );
};

export default EditProfileModal;
