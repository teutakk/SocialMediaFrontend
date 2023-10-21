import React from "react";
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

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="" element={<Layout />}>
      <Route path="/posts" element={<Posts />} />
      <Route path="/friends" element={<FriendShip />} />
      <Route path="/id" element={<Profile />}>
        <Route path=":idNumber" element={<ProfileContent />}>
          <Route index element={<Posts />} />
          <Route path="about" element={<About />}>
            <Route index element={<Overview />} />
            <Route
              path="work-and-education"
              element={<h1>Work and Education</h1>}
            />

            <Route path="contacts" element={<h1>Contacts</h1>} />
          </Route>
          <Route path="friends" element={<h1>Friends</h1>} />
          <Route path="photos" element={<h1>Cooming soon!</h1>} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
