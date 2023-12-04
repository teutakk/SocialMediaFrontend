import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectRegisteredError,
  selectRegisteredStatus,
} from "../store/slices/registerSlice";
import { validateForm } from "../utils/validateRegisterData";
import CustomInput from "../components/CustomInput";
import classes from "./styles/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import Footer from "../components/Footer";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });

  const [loading, setLoading] = useState(false)

  const userStatus = useSelector(selectRegisteredStatus);
  const userError = useSelector(selectRegisteredError);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // errors state
  const [formErrors, setFormErrors] = useState({ error: true });

  const handleSubmit = (event) => {
    // prevent the reload
    event.preventDefault();
    // when the inputs are filled, we validate the form data, and let the useEffect dispatch the action of sending the post register request, depending on the validity of formErrors
    setFormErrors(validateForm(formData));
    if (!formErrors.error) {
      dispatch(registerUser(formData)).then(() =>  setLoading(false)).catch((error) => {
        console.log(error);
      })
    }
  };

  useEffect(() => {
    // we do this in case that we navigate from a page to register, so when we register it doesnt automatically return us to the same logged in user
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (userStatus === "succeeded") {
      navigate("/login?registrationsuccess");
    }
  }, [userStatus]);

  // input state update handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={classes.container}>
      <span className={classes.photo}></span>
      <div className={classes.formData}>
        <div className={classes.topData}>
          <h2>Sign Up</h2>
          <p>
            Already have an account? <Link to="/login">Log In</Link>{" "}
          </p>
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <CustomInput
            onChange={onChangeHandler}
            icon={<BiSolidUser className={classes.icon} />}
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter Your Name"
            className={classes.inputRow}
          >
            {formErrors.firstName && (
              <p className={classes.errorText}>{formErrors.firstName}</p>
            )}
          </CustomInput>
          <CustomInput
            onChange={onChangeHandler}
            icon={<BiSolidUser className={classes.icon} />}
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter Your Lastname"
            className={classes.inputRow}
          >
            {formErrors.lastName && (
              <p className={classes.errorText}>{formErrors.lastName}</p>
            )}
          </CustomInput>
          <CustomInput
            onChange={onChangeHandler}
            icon={<AiOutlineMail className={classes.icon} />}
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
          >
            {userStatus === "failed" && (
              <p className={classes.errorText}>{userError}</p>
            )}
          </CustomInput>
          <CustomInput
            onChange={onChangeHandler}
            icon={<MdLockOutline className={classes.icon} />}
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            label="Password"
          >
            {formErrors.password && (
              <p className={classes.errorText}>{formErrors.password}</p>
            )}
          </CustomInput>
          <CustomInput
            onChange={onChangeHandler}
            icon={<MdLockOutline className={classes.icon} />}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            label="Confirm Password"
          >
            {formErrors.confirmPassword && !formErrors.password && (
              <p className={classes.errorText}>{formErrors.confirmPassword}</p>
            )}
          </CustomInput>
          <div className={classes.blockInput}>
            <select name="gender" id="gender" onChange={onChangeHandler}>
              <option value="" disabled selected>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <CustomInput
              onChange={onChangeHandler}
              type="date"
              id="birthday"
              name="birthday"
              value={formData.date}
              label="Birthday"
            />
          </div>
          {!loading &&
            <button type="submit" className={classes.button}>
              Sign Up
            </button>
          }
          {loading && 
            <button className={classes.button}>
              <span>
                <FaSpinner className={classes.spinner} />{" "}
              </span>
          </button>
          }
        </form>
      </div>
      <section className={classes.footerSection}>
        <div className={classes.quote}>
          Connect, Share, Thrive: Where Social Worlds Unite!
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default Register;
