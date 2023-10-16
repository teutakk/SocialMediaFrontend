import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import FriendShip from "./pages/FriendShip";
import RequireAuth from "./components/RequireAuth";

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    {/* <Route path="/posts" element={<RequireAuth component={Posts} />} /> */}
    <Route path="/posts" element={<Posts />} />
    <Route path="/friends" element={<FriendShip />} />
  </Routes>
);

export default AppRoutes;
