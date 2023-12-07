import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { logInWithToken, selectUser } from "./store/slices/authSlice";
import axiosInstance from "./api/axiosInstance";
import { API_ROUTES } from "./api/apiConfig";
import ScrollToTop from "./ScrollToTop";
import { fetchPosts } from "./store/slices/postsSlice";

function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !loggedInUser) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const isExpired = () => {
        const dateNow = Date.now() / 1000;
        return dateNow > decodedToken.exp;
      };
      if (!isExpired()) {
        const fetchUserWithToken = async () => {
          try {
            const response = await axiosInstance.get(
              API_ROUTES.users + `/${decodedToken.userId}`
            );
            const data = response.data;
            dispatch(logInWithToken(data));
          } catch (error) {}
        };

        fetchUserWithToken();
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
