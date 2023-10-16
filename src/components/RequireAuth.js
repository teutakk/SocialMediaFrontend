import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";

// Authorization component
const RequireAuth = ({ component: Component }) => {
  // Check if the user is logged in
  const user = useSelector(selectUser);
  // Check if there is a token in local storage
  const token = localStorage.getItem("token");
  console.log("user: ", user);
  console.log("token: ", token);
  const isUserAuthorized = () => {
    return !!user && token;
  };

  return isUserAuthorized() ? (
    <Component />
  ) : (
    <Navigate to="/login" /> // Redirect to an unauthorized route or show an error message
  );
};

export default RequireAuth;
