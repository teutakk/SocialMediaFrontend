import React, { useEffect, useState } from "react";
import { authenticateUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import classes from "./styles/Login.module.css";
import CustomInput from "../components/CustomInput";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { BsEye, BsEyeSlash } from "react-icons/bs"; 
import Footer from "../components/Footer";


const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({ error: true });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formErrors.error !== undefined && !formErrors.error) {
      dispatch(authenticateUser(formData)).then(() => {
        navigate("/login");
      });

      setFormData({
        email: "",
        password: "",
      });
      setFormErrors({ error: true });
    }
  }, [formErrors, formData, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatching the authenticate postreq with use of redux
    dispatch(authenticateUser(formData));
  };

  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.formData}>
        <div className={classes.topData}>
          <h2>Log In</h2>
        </div>
        {location.hash === "#auth" && (
          <p>You need to login to visit that page</p>
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
          />
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
            <Link to="/feed">Log In</Link>
          </button>
          <div className={classes.bottomData}>
            <p>Don't have an account?</p>
            <Link to="/register">Sign Up</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
