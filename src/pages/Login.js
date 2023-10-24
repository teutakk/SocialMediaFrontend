import React, { useState } from "react";
import {
  authenticateUser,
  selectAuthError,
  selectAuthStatus,
  selectUser,
} from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loginStatus = useSelector(selectAuthStatus);
  const loginError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatching the authenticate postreq with use of redux
    if (formData.email && formData.password) {
      dispatch(authenticateUser(formData));
    }

    if (loginStatus === "failed" && loginError) {
      console.log("failed");
    }

    if (loginStatus === "succeeded" && !loginError) {
      navigate("/");
    }
  };

  return (
    <div>
      {location.hash === "#auth" && <p>You need to login to visit that page</p>}
      {location.search === "?registrationsuccess" && <p>Log in to Continue</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Dont have an account ?!</p>
        <a href="register">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
