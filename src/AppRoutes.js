import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import FriendShip from "./pages/FriendShip";
import RequireAuth from "./components/RequireAuth";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import About from "./components/profile/about/About";
import Overview from "./components/profile/about/Overview";
import Friends from "./components/profile/friends/Friends";
import WorkAndEdu from "./components/profile/friends/WorkAndEdu";
import Contacts from "./components/profile/friends/Contacts";
import MarketPlace from "./pages/MarketPlace";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import Requests from "./components/profile/requests/Requests";
import UsersPosts from "./components/profile/UsersPosts";
import EditPost from "./components/posts/EditPost";
import EditPostPage from "./pages/EditPost";
import Page404 from "./pages/Page-404";
import Verified from "./pages/Verified";
import Views from "./components/profile/views/Views";
import Saved from "./pages/Saved";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="/users/verify/:userId/:token" element={<Verified />} />

      <Route path="login" element={<Login />} />
      <Route path="chat" element={<RequireAuth component={Chat} />} />
      <Route path="" element={<RequireAuth component={Layout} />}>
        <Route index path="" element={<RequireAuth component={Posts} />} />
        <Route path="saved" element={<RequireAuth component={Saved} />} />

        <Route path="posts/:postId" element={<EditPost />} />
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
          <Route index element={<UsersPosts />} />
          <Route path="about" element={<About />}>
            <Route index element={<Overview />} />
            <Route path="work-and-education" element={<WorkAndEdu />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
          <Route path="friends" element={<Friends />} />
          <Route path="requests" element={<Requests />} />
          <Route path="views" element={<Views />} />
          <Route path="photos" element={<h1>Cooming soon!</h1>} />
        </Route>
        <Route
          path="edit/:postId"
          element={<RequireAuth component={EditPostPage} />}
        />
      </Route>

      <Route path="404" element={<RequireAuth component={Page404} />} />
      <Route path="*" element={<RequireAuth component={Page404} />} />
    </Routes>
  );
};

export default AppRoutes;
