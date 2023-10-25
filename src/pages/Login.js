import {
  authenticateUser,
  selectAuthError,
  selectAuthStatus,
  selectUser,
} from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import classes from "./styles/Login.module.css";

import CustomInput from "../components/CustomInput";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const loginStatus = useSelector(selectAuthStatus);
  const loginError = useSelector(selectAuthError);

  const [formErrors, setFormErrors] = useState({ error: true });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginStatus === "succeeded") {
      navigate("/");
      console.log("running");
    }
    if (loginStatus === "failed") {
      console.log("invalid credentials", loginError);
    }
  }, [loginStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatching the authenticate postreq with use of redux
    if (formData.email && formData.password) {
      console.log("running dispatch");
      dispatch(authenticateUser(formData));
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.formData}>
          <div className={classes.topData}>
            <h2>Log In</h2>
          </div>
          {location.hash === "#auth" && (
            <p>You need to login to visit that page</p>
          )}
          {location.search === "?registrationsuccess" && (
            <p>Log in to Continue</p>
          )}
          <form onSubmit={handleSubmit} className={classes.form}>
            <CustomInput
              onChange={handleChange}
              icon={<AiOutlineMail className={classes.icon} />}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
            >
              {loginStatus === "failed" && <p>{loginError}</p>}
            </CustomInput>
            <CustomInput
              onChange={handleChange}
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
            <button type="submit" className={classes.button}>
              Log In
            </button>
            <div className={classes.bottomData}>
              <p>Don't have an account?</p>
              <NavLink to="/register">Sign Up</NavLink>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
