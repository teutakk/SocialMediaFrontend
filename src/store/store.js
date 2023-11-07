import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import friendshipSlice from "./slices/friendshipSlice";
import postsSlice from "./slices/postsSlice";
import profileSlice from "./slices/profileSlice";
import notificationsSlice from "./slices/notificationsSlice";

const store = configureStore({
  reducer: {
    authentication: authSlice,
    register: registerSlice,
    posts: postsSlice,
    friendship: friendshipSlice,
    profile: profileSlice,
    notifications: notificationsSlice,
  },
});

export default store;
