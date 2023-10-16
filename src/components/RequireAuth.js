import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";

// Authorization component
const AuthorizedRoute = ({ component: Component, ...rest }) => {
  // Check if the user is logged in
  const user = useSelector(selectUser);
  // Check if there is a token in local storage
  const savedToken = localStorage.getItem("token");

  const isUserAuthorized = () => {
    return user && savedToken;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthorized() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" /> // Redirect to an unauthorized route or show an error message
        )
      }
    />
  );
};

export default AuthorizedRoute;
