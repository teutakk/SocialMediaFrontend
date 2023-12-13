import React, { useState } from "react";
import Modal from "./Modal";
import { NavLink, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import classes from "./EditProfileModal.module.css";
import logo from "../../../assets/images/userSvg2.svg";
import axiosInstance from "../../../api/axiosInstance";
import { API_ROUTES } from "../../../api/apiConfig";
import { selectUser } from "../../../store/slices/authSlice";
import { IoMdClose } from "react-icons/io";
import { FaSpinner, FaUser } from "react-icons/fa";
import { fetchUserProfile } from "../../../store/slices/profileSlice";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState();
  const [toggleEditing, setToggleEditing] = useState(false);
  const [toggleEditingEmail, setToggleEditingEmail] = useState(false);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [personalInfoLoading, setPersonalInfoLoading] = useState(false);
  const [inputs, setInputs] = useState({})
  const [selectedImages, setSelectedImages] = useState([]);

  const dispatch = useDispatch()
  const params = useParams();


  const loggedinUser = useSelector(selectUser)
  const userId = loggedinUser?._id

  const openFileInput = (e) => {
    document.getElementById("fileInput").click();
  };

  const previewImage = (input) => {

    const file = input.files[0];

    const selectedFiles = [file];

    setSelectedImages(selectedFiles);
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePictureSubmit = async() => {
    try {
      setPictureLoading(true)
      const formData = new FormData();
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("profilePicture", selectedImages[i]);
      }
      const res = await axiosInstance.put(`${API_ROUTES.addProfilePic}${userId}`, formData,  {headers: {
        'Content-Type': 'multipart/form-data',
      }})
      dispatch(fetchUserProfile(`/${params.idNumber}`));

      setPictureLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  const isEmailValid = (email) => {

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
      return{...prev, [e.target.name]: e.target.value}
    })    
  }
  const updateUser = async (userData) => {
    try {
      setPersonalInfoLoading(true)
     
      const res = await axiosInstance.put(`${API_ROUTES.updateUser}${userId}`, userData)

      setPersonalInfoLoading(false)
    } catch (error) {
      console.log(error);
      setPersonalInfoLoading(false)
    }
  }
  const handleUpdateUser = (e) => {
  
    e.preventDefault()
  
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
      <h2>Edit Profile</h2>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <NavLink className={classes.profileButton}>
            <p>Edit Profile</p>
            <FaUser />
          </NavLink>
        </div>
        <div className={classes.imageUpload}>
          <div className={classes.dataContainer}>
            <div className={classes.imageData}>
              <img
                src={imagePreview ?  imagePreview : loggedinUser?.profilePicture.length === 0 ? logo : loggedinUser?.profilePicture}
                alt="Click to upload"
                style={{ width: "100px", cursor: "pointer" }}
                onClick={openFileInput}
              />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                name="profilePicture"
                style={{ display: "none" }}
                onChange={(e) => previewImage(e.target)}
              />

              <label>Change the profile image</label>
            </div>
            {!pictureLoading && <button disabled={!selectedImages || !imagePreview} onClick={handlePictureSubmit} type="submit">Save</button>}
            {pictureLoading && (
              <button>
                <span>
                  <FaSpinner className={classes.spinner} />{" "}
                </span>
              </button>
            )}
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
            {!personalInfoLoading && toggleEditing && (
              <button
                disabled={
                  (!inputs.firstName && !inputs.lastName && !inputs.gender)
                }
                onClick={handleUpdateUser}
              >
                Save Changes
              </button>
            )}
            {personalInfoLoading && toggleEditing &&(
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
            {!personalInfoLoading && toggleEditingEmail && (
              <button disabled={!toggleEditingEmail || !(inputs.email?.trim()) || !isEmailValid(inputs.email)} onClick={handleUpdateUser}>
                Save Changes
              </button>
            )}
            {personalInfoLoading && toggleEditingEmail && (
              <button>
                <span>
                  <FaSpinner className={classes.spinner} />{" "}
                </span>
              </button>
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
