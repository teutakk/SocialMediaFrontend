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
    }
    if (loginStatus === "failed") {
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
      dispatch(authenticateUser(formData));
    }
  };

  return (
    <div className={classes.container}>
      <span className={classes.photo}></span>
      <div className={classes.formData}>
        <div className={classes.topData}>
          <h2>Log In</h2>
        </div>
        {location.hash === "#auth" && (
          <p style={{ fontSize: "20px", color: "red" }}>You need to login!</p>
        )}
        {location.search === "?registrationsuccess" && (
          <p style={{ fontSize: "20px", color: "green", fontWeight: "500" }}>
            Log in to Continue
          </p>
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
            {loginStatus === "failed" && (
              <p style={{ color: "red" }}>
                {loginError && "Invalid email or password, please try again"}
              </p>
            )}
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
          <p>
            Don't have an account?{" "}
            <NavLink className={classes.navlink} to="/register">
              Sign up
            </NavLink>
          </p>
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

export default Login;
