import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import FriendShip from "./pages/FriendShip";
import RequireAuth from "./components/RequireAuth";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import ProfileContent from "./components/profile/ProfileContent";
import About from "./components/profile/about/About";
import Overview from "./components/profile/about/Overview";
import Friends from "./components/profile/friends/Friends";
import WorkAndEdu from "./components/profile/friends/WorkAndEdu";
import Contacts from "./components/profile/friends/Contacts";
import { useDispatch } from "react-redux";
import { authenticateUser } from "./store/slices/authSlice";
import MarketPlace from "./pages/MarketPlace";
import Notifications from "./pages/Notifications";
import jwtDecode from "jwt-decode";

const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("decodedToken:", decodedToken);
      dispatch(
        authenticateUser({
          email: decodedToken.email,
          password: decodedToken.password,
        })
      );
    }
  }, []);
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="" element={<RequireAuth component={Layout} />}>
        <Route index path="" element={<RequireAuth component={Posts} />} />
        <Route
          path="notifications"
          element={<RequireAuth component={Notifications} />}
        />
        <Route
          path="marketplace"
          element={<RequireAuth component={MarketPlace} />}
        />
        <Route
          path="friends"
          element={<RequireAuth component={FriendShip} />}
        />
        <Route path="id/:idNumber" element={<Profile />}>
          <Route index element={<Posts />} />
          <Route path="about" element={<About />}>
            <Route index element={<Overview />} />
            <Route path="work-and-education" element={<WorkAndEdu />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
          <Route path="friends" element={<Friends />} />
          <Route path="photos" element={<h1>Cooming soon!</h1>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
