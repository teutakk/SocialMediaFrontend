import React, { useState } from "react";
import { authenticateUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";

const Login = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log("useParams: ", location);
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
    <div>
      {location.hash === "#auth" && <p>You need to login to visit that page</p>}
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
